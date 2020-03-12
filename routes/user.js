const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // checking user email id in database
  const emailExit = await User.findOne({
    email: req.body.email
  });

  if (emailExit)
    return res.status(400).json({ message: "Email already exists" });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    rres.status(400).json(error);
  }
});

// user login
router.post("/login", async (req, res) => {
  // checking user email id in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email is wrong");

  // checking password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Invalid password");

  // creat and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ token: token });
});

module.exports = router;
