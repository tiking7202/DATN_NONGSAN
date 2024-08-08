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
  const orderStatus = "Đã tạo";
  const orderCreateTime = new Date();
  const orderUpdateTime = new Date();
  const paymentStatus = "Pending";
  const paymentCreateTime = new Date();
  const paymentUpdateTime = new Date();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Validate input data
  if (
    !userId ||
    !paymentMethod ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const sqlOrder = `INSERT INTO "Order" (userid, estimatedelivery, shippingaddress, orderstatus, ordercreatetime, orderupdatetime, totalamount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING orderid`;
  const valuesOrder = [
    userId,
    estimatedDeliveryTime,
    shippingAddress,
    orderStatus,
    orderCreateTime,
    orderUpdateTime,
    total,
  ];

  const sqlOrderItem = `INSERT INTO orderitem (orderid, productid, quantityofitem) VALUES ($1, $2, $3)`;

  const sqlPayment = `INSERT INTO payment (orderid, userid, paymentmethod, paymentstatus, paymentcreatetime, paymentupdatetime, totalamount) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING paymentid`;

  try {
    // Start transaction
    await pool.query(`START TRANSACTION`);
    // Insert into Orders table
    const resultOrder = await pool.query(sqlOrder, valuesOrder);
    const orderId = resultOrder.rows[0].orderid;
    // Prepare values for OrderItems table
    const valuesOrderItems = items.map((item) => [
      orderId,
      item.productId,
      item.quantity,
    ]);
    // Insert into OrderItems table
    for (const valuesOrderItem of valuesOrderItems) {
      await pool.query(sqlOrderItem, valuesOrderItem);
    }
    // Insert into Payments table
    const valuesPayment = [
      orderId,
      userId,
      paymentMethod,
      paymentStatus,
      paymentCreateTime,
      paymentUpdateTime,
      total,
    ];
    const resultPayment = await pool.query(sqlPayment, valuesPayment);
    const paymentId = resultPayment.rows[0].paymentid;

    // Update product quantities in Product table
    for (const item of items) {
      const sqlUpdateProduct = `UPDATE product SET productquantity = productquantity - $1 WHERE productid = $2`;
      await pool.query(sqlUpdateProduct, [item.quantity, item.productId]);
    }

    // Clear the cart for the user
    const sqlClearCart = `DELETE FROM cart WHERE userid = $1`;
    await pool.query(sqlClearCart, [userId]);

    // Insert data into purchaseshistory table
    const sqlInsertHistory = `INSERT INTO purchaseshistory (orderid, paymentid, purchasedate, totalamount) VALUES ($1, $2, NOW(), $3)`;
    await pool.query(sqlInsertHistory, [orderId, paymentId, total]);
    // Commit transaction
    await pool.query(`COMMIT`);

    res.json({ message: "Đơn hàng đã được tạo thành công" });
  } catch (error) {
    console.error("Error occurred:", error);
    // Rollback transaction in case of error
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
      console.log(getPurchasesHistory.rows);
      // thêm vào result
      result.push(getPurchasesHistory.rows);
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addCheckOut, getShippingInfo, getPurchaseHistory };
