const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const port = 3000;
const cors = require("cors");
const client = require('./config/dbConnect');
const routes = require("./routes");
const autoUpdateProductBatch = require('./utils/autoUpdateProductBatch');

// Cấu hình CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Cấu hình express-session
app.use(
  session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, 
  })
);
// Cấu hình body parser để lấy dữ liệu từ request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

// Gọi hàm auto update productbatch
autoUpdateProductBatch.autoUpdateProductBatch();

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} 😗` );
});
