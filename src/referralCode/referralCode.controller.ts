import { Request, Response, NextFunction, Router } from "express";
import {
  ReferralCodeNotFoundException,
  ReferralCodeCustomErrorMessage,
} from "../exceptions/ReferralCodeNotFoundException";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreatePostDto from "./referralCode.dto";
import ReferralCodeModel from "./referralCode.model";

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
      // .patch(
      //   `${this.path}/:code`,
      //   validationMiddleware(CreatePostDto, true),
      //   this.modifyPost
      // )
      .delete(`${this.path}/:code`, this.deletePost)
      .post(
        this.path,
        validationMiddleware(CreatePostDto),
        this.createReferralCode
      );
  }

  private getAllCodes = async (request: Request, response: Response) => {
    const referralCodes = await this.ReferralCodeModel.find();
    response.send(referralCodes);
  };

  private getReferralCodeByCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const code = request.params.code;
    const referralCode = await this.ReferralCodeModel.findOne({ code });
    if (referralCode) {
      response.send(referralCode);
    } else {
      next(new ReferralCodeNotFoundException(code));
    }
  };

  // private modifyPost = async (
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ) => {
  //   const code = request.params.code;
  //   const postData: Post = request.body;
  //   const post = await this.referralCode.findByIdAndUpdate(code, postData, {
  //     new: true,
  //   });
  //   if (post) {
  //     response.send(post);
  //   } else {
  //     next(new RefferalCodeNotFoundException(code));
  //   }
  // };

  private createReferralCode = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const referralCodeData: CreatePostDto = request.body;
      const createdReferralCode = new this.ReferralCodeModel({
        ...referralCodeData,
      });
      const savedPost = await createdReferralCode.save();
      response.send(savedPost);
    } catch (err) {
      next(new ReferralCodeCustomErrorMessage(err.message));
    }
  };

  private deletePost = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const code = request.params.code;
    const isDeleted = await this.ReferralCodeModel.findOneAndDelete({ code });
    if (isDeleted) {
      response.sendStatus(204);
    } else {
      next(new ReferralCodeNotFoundException(code));
    }
  };
}

export default ReferralCodeController;
