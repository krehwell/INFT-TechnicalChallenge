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
    this.router.get(`${this.path}/:id`, this.getReferralCodeByCode);
    this.router
      .all(`${this.path}/*`)
      // .patch(
      //   `${this.path}/:id`,
      //   validationMiddleware(CreatePostDto, true),
      //   this.modifyPost
      // )
      // .delete(`${this.path}/:id`, this.deletePost);
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
    const code = request.params.id;
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
  //   const id = request.params.id;
  //   const postData: Post = request.body;
  //   const post = await this.referralCode.findByIdAndUpdate(id, postData, {
  //     new: true,
  //   });
  //   if (post) {
  //     response.send(post);
  //   } else {
  //     next(new RefferalCodeNotFoundException(id));
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

  // private deletePost = async (
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ) => {
  //   const id = request.params.id;
  //   const successResponse = await this.referralCode.findByIdAndDelete(id);
  //   if (successResponse) {
  //     response.send(200);
  //   } else {
  //     next(new RefferalCodeNotFoundException(id));
  //   }
  // };
}

export default ReferralCodeController;
