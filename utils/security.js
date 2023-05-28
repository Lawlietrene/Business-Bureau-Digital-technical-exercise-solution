import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30m',
    }
  );
};
export const encryptPassword = (req, res, next) => {
  if (!req.body.UpdateUser) {
    req.body.password = bcrypt.hashSync(req.body.password);
  } else {
    req.body.UpdateUser.password = bcrypt.hashSync(
      req.body.UpdateUser.password
    );
  }

  next();
};
export const isAuth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    if (token.includes('Bearer')) {
      token = token.slice(7);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(400).json({
          status: 'fail',
          message: 'Invalid Token',
        });
      } else {
        req.body.user = decode;
        if (req.body.user.isAdmin || req.body.user.isEditor) {
          next();
        } else {
          res.status(400).json({
            status: 'fail',
            message: 'This user does not have permissions to perform this task',
          });
        }
      }
    });
  } else {
    res.status(400).json({
      status: 'fail',
      message:
        'Invalid Token or this user does not have permissions to perform this task',
    });
  }
};
