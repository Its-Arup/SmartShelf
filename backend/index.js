const express = require("express");
const app = express();
const cors = require("cors");
var fs = require("fs");
var morgan = require("morgan");
var path = require("path");
const ServerConnection = require("./db");
const BookRouter = require("./Routes/book.router");
const UserRouter = require("./Routes/user.router");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// ----- logger middleWare -----

app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "log.txt"), {
      flags: "a",
    }),
  })
);

app.use("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to home page" });
});

app.use("/books", BookRouter);
app.use("/user", UserRouter);

const PORT = process.env.PORT || 8080;

// ------- server listning port -----

app.listen(PORT, async () => {
  try {
    await ServerConnection;
    console.log(`server listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
