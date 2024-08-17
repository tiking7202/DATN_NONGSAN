const pool = require("../config/dbConnect");

// Các trạng thái đơn hàng: Đã tạo, Đã xác nhận, Đang giao, Đã giao, Đã hủy
// Những trạng thái cập nhật số lượng trong bảng Product: Đã giao, Đã hủy
// Các phương thức thanh toán: Thanh toán khi nhận hàng, Thanh toán qua thẻ

const addCheckOut = async (req, res) => {
  const {
    userId,
    paymentMethod,
    items,
    shippingAddress,
    estimatedDeliveryTime,
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
  const paymentStatus = "Đang chờ";
  const currentTime = new Date();

  function groupProductsByFarmId(products) {
    const grouped = products.reduce((result, product) => {
      let group = result.find((g) => g[0].farmid === product.farmid);
      if (!group) {
        group = [];
        result.push(group);
      }
      group.push(product);
      return result;
    }, []);
    return grouped;
  }

  const sqlOrder = `INSERT INTO "Order" (userid, estimatedelivery, shippingaddress, orderstatus, ordercreatetime, orderupdatetime, totalamount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING orderid`;
  const sqlOrderItem = `INSERT INTO orderitem (orderid, productid, quantityofitem) VALUES ($1, $2, $3)`;
  const sqlPayment = `INSERT INTO payment (orderid, userid, paymentmethod, paymentstatus, paymentcreatetime, paymentupdatetime, totalamount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING paymentid`;
  const sqlUpdateProduct = `UPDATE product SET productquantity = productquantity - $1 WHERE productid = $2`;
  const sqlDeleteCart = `DELETE FROM cart WHERE productid = $1`;
  const sqlInsertHistory = `INSERT INTO purchaseshistory (orderid, paymentid, purchasedate, totalamount) VALUES ($1, $2, NOW(), $3)`;

  const executeQuery = (query, values) => pool.query(query, values);

  try {
    await pool.query(`START TRANSACTION`);

    const itemsByFarm = groupProductsByFarmId(items);

    for (const farmItems of itemsByFarm) {
      const total = farmItems.reduce(
        (sum, item) => sum + item.productprice * item.quantity,
        0
      );

      const resultOrder = await executeQuery(sqlOrder, [
        userId,
        estimatedDeliveryTime,
        shippingAddress,
        orderStatus,
        currentTime,
        currentTime,
        total,
      ]);
      const orderId = resultOrder.rows[0].orderid;

      const orderItemsPromises = farmItems.map((item) =>
        executeQuery(sqlOrderItem, [orderId, item.productid, item.quantity])
      );
      await Promise.all(orderItemsPromises);

      const resultPayment = await executeQuery(sqlPayment, [
        orderId,
        userId,
        paymentMethod,
        paymentStatus,
        currentTime,
        currentTime,
        total,
      ]);
      const paymentId = resultPayment.rows[0].paymentid;

      const updateProductPromises = farmItems.map((item) =>
        executeQuery(sqlUpdateProduct, [item.quantity, item.productId])
      );
      await Promise.all(updateProductPromises);

      await executeQuery(sqlInsertHistory, [orderId, paymentId, total]);

      for (const item of farmItems) {
        await executeQuery(sqlDeleteCart, [item.productid]);
      }
    }

    await pool.query(`COMMIT`);
    // Tra ve chi tiet don hang

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

// get purcharse history by userId
const getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;
  const result = [];
  try {
    const getOrderIds = `
  SELECT orderid FROM "Order" WHERE userid = $1
`;
    const orderIds = await pool.query(getOrderIds, [userId]);

    for (const order of orderIds.rows) {
      const orderId = order.orderid;
      const getPurchasesHistorySQL = `SELECT * FROM purchaseshistory WHERE orderid = $1`;
      const getPurchasesHistory = await pool.query(getPurchasesHistorySQL, [
        orderId,
      ]);
      const getOrderSQL = `SELECT orderstatus FROM "Order" WHERE orderid = $1`;
      const getOrder = await pool.query(getOrderSQL, [orderId]);
      const temp = {
        orderId: orderId,
        purchaseDate: getPurchasesHistory.rows[0].purchasedate,
        totalAmount: getPurchasesHistory.rows[0].totalamount,
        orderStatus: getOrder.rows[0].orderstatus,
      };
      result.push(temp);
    }
    res.json(result);
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

    const orders = await Promise.all(
      uniqueOrderItems.map(async (item) => {
        const orderQuery = `SELECT * FROM "Order" WHERE orderid = $1`;
        const orderResult = await pool.query(orderQuery, [item.orderid]);
        const fullNameQuery = `SELECT fullname FROM "User" WHERE userid = $1`;
        const fullNameResult = await pool.query(fullNameQuery, [
          orderResult.rows[0].userid,
        ]);
        orderResult.rows[0].fullname = fullNameResult.rows[0].fullname;
        return orderResult.rows[0];
      })
    );

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const paginatedOrders = orders.slice(startIndex, startIndex + limit);

    res.json({
      totalItems: orders.length,
      totalPages: Math.ceil(orders.length / limit),
      currentPage: page,
      orders: paginatedOrders,
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
        const productQuery = `SELECT * FROM product WHERE productid = $1`;
        const productResult = await pool.query(productQuery, [item.productid]);
        const product = productResult.rows[0];
        return {
          productId: product.productid,
          productName: product.productname,
          productImage: product.productimage1,
          quantity: item.quantityofitem,
          price: product.productprice,
          unitofmeasure: product.unitofmeasure,
          overviewdes: product.overviewdes,
        };
      })
    );
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
      items,
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

module.exports = {
  addCheckOut,
  getShippingInfo,
  getPurchaseHistory,
  getOrderItemById,
  getAllOrdersByFarmer,
  getOrderDetailFarmer,
  updateStatusOrder,
};
