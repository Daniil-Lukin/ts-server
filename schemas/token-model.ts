import mongoose, { Model, Schema, model } from "mongoose";
import { DBToken } from "../interfaces/token-interfaces";

const TokenSchema: Schema = new Schema({
  refreshToken: { type: String, unique: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const TokenModel = mongoose.model<DBToken>("TokenModel", TokenSchema);
export default TokenModel;
