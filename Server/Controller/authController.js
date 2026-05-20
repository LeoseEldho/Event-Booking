import User from "../Modles/User.js";
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "missing credentials" });
      }
      const isExist = await User.findOne({ email })
      if (isExist) {
        return res
        .status(400)
        .json({ success: false, message: "user already exist" });
      }
      const salt = await bcrypt.genSalt(10)
      const hash=await bcrypt.hash(password,salt)
      
    const user = new User({ name, email, password:hash });
      await user.save();
      res.status(200).json({ success: true, message: "User Register Successfully" })
      const otp = Math.floor(100000 + Math.round() * 900000).toString()
      console.log(otp);
      user.otp = otp;
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ succes: false, error: error.message });
  }
};
