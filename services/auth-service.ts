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
      email: user.email,
      refreshToken: refreshToken,
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
        const { accessToken, refreshToken } = await TokenService.refreshToken(
          email
        );
        return {
          email,
          refreshToken,
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

  public async refresh(email: string): Promise<AuthResponse> {
    const refreshedTokens = await TokenService.refreshToken(email);
    if (refreshedTokens) {
      return {
        email: email,
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken,
      };
    } else {
      throw new ResponseError(404, `Token of ${email} user not found`);
    }
  }
}

const authService = new AuthService();
export default authService;
