import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const registerUser = async (req, res) => {
  console.log("Registering: ");
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

const loginUser = async (req, res) => {
  console.log("Loggging in");
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ token: generateToken(user), firstname: user.firstname });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export { registerUser, loginUser };
