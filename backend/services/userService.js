import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import tokenService from './tokenService.js';
import UserDto from '../dto/userDto.js';

class UserService {
  async registration(name, email, password) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw new Error('Уже есть');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Не существует');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Неверный пароль!');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error('не авторізован');
    }
    const userData = tokenService.verifyRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new Error('не авторізован');
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.removeToken(refreshToken);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new UserService();
