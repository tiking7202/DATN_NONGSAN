const multer = require("multer");
const { uploadImageToFirebase } = require("../config/firebase"); 

// Cấu hình multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("avatar");

const uploadAvatarToFirebase = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
        return res.status(400).send(err);
        }
        if (!req.file) {
        return res.status(400).send("No file uploaded");
        }
        uploadImageToFirebase(req.file)
        .then((url) => {
            req.file.firebaseUrl = url;
            next();
        })
        .catch((error) => res.status(400).send(error));
    });
};

module.exports = {
    uploadAvatarToFirebase,
};
