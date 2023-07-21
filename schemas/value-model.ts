import mongoose, { Schema, model } from "mongoose";

import { DBValue } from "../interfaces/value-interfaces";

const ValueSchema: Schema = new Schema({
  value: { type: String, required: true },
});
const ValueModel = mongoose.model<DBValue>("ValueModel", ValueSchema);
export default ValueModel;
