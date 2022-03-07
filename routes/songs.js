const router = require("express").Router();
const { User } = require("../models/user");
const { Song, validate } = require("../models/songs");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const song = await Song(req.body).save();
  res.status(201).send({ data: song, message: "Song created successfully" });
});

router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.status(200).send({ data: songs });
});

router.put("/:id", [validateObjectId, admin], async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send({ data: song, message: "Updated song successfully" });
});

router.delete("/:id", [validateObjectId, admin], async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);

  res.status(200).send({ message: "Song deleted successfully" });
});

router.get("/like", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const songs = await Song.find({ _id: user.likedSongs });
  res.status(200).send({ data: songs });
});

module.exports = router;
