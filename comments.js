//Create Web Server
const express = require("express");
const app = express();
const port = 3000;

//Create MongoDB Connection
const mongoose = require("mongoose");
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  console.log("Connected to mongod server");
});
mongoose.connect("mongodb://localhost/mongodb_tutorial");

//Create Schema
const Comment = require("./models/comment");

//Create Router
const router = express.Router();

//Create Router
router.post("/comments", function (req, res) {
  const comment = new Comment();
  comment.name = req.body.name;
  comment.password = req.body.password;
  comment.comment = req.body.comment;

  comment.save(function (err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
});

router.get("/comments", function (req, res) {
  Comment.find(function (err, comments) {
    if (err) return res.status(500).send({ error: "database failure" });
    res.json(comments);
  });
});

router.get("/comments/:comment_id", function (req, res) {
  Comment.findOne({ _id: req.params.comment_id }, function (err, comment) {
    if (err) return res.status(500).json({ error: err });
    if (!comment) return res.status(404).json({ error: "comment not found" });
    res.json(comment);
  });
});

router.put("/comments/:comment_id", function (req, res) {
  Comment.update(
    { _id: req.params.comment_id },
    { $set: req.body },
    function (err, output) {
      if (err) res.status(500).json({ error: "database failure" });
      console.log(output);
      if (!output.n)
        return res.status(404).json({ error: "comment not found" });
      res.json({ message: "comment updated" });
    }
  );
});

router.delete("/comments/:comment_id", function (req, res) {
  Comment.remove({ _id: req.params.comment_id }, function (err, output) {
    if (err) return res.status(500).json({ error: "database failure" });
    res.status(204).end();
  });
});

app.use(express.json());
app