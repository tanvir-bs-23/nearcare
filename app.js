const express = require("express");

const userRouter = require("./route/userRouter");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    err,
  });
});

module.exports = app;
