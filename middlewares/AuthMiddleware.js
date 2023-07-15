import jwt from "jsonwebtoken";
import store from "store2";

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.jwt;
  // const n = req?.body?.jwt || JSON.parse(token);

  const storedToken = store("jwt");
  // console.log("store  ===>", store("jwt"));
  // console.log(n.jwt);
  if (!storedToken) return res.status(401).send("You are not authenticated!");
  jwt.verify(storedToken, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");
    req.userId = payload?.userId;
    next();
  });
};
