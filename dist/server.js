"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use("/api/users", _userRoute["default"]);
app.use("/api/products", _productRoute["default"]);
app.use('/api/orders', _orderRoute["default"]);
app.get('/api/config/paypal', function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
});
app.use(_express["default"]["static"](path.join(__dirname, '/../frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join("".concat(__dirname, "/../frontend/build/index.html")));
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("App is running on port " + port);
});