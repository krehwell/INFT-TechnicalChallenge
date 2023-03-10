import { Request, Response, NextFunction, Router } from "express";
import {
  ReferralCodeNotFoundException,
  ReferralCodeCustomErrorMessage,
} from "../exceptions/ReferralCodeNotFoundException";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateReferralCodeDto from "./referralCode.dto";
import ReferralCodeModel from "./referralCode.model";
import ReferralCode from "./referralCode.interface";

class ReferralCodeController implements Controller {
  public path = "/referralCode";
  public router = Router();
  private ReferralCodeModel = ReferralCodeModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllCodes);
    this.router.get(`${this.path}/:code`, this.getReferralCodeByCode);
    this.router
      .all(`${this.path}/*`)
      .patch(
        `${this.path}/:code`,
        validationMiddleware(CreateReferralCodeDto, true),
        this.modifyReferralCode
      )
      .delete(`${this.path}/:code`, this.deleteReferralCode)
      .post(
        this.path,
        validationMiddleware(CreateReferralCodeDto),
        this.createReferralCode
      );
  }

  private getAllCodes = async (request: Request, response: Response) => {
    const referralCodes = await this.ReferralCodeModel.find();
    response.json(referralCodes);
  };

  private getReferralCodeByCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const code = request.params.code;
    const referralCode = await this.ReferralCodeModel.findOne({ code });
    if (referralCode) {
      response.json(referralCode);
    } else {
      next(new ReferralCodeNotFoundException(code));
    }
  };

  private modifyReferralCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const code = request.params.code;
    const referalCodeData: ReferralCode = request.body;
    const updatedReferralCode = await this.ReferralCodeModel.findOneAndUpdate(
      { code },
      referalCodeData,
      { new: true, useFindAndModify: false }
    );

    if (updatedReferralCode) {
      response.json(updatedReferralCode);
    } else {
      next(new ReferralCodeNotFoundException(code));
    }
  };

  private createReferralCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const referralCodeData: CreateReferralCodeDto = request.body;
      const createdReferralCode = new this.ReferralCodeModel({
        ...referralCodeData,
      });
      const savedReferralCode = await createdReferralCode.save();
      response.json(savedReferralCode);
    } catch (err) {
      next(new ReferralCodeCustomErrorMessage(err.message));
    }
  };

  private deleteReferralCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const code = request.params.code;
    const isDeleted = await this.ReferralCodeModel.findOneAndDelete(
      { code },
      { useFindAndModify: false }
    );
    if (isDeleted) {
      response.sendStatus(204);
    } else {
      next(new ReferralCodeNotFoundException(code));
    }
  };
}

export default ReferralCodeController;
