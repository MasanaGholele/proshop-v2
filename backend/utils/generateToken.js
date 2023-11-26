import jwt from 'jsonwebtoken';


const generateToken = (res, userId) => {
const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d" ,// 30d = 30 days
});
  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV  !== 'development', //if not in dev (ie in production) it will be true
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds conv to days
  });
};

export default generateToken;