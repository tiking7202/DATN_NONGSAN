const pool = require("../config/dbConnect");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../config/firebase");
// Cấu hình Multer để xử lý upload
exports.upload = multer({
  storage: multer.memoryStorage(),
});

// Lay tat ca farm
exports.getFarms = async (req, res) => {
  try {
    const farms = await pool.query("SELECT * FROM farm");
    res.json(farms.rows);
  } catch (error) {
    console.error("Error fetching farms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lay farm theo id
exports.getFarmById = async (req, res) => {
  const { id } = req.params;
  try {
    const farm = await pool.query("SELECT * FROM farm WHERE farmid = $1", [id]);
    res.json(farm.rows[0]);
  } catch (error) {
    console.error("Error fetching farm:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lấy farm theo productid
exports.getFarmByProductId = async (req, res) => {
  const { productid } = req.params;

  if (!productid)
    return res.status(400).json({ message: "Product ID is required" });

  try {
    const { rows } = await pool.query(
      "SELECT * FROM farm WHERE farmid = (SELECT farmid FROM product WHERE productid = $1)",
      [productid]
    );
    if (!rows[0])
      return res
        .status(400)
        .json({ message: "No farm found for this product ID" });

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching farm:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Lay farm theo userid
exports.getFarmByUserId = async (req, res) => {
  const { userid } = req.params;

  if (!userid) return res.status(400).json({ message: "User ID is required" });

  try {
    const { rows } = await pool.query("SELECT * FROM farm WHERE userid = $1", [
      userid,
    ]);
    if (!rows[0])
      return res
        .status(400)
        .json({ message: "No farm found for this user ID" });

    res.json(rows);
  } catch (error) {
    console.error("Error fetching farm:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Thay dổi thông tin farm
exports.changeInfoFarm = async (req, res) => {
  const {
    userId,
    farmname,
    farmemail,
    farmtype,
    farmstreet,
    farmcommune,
    farmdistrict,
    farmprovince,
    farmphone,
    farmproductstotal,
    farmservice,
    farminvite,
    farmdes,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE farm 
       SET farmname = $1, farmemail = $2, farmtype = $3, farmstreet = $4, farmcommune = $5, 
           farmdistrict = $6, farmprovince = $7, farmphone = $8, farmproductstotal = $9, 
           farmservice = $10, farminvite = $11, farmdes = $12 
       WHERE userid = $13`,
      [
        farmname,
        farmemail,
        farmtype,
        farmstreet,
        farmcommune,
        farmdistrict,
        farmprovince,
        farmphone,
        farmproductstotal,
        farmservice,
        farminvite,
        farmdes,
        userId,
      ]
    );

    res.json({
      message: "Cập nhật thông tin trang trại thành công",
      result: result.rows[0],
    });
  } catch (error) {
    console.error("Error changing farm info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateLogoFarm = async (req, res) => {
  const { farmId, farmname } = req.body;
  try {
    const farmlogo = req.file;
    if (!farmId)
      return res.status(400).json({ message: "Farm ID is required" });
    let farmlogoUrl = null;
    if (farmlogo) {
      const farmlogoBuffer = farmlogo.buffer;
      const farmlogoFilename = `farms/${farmname}/${uuidv4()}`;
      const farmlogoRef = ref(storage, farmlogoFilename);

      await uploadBytes(farmlogoRef, farmlogoBuffer, {
        contentType: farmname.mimetype,
      });
      farmlogoUrl = await getDownloadURL(farmlogoRef);

      const newLogo = await pool.query(
        "UPDATE farm SET farmlogo = $1 WHERE farmid = $2 RETURNING *",
        [farmlogoUrl, farmId]
      );

      res.json({ logo: newLogo.rows[0] });
    }
  } catch (error) {
    console.error("Error updating farm logo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateImageFarm = async (req, res) => {
  const { farmId, farmname } = req.body;
  try {
    const uploadImage = async (image) => {
      if (!image) return;
      const imageBuffer = image.buffer;
      const imageFilename = `farms/${farmname}/${uuidv4()}`;
      const imageRef = ref(storage, imageFilename);

      await uploadBytes(imageRef, imageBuffer, {
        contentType: image.mimetype,
      });
      return await getDownloadURL(imageRef);
    };

    const farmimageUrl = await uploadImage(
      req.files.farmimage ? req.files.farmimage[0] : null
    );
    const farmimage1Url = await uploadImage(
      req.files.farmimage1 ? req.files.farmimage1[0] : null
    );
    const farmimage2Url = await uploadImage(
      req.files.farmimage2 ? req.files.farmimage2[0] : null
    );
    const farmimage3Url = await uploadImage(
      req.files.farmimage3 ? req.files.farmimage3[0] : null
    );

    const newImages = await pool.query(
      "UPDATE farm SET farmimage = $1, farmimage1 = $2, farmimage2 = $3, farmimage3 = $4 WHERE farmid = $5 RETURNING *",
      [farmimageUrl, farmimage1Url, farmimage2Url, farmimage3Url, farmId]
    );
    res.json({ images: newImages.rows[0] });
  } catch (error) {
    console.error("Error updating farm images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
