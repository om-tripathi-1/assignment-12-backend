import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  function isValidGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

  if (!isValidGmail(email)) {
    return res.status(400).json({
      message: "Only @gmail.com emails are allowed",
    });
  }

  const userAlreadyExists = await User.findOne({
    $or: [{ email }],
  });
  if (userAlreadyExists) {
    return res
      .status(400)
      .json({ message: "Account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await newUser.save();

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 3600000,
      })
      .status(201)
      .json({
        message: "User registered successfully",
        User: { id: newUser._id, name, email, role: newUser.role },
        Token: token,
      });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    // console.log(await User.findOne({ email }));

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {

      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 3600000,
      })
      .status(200)
      .json({
        message: "Login Success",
        User: { id: user._id, name: user.name, email, role: user.role },
        Token: token,
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in: ", error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "error logging out: ", error });
  }
};
