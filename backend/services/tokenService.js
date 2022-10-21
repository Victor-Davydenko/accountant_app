import jwt from 'jsonwebtoken';
import tokenModel from '../models/tokenModel.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: '45s',
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findByPk(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ refreshToken, UserId: userId });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { refreshToken } });
    const removed = await tokenData.destroy();
    return removed;
  }

  verifyAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

export default new TokenService();
