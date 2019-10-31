const express = require("express");
const router = express.Router();

//@route GET api/courses
//@desc Get user's courses
//@access Private
router.get("/", (req, res) => {
  res.send("Get all courses");
});

//@route POST api/courses
//@desc Add user's courses
//@access Private
router.post("/", (req, res) => {
  res.send("Add a course");
});

//@route PUT api/courses/:id
//@desc Add user's courses
//@access Private
router.put("/:id", (req, res) => {
  res.send("Update a course");
});


//@route DELETE api/courses/:id
//@desc delete courses
//@access Private
router.delete("/:id", (req, res) => {
  res.send("Delete a course");
});


module.exports = router;
