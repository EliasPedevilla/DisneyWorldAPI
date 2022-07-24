import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;

  if (process.env.NODE_ENV === "development") return next();

  if (!authorization)
    return res
      .status(400)
      .send("must send a header with an authentication token");

  const token = authorization.replace("Bearer ", "");

  try {
    const isAuth = jwt.verify(token, "admin");

    if (!isAuth) {
      return res.status(404).send("Unauthorized");
    }

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};
