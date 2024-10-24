const pool = require("../config/dbConnect");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const addCheckOut = async (req, res) => {
  const {
    userId,
    paymentMethod,
    items,
    shippingAddress,
    estimatedDeliveryTime,
    totalAmount,
  } = req.body;

  if (
    !userId ||
    !paymentMethod ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const orderStatus = "Đã tạo";
  const paymentStatus = "Đang chờ thanh toán";
  const currentTime = new Date();

  const sqlOrder = `INSERT INTO "Order" (userid, estimatedelivery, shippingaddress, orderstatus, ordercreatetime, orderupdatetime, totalamount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING orderid`;
  const sqlOrderItem = `INSERT INTO orderitem (orderid, productid, quantityofitem) VALUES ($1, $2, $3)`;
  const sqlPayment = `INSERT INTO payment (orderid, userid, paymentmethod, paymentstatus, paymentcreatetime, paymentupdatetime, totalamount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING paymentid`;
  const sqlUpdateProduct = `UPDATE product_batch SET batchquantity = batchquantity - $1 WHERE productid = $2`;
  const sqlDeleteCart = `DELETE FROM cart WHERE productid = $1`;
  const sqlInsertHistory = `INSERT INTO purchaseshistory (orderid, paymentid, purchasedate, totalamount) VALUES ($1, $2, NOW(), $3)`;

  const executeQuery = (query, values) => pool.query(query, values);

  try {
    await pool.query(`BEGIN`);

    // Insert into "Order" table
    const resultOrder = await executeQuery(sqlOrder, [
      userId,
      estimatedDeliveryTime,
      shippingAddress,
      orderStatus,
      currentTime,
      currentTime,
      totalAmount,
    ]);
    const orderId = resultOrder.rows[0].orderid;

    // Insert each item into orderitem
    const orderItemsPromises = items.map((item) =>
      executeQuery(sqlOrderItem, [orderId, item.productid, item.quantity])
    );
    await Promise.all(orderItemsPromises);

    // Insert into payment table
    const resultPayment = await executeQuery(sqlPayment, [
      orderId,
      userId,
      paymentMethod,
      paymentStatus,
      currentTime,
      currentTime,
      totalAmount,
    ]);
    const paymentId = resultPayment.rows[0].paymentid;

    // Update product quantity
    const updateProductPromises = items.map((item) =>
      executeQuery(sqlUpdateProduct, [item.quantity, item.productid])
    );
    await Promise.all(updateProductPromises);

    // Insert into purchases history
    await executeQuery(sqlInsertHistory, [orderId, paymentId, totalAmount]);

    // Delete items from cart
    const deleteCartPromises = items.map((item) =>
      executeQuery(sqlDeleteCart, [item.productid])
    );
    await Promise.all(deleteCartPromises);

    await pool.query(`COMMIT`);
    res.json({ message: "Đơn hàng đã được tạo thành công" });
  } catch (error) {
    console.error("Error occurred:", error);
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
};

const getShippingInfo = async (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM "User" WHERE userid = $1`;
  try {
    const result = await pool.query(sql, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const deliveryAddress =
      result.rows[0].street +
      ", " +
      result.rows[0].commune +
      ", " +
      result.rows[0].district +
      ", " +
      result.rows[0].province;
    // Calculate estimated delivery time as now + 4 hours
    const estimatedDeliveryTime = new Date(Date.now() + 4 * 60 * 60 * 1000);
    const returnResult = {
      deliveryAddress,
      estimatedDeliveryTime,
    };
    res.json(returnResult);
  } catch (error) {
    console.error("Error fetching transfer info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get purchase history by userId
const getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  try {
    // Fetch total count of orders
    const totalCountResult = await pool.query(
      `SELECT COUNT(*) FROM "Order" WHERE userid = $1`,
      [userId]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count);

    // Fetch order IDs with pagination
    const getOrderIds = `
      SELECT orderid FROM "Order" WHERE userid = $1 LIMIT $2 OFFSET $3
    `;
    const orderIds = await pool.query(getOrderIds, [userId, pageSize, offset]);

    if (orderIds.rows.length === 0) {
      return res.status(400).json({ message: "No purchase history found" });
    }

    // Fetch purchase history, order status, and payment status in a single query
    const orderIdsArray = orderIds.rows.map((order) => order.orderid);
    const getPurchasesHistorySQL = `
      SELECT ph.orderid, ph.purchasedate, ph.totalamount, o.orderstatus, p.paymentstatus
      FROM purchaseshistory ph
      JOIN "Order" o ON ph.orderid = o.orderid
      JOIN payment p ON ph.paymentid = p.paymentid
      WHERE ph.orderid = ANY($1::uuid[])
    `;
    const purchasesHistory = await pool.query(getPurchasesHistorySQL, [
      orderIdsArray,
    ]);

    const result = purchasesHistory.rows.map((row) => ({
      orderId: row.orderid,
      purchaseDate: row.purchasedate,
      totalAmount: row.totalamount,
      orderStatus: row.orderstatus,
      paymentStatus: row.paymentstatus,
    }));

    res.json({
      purchaseHistory: result,
      pagination: {
        totalItems: totalCount,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderItemById = async (req, res) => {
  const { orderId } = req.params;
  const sql = `SELECT * FROM orderitem WHERE orderid = $1`;
  try {
    const orderItem = await pool.query(sql, [orderId]);
    //Lay thong tin san pham tu bang product
    const result = [];
    for (const item of orderItem.rows) {
      const getProductSQL = `SELECT * FROM product WHERE productid = $1`;
      const product = await pool.query(getProductSQL, [item.productid]);
      //Viết để tránh trường hợp sản phẩm đã bị xóa khỏi bảng product
      if (product.rows.length === 0) {
        continue;
      }
      const temp = {
        productimage1: product.rows[0].productimage1,
        productname: product.rows[0].productname,
        overview: product.rows[0].overviewdes,
        quantity: item.quantityofitem,
      };
      result.push(temp);
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// farmer show orders
const getAllOrdersByFarmer = async (req, res) => {
  const { farmerId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const farmIdQuery = `SELECT farmid FROM farm WHERE userid = $1`;
    const farmIdResult = await pool.query(farmIdQuery, [farmerId]);
    if (farmIdResult.rows.length === 0) {
      return res.status(400).json({ error: "Farmer not found" });
    }

    const productIds = await Promise.all(
      farmIdResult.rows.map(async (farm) => {
        const productQuery = `SELECT productid FROM product WHERE farmid = $1`;
        const productResult = await pool.query(productQuery, [farm.farmid]);
        return productResult.rows.map((product) => product.productid);
      })
    ).then((results) => results.flat());

    if (productIds.length === 0) {
      return res.status(400).json({ error: "Product not found" });
    }

    const orderItems = await Promise.all(
      productIds.map(async (productId) => {
        const orderItemQuery = `SELECT * FROM orderitem WHERE productid = $1`;
        const orderItemResult = await pool.query(orderItemQuery, [productId]);
        return orderItemResult.rows;
      })
    ).then((results) => results.flat());

    const uniqueOrderItems = Array.from(
      new Set(orderItems.map((item) => item.orderid))
    ).map((orderId) => orderItems.find((item) => item.orderid === orderId));

    const totalItemsQuery = `SELECT COUNT(*) FROM "Order" WHERE orderid = ANY($1::uuid[])`;
    const totalItemsResult = await pool.query(totalItemsQuery, [
      uniqueOrderItems.map((item) => item.orderid),
    ]);
    const totalItems = parseInt(totalItemsResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    const ordersQuery = `
      SELECT o.*, u.fullname
      FROM "Order" o
      JOIN "User" u ON o.userid = u.userid
      WHERE o.orderid = ANY($1::uuid[])
      ORDER BY o.orderid
      LIMIT $2 OFFSET $3
    `;
    const ordersResult = await pool.query(ordersQuery, [
      uniqueOrderItems.map((item) => item.orderid),
      limit,
      offset,
    ]);

    res.json({
      totalItems,
      totalPages,
      currentPage: page,
      orders: ordersResult.rows,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderDetailFarmer = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orderQuery = `SELECT * FROM "Order" WHERE orderid = $1`;
    const orderResult = await pool.query(orderQuery, [orderId]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = orderResult.rows[0];
    const orderItemQuery = `SELECT * FROM orderitem WHERE orderid = $1`;
    const orderItemResult = await pool.query(orderItemQuery, [orderId]);
    const orderItems = orderItemResult.rows;

    const items = await Promise.all(
      orderItems.map(async (item) => {
        // Kiểm tra item có tồn tại và có productid không
        if (!item || !item.productid) {
          console.error("Invalid order item:", item);
          return null; // Hoặc có thể throw error
        }

        const productQuery = `SELECT * FROM product WHERE productid = $1`;
        const productResult = await pool.query(productQuery, [item.productid]);
        const product = productResult.rows[0];

        // Kiểm tra sản phẩm có tồn tại không
        if (!product) {
          console.error("Product not found for productid:", item.productid);
          return null; // Hoặc có thể throw error
        }

        // Lấy giá từ bảng product_batch
        const batchQuery = `SELECT * FROM product_batch WHERE productid = $1 LIMIT 1`; // Chọn một batch giá đầu tiên
        const batchResult = await pool.query(batchQuery, [item.productid]);
        const batch = batchResult.rows[0];

        // Kiểm tra batch có tồn tại không
        if (!batch) {
          console.error("Batch not found for productid:", item.productid);
          return null; // Hoặc có thể throw error
        }

        return {
          productId: product.productid,
          productName: product.productname,
          productImage: product.productimage1,
          quantity: item.quantityofitem,
          price: batch.batchprice, // Sử dụng batchprice từ bảng product_batch
          unitofmeasure: batch.unitofmeasure,
          overviewdes: product.overviewdes,
        };
      })
    );

    // Lọc ra những items hợp lệ (không null)
    const validItems = items.filter((item) => item !== null);

    const userQuery = `SELECT * FROM "User" WHERE userid = $1`;
    const userResult = await pool.query(userQuery, [order.userid]);
    const user = userResult.rows[0];

    const paymentQuery = `SELECT * FROM payment WHERE orderid = $1`;
    const paymentResult = await pool.query(paymentQuery, [orderId]);
    const payment = paymentResult.rows[0];

    const returnResult = {
      orderId: order.orderid,
      orderStatus: order.orderstatus,
      orderCreateTime: order.ordercreatetime,
      orderUpdateTime: order.orderupdatetime,
      totalAmount: order.totalamount,
      deliveryAddress: order.shippingaddress,
      estimatedDeliveryTime: order.estimatedelivery,
      paymentMethod: payment.paymentmethod,
      paymentStatus: payment.paymentstatus,
      paymentCreateTime: payment.paymentcreatetime,
      paymentUpdateTime: payment.paymentupdatetime,
      user: {
        userId: user.userid,
        fullName: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
      },
      items: validItems, // Chỉ bao gồm các item hợp lệ
    };

    res.json(returnResult);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStatusOrder = async (req, res) => {
  const { orderId, status } = req.body;
  const currentTime = new Date();
  const sql = `UPDATE "Order" SET orderstatus = $1, orderupdatetime = $2 WHERE orderid = $3`;
  try {
    await pool.query(sql, [status, currentTime, orderId]);

    res.json({
      message: "Cập nhật thành công",
      updateTime: currentTime,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createPaymentSession = async (req, res) => {
  const {
    batchprice,
    currency,
    userId,
    items,
    shippingAddress,
    estimatedDeliveryTime,
  } = req.body;

  try {
    // Bắt đầu một transaction
    await pool.query("BEGIN");

    // Tính tổng tiền và tạo đơn hàng
    const total = items.reduce(
      (sum, item) =>
        sum + item.batchprice * (1 - 0.01 * item.promotion) * item.quantity,
      0
    );

    const sqlOrder = `INSERT INTO "Order" (userid, estimatedelivery, shippingaddress, orderstatus, ordercreatetime, orderupdatetime, totalamount) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING orderid`;
    const orderstatus = "Đã tạo";
    const currentTime = new Date();
    const resultOrder = await pool.query(sqlOrder, [
      userId,
      estimatedDeliveryTime,
      shippingAddress,
      orderstatus,
      currentTime,
      currentTime,
      total,
    ]);

    const orderId = resultOrder.rows[0].orderid;

    // Lưu các item vào Order
    const sqlOrderItem = `INSERT INTO orderitem (orderid, productid, quantityofitem) VALUES ($1, $2, $3)`;
    for (const item of items) {
      await pool.query(sqlOrderItem, [orderId, item.productid, item.quantity]);
    }

    // Xóa sản phẩm khỏi giỏ hàng (cart) sau khi thanh toán thành công
    const sqlDeleteCart = `DELETE FROM cart WHERE userid = $1 AND productid = $2`;
    for (const item of items) {
      await pool.query(sqlDeleteCart, [userId, item.productid]);
    }

    // Tạo session thanh toán với Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          unit_amount: Math.round(
            item.batchprice * (1 - 0.01 * item.promotion) // Stripe expects the amount in cents
          ),
          currency: currency,
          product_data: {
            name: item.productname,
          },
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-cancel`,
      metadata: {
        orderId: orderId.toString(),
        userId: userId.toString(),
      },
    });

    // Lưu thông tin thanh toán vào bảng payment
    const sqlPayment = `INSERT INTO payment 
      (orderid, userid, paymentmethod, totalamount, paymentstatus, paymentcreatetime, paymentupdatetime) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING paymentid`;

    const paymentMethod = "Thanh toán online"; // Vì đây là thanh toán online
    const paymentStatus = "Đang chờ thanh toán"; // Thanh toán chưa hoàn tất
    const paymentCreateTime = currentTime;
    const paymentUpdateTime = currentTime;

    const resultPayment = await pool.query(sqlPayment, [
      orderId,
      userId,
      paymentMethod,
      total,
      paymentStatus,
      paymentCreateTime,
      paymentUpdateTime,
    ]);

    const paymentId = resultPayment.rows[0].paymentid;

    // Commit transaction và trả về URL của Stripe Checkout
    await pool.query("COMMIT");

    res.status(200).json({ url: session.url, paymentId });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
};

const getOrderDetails = async (orderId) => {
  const sqlOrderDetails = `
    SELECT 
      o.orderid, o.totalamount, o.ordercreatetime, o.estimatedelivery, o.shippingaddress, o.orderstatus,
      oi.productid, oi.quantityofitem,
      p.productname, p.productimage1, p.productsize,
      pb.unitofmeasure, pb.batchprice,
      pay.userid, pay.paymentmethod, pay.paymentstatus
    FROM "Order" o
    JOIN orderitem oi ON o.orderid = oi.orderid
    JOIN product p ON oi.productid = p.productid
    JOIN product_batch pb ON p.productid = pb.productid
    JOIN payment pay ON o.orderid = pay.orderid
    WHERE o.orderid = $1
  `;

  try {
    const result = await pool.query(sqlOrderDetails, [orderId]);
    if (result.rows.length === 0) {
      return { error: "Order not found" };
    }

    const order = {
      orderId: result.rows[0].orderid,
      totalAmount: result.rows[0].totalamount,
      orderCreateTime: result.rows[0].ordercreatetime,
      estimatedDelivery: result.rows[0].estimatedelivery,
      shippingAddress: result.rows[0].shippingaddress,
      orderStatus: result.rows[0].orderstatus,
      paymentMethod: result.rows[0].paymentmethod,
      paymentStatus: result.rows[0].paymentstatus,
      userId: result.rows[0].userid,
      items: result.rows.map((row) => ({
        productId: row.productid,
        productName: row.productname,
        productImage: row.productimage1,
        productSize: row.productsize,
        unitOfMeasure: row.unitofmeasure,
        batchPrice: row.batchprice,
        quantity: row.quantityofitem,
      })),
    };

    return order;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

const confirmPaymentSession = async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata.orderId;

    // Lấy chi tiết đơn hàng từ orderId
    const order = await getOrderDetails(orderId); // Giả sử bạn có hàm này để lấy chi tiết đơn hàng

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error confirming payment", error });
  }
};

const savePaymentToDB = async (req, res) => {
  const { userId, orderId, amount, paymentMethod, paymentId, paymentStatus } =
    req.body; // Bỏ paymentIntentId

  console.log(paymentStatus);

  try {
    // Lưu thông tin thanh toán vào bảng "payment" (không cần paymentIntentId)
    const sqlPayment = `
      INSERT INTO payment 
      (orderid, userid, totalamount, paymentstatus, paymentcreatetime, paymentmethod, paymentupdatetime) 
      VALUES ($1, $2, $3, $4, NOW(), $5, NOW()) RETURNING paymentid`;

    // const paymentStatus = "Đã thanh toán"; // Trạng thái thanh toán thành công từ Stripe
    const result = await pool.query(sqlPayment, [
      orderId,
      userId,
      amount,
      paymentStatus,
      paymentMethod,
    ]);

    const paymentId = result.rows[0].paymentid;

    // Lưu lịch sử mua hàng vào bảng purchaseshistory
    const sqlInsertHistory = `
      INSERT INTO purchaseshistory 
      (orderid, paymentid, purchasedate, totalamount) 
      VALUES ($1, $2, NOW(), $3)`;

    await pool.query(sqlInsertHistory, [orderId, paymentId, amount]);

    res.status(200).json({ message: "Đơn hàng được tạo thành công" });
  } catch (error) {
    console.error("Error saving payment info:", error);
    res.status(500).json({ error: "Failed to save payment info" });
  }
};

const getAllOrderToDistributor = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  try {
    // Lấy tổng số đơn hàng
    const totalOrdersResult = await pool.query('SELECT COUNT(*) FROM "Order"');
    const totalOrders = parseInt(totalOrdersResult.rows[0].count, 10);

    // Lấy đơn hàng với thông tin chi tiết (có thể kết hợp với bảng khác nếu cần)
    const ordersQuery = `
      SELECT o.*, u.fullname
      FROM "Order" o
      JOIN "User" u ON o.userid = u.userid
      LIMIT $1 OFFSET $2
    `;
    const ordersResult = await pool.query(ordersQuery, [limit, offset]);

    res.json({
      orders: ordersResult.rows,
      pagination: {
        totalOrders,
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(totalOrders / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addCheckOut,
  getShippingInfo,
  getPurchaseHistory,
  getOrderItemById,
  getAllOrdersByFarmer,
  getOrderDetailFarmer,
  updateStatusOrder,
  createPaymentSession,
  getOrderDetails,
  confirmPaymentSession,
  savePaymentToDB,
  getAllOrderToDistributor,
};
