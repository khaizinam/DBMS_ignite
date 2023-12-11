const express = require("express");

const rateLimit = require("express-rate-limit");
var cors = require("cors");
const cookieParser = require("cookie-parser");

const helmet = require("helmet");

const app = express();
const userRouter = require("./userRoutes");
const User = require("../common/entity/User");
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
//------------------------------------
const TableRoute = require("../routes/TableRoute");

app.use("/", TableRoute);

app.all("*", (req, res, next) => {
  res.status(400).send("Not found that url!");
  next();
});
module.exports = app;
