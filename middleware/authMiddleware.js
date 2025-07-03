import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decode = jwt.verify(
      token.startsWith("Bearer ") ? token.slice(7) : token,
      "secret-key"
    );
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
