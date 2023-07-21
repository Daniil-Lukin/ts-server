import mongoose, { Schema, model } from "mongoose";
import { DBUser } from "../interfaces/auth-interfaces";

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model<DBUser>("UserModel", UserSchema);
export default UserModel;
