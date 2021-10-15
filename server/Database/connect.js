const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection with database established"))
  .catch((e) => console.log(e));
