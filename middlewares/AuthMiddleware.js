import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  console.log("cookies in server", req?.body?.jwt);
  console.log("cookies in header", req.headers.authorization);
  console.log(
    "cookies in header 2",
    req.headers.cookie
    // JSON.parse(req.headers.cookie)
  );
  const n = req?.body?.jwt || JSON.parse(token);
  console.log(n.jwt);
  if (!n) return res.status(401).send("You are not authenticated!");
  jwt.verify(n.jwt, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};
