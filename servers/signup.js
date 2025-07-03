import { validateEmail } from "../utils/validators.js";
import { User } from "../schema/user.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const isValidEmail = validateEmail(email);
  const existingUser = await User.findOne({ email });
  const isValidPassword = password.length > 5;
  try {
    if (!isValidEmail) {
      return res.status(400).json({ error: "Email is not valid" });
    }
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }
    if (!name) {
      return res.status(409).json({ error: "Please enter a name to continue" });
    }
    if (!isValidPassword) {
      return res
        .status(409)
        .json({ error: "Password must be of minimum 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "New user create successfully" });
  } catch (error) {
    console.log(error);
  }
};
