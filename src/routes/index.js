const express = require("express");

const rateLimit = require("express-rate-limit");
var cors = require("cors");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");

const app = express();
const userRouter = require("./userRoutes");
const User = require("../common/entity/UserEntity");
//
app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "http:", "data:"],
      scriptSrc: [
        "'self'",
        "https:",
        "http:",
        "blob:",
        "https://js.stripe.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
    },
  })
);
// Limit requests from same API
// 30 req /1 min
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//

const user = new User();
app.get("/", async (req, res, next) => {
  try {
    const sql = await user.findOne({
      where: [`email='khaizinam@gmail.com'`],
    });
    res.send({ sql });
  } catch (error) {
    res.send({ msg: error });
    console.log(error);
  }
});

app.get("/create-table", async (req, res, next) => {
  try {
    await user.createTable();
    await user.insert([
      ["Nguyen Huu Khai", "123", "khaizinam@gmail.com", "0846141788", 0],
      ["Nguyen Huu Khai 2", "123", "khaizinam12@gmail.com", "0846141788", 0],
    ]);

    res.send({ message: "tạo table thành công!" });
  } catch (error) {
    res.send({ msg: error });
  }
});
app.use("/api/auth", userRouter);
app.all("*", (req, res, next) => {
  res.status(400).send("Not found that url!");
  next();
});
module.exports = app;
