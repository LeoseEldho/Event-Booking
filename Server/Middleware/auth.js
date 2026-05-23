import jwt from "jsonwebtoken";
import User from "../Modles/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.Authorization &&
      req.headers.Authorization.startsWith("Bearer")
        ? req.headers.Authorization.split(" ")[1]
        : null;

    if (token) {
      try {
        const decode = await jwt.verify(token, process.env.JWT_TOKEN);
        req.user = await User.findById(decode.id);
        if (!req.user) {
          return res
            .status(401)
            .json({ success: false, message: "Not Authorized" });
          next();
        }
      } catch (error) {
        return res.status(401).json({ message: "Token faild ,login again " });
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "No authorization , NO token " });
  }
};

export const adminMiddleware = async (req, res, next) => {
    try {
        if (req.user && req.user.role == "admin") {
            next()
        } else {
            res.status(401).json({ success:false,message:"admin access needed"})
        }
    } catch (error) {
        error.console.log(error.message);
        
    }
}