const express = require("express");
require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //   // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Pragma, Cache-Control, Expires, Access-Control-Allow-Headers, Access-Control-Allow-Methods"
  );
  next();
});

// error handler
app.use(function (err, req, res, next) {
  logger.error("error", err);
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use("/api/coffee", require("./routes/coffeeRoutes")());
app.use("/api/deliver", require("./routes/deliverRoutes")());

app.get("/", (req, res) => {
  res.send("app is running");
});

app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server is running in port: ${PORT}`));
