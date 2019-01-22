import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import express = require("express");
import dotenv from "dotenv";

dotenv.config();

export const router = () => {
  const apiRouter = express.Router();

  apiRouter.post("/authentication", (req: Request, res: Response) => {
    try { 
      if (!req.body.clientID || !req.body.secret) {
        throw new Error("Unauthorized");
      }

      const token = jwt.sign({ payload: "Its works" }, process.env.SECRET!);

      res.status(201).json({ access_token: token });

    } catch (err) {
      res.status(err.status).json(err.message)
    }
  });

  return apiRouter;
};

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: "400kb",
  extended: true,
  parameterLimit: 3000,
}));



export const listenAPI = async () => {
  app.use(router());

  const port = 3010;

  const listen = await app.listen(port);
  if (listen) {
    console.log(`API listening on 'localhost:${port}'`);
  }
  return listen;
};

listenAPI().catch((err) => {
  console.error(JSON.stringify(err, null, 2));
  process.exit(1);
});

