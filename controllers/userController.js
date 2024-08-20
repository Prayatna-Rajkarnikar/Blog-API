import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    if (username.length < 5) {
      return res
        .status(401)
        .json({ error: "Username must be at least 5 characters long" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(401).json({ error: "Email already exists" });
    }

    const usernameExist = await UserModel.findOne({ username });
    if (usernameExist) {
      return res.status(401).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
