const express = require("express");
const Mail = require("../models/mail");

const router = express.Router();

router.post("/", (req, res) => {
  const mail = new Mail({
    user: req.body.user,
    subject: req.body.subject,
    content: req.body.content,
    isRead: req.body.isRead,
  });

  mail
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ mesaage: err });
    });
});
router.get("/", (req, res) => {
  Mail.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/message", (req, res) => {
  const query = req.query;

  Mail.find({ user: query.user })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Id göre arama

router.get("/:id", async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);
    res.json(mail);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const removedMail = await Mail.remove({ _id: req.params.id });
    res.json(removedMail);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

// update post

router.patch("/:id", async (req, res) => {
  try {
    const updatedMail = await Mail.updateOne(
      { _id: req.params.id },
      { $set: { isRead: req.body.isRead } }
    );
    res.json(updatedMail);
  } catch (err) {
    res.json({ mesaage: err });
  }
});

module.exports = router;
