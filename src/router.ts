import * as express from "express";
import { OAuth } from "./controller/auth";

const controller = new OAuth();

export const router = () => {
  const apiRouter = express.Router();

  apiRouter.post("/authorization", controller.authorization);

  apiRouter.get("/authenticate", controller.authenticate)



  return apiRouter;
};
