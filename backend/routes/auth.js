const router = require("express").Router();
const User = require("../model/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../auth/validation");

router.post("/register", async (req, res) => {
  //Validate data before instantiating new user model
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
<<<<<<< HEAD
=======
  console.log("data validated");
>>>>>>> 3e09a83eafb0cb518df00338c0ecadf32b294225

  //Check if user already in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already taken!");
<<<<<<< HEAD
=======
  console.log("user checked");
>>>>>>> 3e09a83eafb0cb518df00338c0ecadf32b294225

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);

  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //Validate data before instantiating new user model
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("No user under those credentials!");

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
