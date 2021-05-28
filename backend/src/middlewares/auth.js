import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ success: false, message: 'not token provided' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ success: false, message: 'token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .send({ success: false, message: 'token malformatted' });
  }

  jwt.verify(token, SECRET, function (err, decode) {
    if (err) {
      return res.status(401).send({ sucess: false, message: 'token invalid' });
    }

    req.user = decode.user;

    return next();
  });
};
