import jwt, { Secret } from "jsonwebtoken";

import TokenModel from "../schemas/token-model";
import UserModel from "../schemas/user-model";
import {
  DBToken,
  GenerateTokenResponse,
  TokenPayloads,
} from "../interfaces/token-interfaces";
import { AuthResponse, DBUser } from "../interfaces/auth-interfaces";
import { ResponseError } from "../middleware/errorHandler.middleware";

class TokenService {
  public generateTokens(payloads: TokenPayloads): GenerateTokenResponse {
    const { email, _id } = payloads;
    const accessToken = jwt.sign(
      { email, _id },
      String(process.env.JWT_ACCESS),
      {
        expiresIn: "10s",
      }
    );
    const refreshToken = jwt.sign(
      { email, _id },
      String(process.env.JWT_REFRESH),
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public async createDBToken(
    userId: string,
    refreshToken: string
  ): Promise<DBToken> {
    const dbToken = await TokenModel.create({
      user: userId,
      refreshToken: refreshToken,
    });
    await dbToken.save();
    return dbToken;
  }

  public async deleteToken(token: string) {
    const deletedToken = await TokenModel.findOneAndDelete({
      refreshToken: token,
    });
    return deletedToken;
  }

  public async refreshToken(id: string): Promise<AuthResponse> {
    const dbUser: DBUser | null = await UserModel.findById(id);
    console.log(dbUser);
    if (dbUser) {
      const dbRefreshObject = await TokenModel.findOne({
        user: dbUser._id,
      });
      if (dbRefreshObject) {
        const { refreshToken, accessToken } = this.generateTokens({
          _id: dbUser._id,
          email: dbUser.email,
        });
        dbRefreshObject.refreshToken = refreshToken;
        dbRefreshObject.save();
        return {
          email: dbUser.email,
          accessToken,
        };
      } else {
        throw new ResponseError(404, `RefreshToken was not found`);
      }
    } else {
      throw new ResponseError(404, `User was not found`);
    }
  }

  public verify(token: string, jwtSalt: string) {
    try {
      const verifyiedJwt = jwt.verify(token, jwtSalt);
      return verifyiedJwt;
    } catch (e) {
      throw new ResponseError(401, `Invalid token`);
    }
  }
}
const tokenService = new TokenService();
export default tokenService;
