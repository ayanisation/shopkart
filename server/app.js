const express = require("express");
const cors = require("cors");
const home = require("./Routes/home.js");
const items = require("./Routes/items.js");
const users = require("./Routes/users.js");
require("./Database/connect.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: 10000000, extended: true }));
app.use(express.urlencoded({ limit: 10000000, extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", home);
app.use("/items", items);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
