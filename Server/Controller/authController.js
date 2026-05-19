import User from "../Modles/User";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "missing credentials" });
    }
    const user = new User({ name, email, password });
      await user.save();
    res.status(200).json({success:true,message:"User Register Successfully"})
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
