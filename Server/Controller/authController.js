import OTP from "../Modles/Otp.js";
import User from "../Modles/User.js";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "../Utils/email.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_TOKEN, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "missing credentials" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User.create({
      name,
      email,
      password: hash,
      role: "user",
      isVerified: false,
    });
    const otp = Math.floor(100000 + Math.round() * 900000).toString();
    await OTP.create({ email, otp, action: "account_verify" });
    await sendOTPEmail(email, otp, "account_verify");

    res.status(200).json({
      success: true,
      message:
        "User Register Successfully. Please Check Mail For OTP Verification ",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Credentials!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Register First" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password!" });
    }
    if (!user.isVerified && user.role == "user") {
      const otp = Math.floor(100000 + Math.round() * 900000).toString();
      await OTP.deleteMany({ email, action: "account_verify" }); // Remove Old OTPs.

      await OTP.create({ email, otp, action: "account_verify" });
      await sendOTPEmail(email, otp, "account_verify");
      return res
        .status(200)
        .json({ message: "Account has not verified!. New OTP Has Been Sent" });
    }
    const token = generateToken(user._id, user.role);
    
    res.status(200).json({ success: true, message: "Login Successfully" ,token:token});
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Credentials" });
    }
    const user = await User.findOne({
      email,
      otp,
      action: "account_verify",
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invaild or Expired OTP !" });
    }
    await User.findOneAndUpdate({ email }, { isVerified: true });
    await OTP.deleteMany({ email, action: "account_verify" });

    res.status(200).json({
      message: "Account Verified Successfully. You can login now",
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
      token: generateToken(user.id,user.role),
    });
  } catch (error) {
    res.status(500).json({ succes: false, error: error.message });
  }
};
