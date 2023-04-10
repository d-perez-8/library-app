const Library = require("../models/Library");

module.exports = {
  getLibrary: async (req, res) => {
    console.log(req.user);
    try {
      const bookItems = await Library.find({ userId: req.user.id });
      const itemsLeft = await Library.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render("library.ejs", {
        books: bookItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createBook: async (req, res) => {
    try {
      console.log(req.body)
      await Library.create({
        bookTitle: req.body.title,
        bookAuthor: req.body.author,
        bookPages: req.body.pages,
        completed: false,
        userId: req.user.id,
      });
      console.log("Book has been added!");
      res.redirect("/library");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Library.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Library.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteBook: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    try {
      await Library.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      console.log("Deleted Book");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
