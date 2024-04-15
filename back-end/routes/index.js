const router = require("express").Router();
// const swaggerUi = require("swagger-ui-express");
const auth = require("./auth")

router.use("/auth",auth);

module.exports = router;