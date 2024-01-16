const express = require("express");
require("dotenv").config();
const BookModel = require("../Model/book.model");
const auth = require("../middleware/auth.middleware");
const { UserModel } = require("../Model/user.model");
const BookRouter = express.Router();
BookRouter.use(auth);

//  ------------- get all books from db -----------

BookRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findOne({ _id: userId });
  
    const { q , old , order , _new ,sort } = req.query;    
    let query = {};

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago
    if (old == 1) {
      query.createdAt = { $lte: tenMinutesAgo };
    } else if (_new  == 1) {
      query.createdAt = { $gte: tenMinutesAgo };
    }
    let sortOrder = {}

    sortOrder.createdAt = order == "oldtonew" ? 1 : -1 ;

    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    if(sort){
      query.genre = { $regex: sort, $options: "i" }
    }

    if (user.role.includes("VIEW_ALL")) {
      const allBooks = await BookModel.find(query).sort(sortOrder);
      res.status(200).send({ allBooks });
    } else if (user.role.includes("VIEWER")) {
      query.userId = userId;
      const myBooks = await BookModel.find(query).sort(sortOrder);
      res.status(200).send({ myBooks });
    } else {
      res.status(200).send({ msg: "user role error" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// ---------- Create new book ----------

BookRouter.post("/", async (req, res) => {
  try {
    // const { title, author, createdAt } = req.body;
    const { userId } = req.body;

    const user = await UserModel.findOne({ _id: userId });

    if (user.role.includes("CREATOR")) {
      const books = new BookModel(req.body);
      await books.save();
      res.status(200).send({ msg: "book added successfuly", books });
    } else {
      res
        .status(200)
        .send({ msg: "User don't have permission to create book" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// ------------- Edit Book from db -------------

BookRouter.patch("/:bookid", async (req, res) => {
  const { bookid } = req.params;
  const { userId } = req.body;

  try {
    const book = await BookModel.findOne({ _id: bookid });

    if (book) {
      if (userId === book.userId) {
        await BookModel.findByIdAndUpdate({ _id: bookid }, req.body);
        let updatedBook = await BookModel.findOne({ _id: bookid });

        res
          .status(200)
          .send({ message: "Book updated successfully", book: updatedBook });
      } else {
        res.status(200).send({ error: "Not authorized!" });
      }
    } else {
      res.status(400).send({ error: "Book not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// -------------------- Delete Book from db ----------------

BookRouter.delete("/delete/:bookid", async (req, res) => {
  const { bookid } = req.params;
  const { userId } = req.body;

  try {
    const book = await BookModel.findOne({ _id: bookid });

    if (book) {
      if (userId === book.userId) {
        await BookModel.findByIdAndDelete({ _id: bookid });

        res.status(200).send({ message: "Book deleted successfully", bookId : bookid });
      } else {
        res.status(200).send({ error: "Not authorized!" });
      }
    } else {
      res.status(400).send({ error: "Book not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = BookRouter;
