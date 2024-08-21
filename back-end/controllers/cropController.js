const pool = require("../config/dbConnect");

exports.getCropsByproductidThroughFarmid = async (req, res) => {
  const { id } = req.params;
  try {
    // Step 1: Get all productids associated with the farmid
    const products = await pool.query(
      "SELECT productid FROM product WHERE farmid = $1",
      [id]
    );

    if (products.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this farm" });
    }

    // Step 2: Extract productids into an array
    const productIds = products.rows.map((product) => product.productid);

    // Step 3: Fetch all crops associated with those productids
    const crops = await pool.query(
      "SELECT * FROM crop WHERE productid = ANY($1::uuid[])",
      [productIds]
    );

    res.json(crops.rows);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCropsByFarmId = async (req, res) => {
  const { id } = req.params; // Lấy farmid từ params
  if (!id) {
    return res.status(400).json({ message: "Farm ID is required" });
  }

  try {
    // Truy vấn tất cả các loại cây trồng liên kết với farmid từ bảng crop
    const cropsResult = await pool.query(
      "SELECT * FROM crop WHERE farmid = $1",
      [id]
    );

    if (cropsResult.rows.length === 0) {
      return res.status(404).json({ message: "No crops found for this farm" });
    }

    res.json(cropsResult.rows);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllCropsByFarmId = async (req, res) => {
  const { userid } = req.params;
  const { page = 1, pageSize = 10 } = req.query; // Lấy tham số phân trang từ query, mặc định page = 1 và pageSize = 10

  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize, 10);

  try {
    // Lấy tổng số mùa vụ theo userid
    const totalResult = await pool.query(
      `SELECT COUNT(*) FROM crop p
        JOIN farm f ON p.farmid = f.farmid
        WHERE f.userid = $1`,
      [userid]
    );
    const totalCrops = parseInt(totalResult.rows[0].count, 10);

    // Lấy mùa vụ theo userid với phân trang
    const result = await pool.query(
      `SELECT p.*, f.farmname 
        FROM crop p
        JOIN farm f ON p.farmid = f.farmid
        WHERE f.userid = $1
        LIMIT $2 OFFSET $3`,
      [userid, limit, offset]
    );

    // Nếu không có mùa vụ nào thì trả về thông báo
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy mùa vụ nào" });
    }

    // Trả về danh sách mùa vụ cùng với thông tin phân trang
    res.json({
      crops: result.rows,
      pagination: {
        totalCrops,
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(totalCrops / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching crops by farm ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//lấy crop theo cropid
exports.getCropById = async (req, res) => {
  const { cropid } = req.params;

  // Kiểm tra tính hợp lệ của cropid (giả sử cropid là UUID)
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(cropid)) {
    return res.status(400).json({ message: "Invalid crop ID" });
  }

  try {
    // Truy vấn để lấy thông tin crop theo cropid
    const crop = await pool.query("SELECT * FROM crop WHERE cropid = $1", [
      cropid,
    ]);

    // Kiểm tra nếu không tìm thấy mùa vụ nào
    if (crop.rows.length === 0) {
      return res.status(404).json({ message: "Crop not found" });
    }

    // Trả về thông tin của crop
    res.json({ ...crop.rows[0] });
  } catch (error) {
    console.error("Error fetching crop by crop ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Tạo Crop

exports.createCrop = async (req, res) => {
  try {
    const {
      cropname,
      cropdes,
      plantarea,
      harvestdate,
      plantdate,
      estimatedyield,
      cropstatus,
      cropimage,
      farmid,
    } = req.body;

    // Kiểm tra các thông tin bắt buộc
    if (
      !cropname ||
      !cropdes ||
      !plantarea ||
      !harvestdate ||
      !plantdate ||
      !estimatedyield ||
      !cropstatus ||
      !cropimage ||
      !farmid
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    // Tạo một crop mới
    const newCrop = await pool.query(
      `INSERT INTO crop (cropname,cropdes,plantarea,harvestdate, plantdate,estimatedyield,cropstatus,cropimage, farmid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        cropname,
        cropdes,
        plantarea,
        harvestdate,
        plantdate,
        estimatedyield,
        cropstatus,
        cropimage,
        farmid,
      ]
    );

    // Trả về phản hồi thành công
    res.json({ crop: newCrop.rows[0], message: "Tạo vụ mùa thành công" });
  } catch (error) {
    console.error("Lỗi khi tạo vụ mùa:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo vụ mùa" });
  }
};

exports.deleteCrop = async (req, res) => {
  const { cropid } = req.params;

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const cropQuery = await pool.query("SELECT * FROM crop WHERE cropid = $1", [
      cropid,
    ]);
    if (cropQuery.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy vụ mùa" });
    }

    // Xóa sản phẩm
    await pool.query("DELETE FROM crop WHERE cropid = $1", [cropid]);

    res.json({ message: "Xóa vụ mùa thành công" });
  } catch (error) {
    console.error("Error deleting crop:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCrop = async (req, res) => {
  const { cropid } = req.params;
  const {
    cropname,
    cropdes,
    plantarea,
    harvestdate,
    plantdate,
    estimatedyield,
    cropstatus,
    cropimage,
    farmid,
  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (
    (!cropname,
    !cropdes,
    !plantarea,
    !harvestdate,
    !plantdate,
    !estimatedyield,
    !cropstatus,
    !cropimage,
    !farmid)
  ) {
    return res.status(400).json({ message: "Các trường không được để trống" });
  }

  try {
    // Kiểm tra xem cây trồng có tồn tại hay không
    const cropQuery = await pool.query("SELECT * FROM crop WHERE cropid = $1", [
      cropid,
    ]);
    if (cropQuery.rows.length === 0) {
      return res.status(400).json({ message: "Không tìm thấy cây trồng" });
    }

    // Cập nhật thông tin cây trồng
    const updatedCrop = await pool.query(
      `UPDATE crop
        SET cropname =$1,cropdes = $2,plantarea = $3,harvestdate = $4,plantdate = $5,estimatedyield = $6,cropstatus = $7,cropimage = $8,farmid = $9
        WHERE cropid = $10
        RETURNING *`,
      [
        cropname,
        cropdes,
        plantarea,
        harvestdate,
        plantdate,
        estimatedyield,
        cropstatus,
        cropimage,
        farmid,
        cropid,
      ]
    );

    // Trả về thông tin cây trồng vừa cập nhật
    res.json({
      crop: updatedCrop.rows[0],
      message: "Cập nhật cây trồng thành công",
    });
  } catch (error) {
    console.error("Error updating crop:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
