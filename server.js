const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const app = require("./app");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected successfully..."));

const port = process.env.PORT || 3000;
app.listen(process.env.PORT, () => console.log(`Listening on port ${port}...`));
