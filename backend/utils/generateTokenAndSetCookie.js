import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return token;
};

export default generateTokenAndSetCookie;
