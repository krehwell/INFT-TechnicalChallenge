import HttpException from "./HttpException";

export class ReferralCodeNotFoundException extends HttpException {
  constructor(code: string) {
    super(404, `Referral code with code ${code} not found`);
  }
}

export class ReferralCodeCustomErrorMessage extends HttpException {
  constructor(message: string) {
    super(500, message);
  }
}
