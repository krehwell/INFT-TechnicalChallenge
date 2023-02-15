import HttpException from "./HttpException";

class ReferralCodeFoundException extends HttpException {
  constructor(code: string) {
    super(404, `Referral code with id ${code} not found`);
  }
}

export default ReferralCodeFoundException;
