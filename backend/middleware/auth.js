import tokenService from '../services/tokenService.js';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('не авторізован');
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new Error('не авторізован');
    }
    const userData = tokenService.verifyAccessToken(accessToken);
    if (!userData) {
      throw new Error('не авторізован');
    }
    req.user = userData;
    next();
  } catch (e) {
    throw new Error('не авторізован');
  }
};

export default authMiddleware;
