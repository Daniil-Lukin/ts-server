import bcrypt from "bcrypt";

import TokenService from "./token-service";
import UserModel from "../schemas/user-model";
import {
  AuthDeleteResponse,
  AuthResponse,
  DBUser,
} from "../interfaces/auth-interfaces";
import { ResponseError } from "../middleware/errorHandler.middleware";

class AuthService {
  public async registration(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    const hashedPassword: string = await bcrypt.hash(password, 7);
    const user = new UserModel({ email: email, password: hashedPassword });
    await user.save();
    const { refreshToken, accessToken } = TokenService.generateTokens(user);
    TokenService.createDBToken(user._id, refreshToken);
    return {
      _id: user._id,
      email: user.email,
      accessToken: accessToken,
    };
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const userData: DBUser | null = await UserModel.findOne({ email });
    if (!userData) {
      throw new ResponseError(404, `${email} user not found`);
    } else {
      const isPasswordEqual: Boolean = await bcrypt.compare(
        password,
        String(userData.password)
      );

      if (isPasswordEqual) {
        const { accessToken } = await TokenService.refreshToken(userData._id);
        return {
          email,
          _id: userData._id,
          accessToken,
        };
      } else {
        throw new ResponseError(400, `Invalid password`);
      }
    }
  }

  public async deleteUser(_id: string): Promise<AuthDeleteResponse> {
    const deletedUserData: DBUser | null = await UserModel.findByIdAndDelete(
      _id
    );
    if (deletedUserData) {
      return {
        _id: _id,
        email: deletedUserData.email,
      };
    } else {
      throw new ResponseError(404, `User not found`);
    }
  }

  public async refresh(id: string): Promise<AuthResponse> {
    const data = await TokenService.refreshToken(id);
    if (data) {
      return data;
    } else {
      throw new ResponseError(404, `Token of ${id} user not found`);
    }
  }
}

const authService = new AuthService();
export default authService;
