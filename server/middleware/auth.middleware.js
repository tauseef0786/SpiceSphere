import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info (userId, role) to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
