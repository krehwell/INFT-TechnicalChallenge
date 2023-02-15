import * as mongoose from "mongoose";
import referralCode from "./referralCode.interface";

const referralCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true, index: true },
  description: String,
  type: String,
  by: String,
  created: Number,
});

const ReferralCodeModel = mongoose.model<referralCode & mongoose.Document>(
  "ReferralCode",
  referralCodeSchema
);

export default ReferralCodeModel;
