import dotenv from 'dotenv';

dotenv.config();

const authToken = `Bearer ${process.env.AUTH_TOKEN}`;

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader === authToken) {
    next();
  } else {
    res.status(401).send({ message: 'Token inválido o no proporcionado' });
  }
};

export default authMiddleware;
