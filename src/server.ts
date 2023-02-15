import "dotenv/config";
import App from "./app";
import ReferralCodeController from "./referralCode/referralCode.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new ReferralCodeController()]);

app.listen();
