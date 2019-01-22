import jwt from "jsonwebtoken";
import express from "express";
import { Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

export const router = () => {
  const apiRouter = express.Router();

  apiRouter.get("/authorization", (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization) {
        throw new Error("Unauthorized");
      }

      let bearer = null;
      if (req.headers.authorization.split(" ")[0] === "Bearer") {
        bearer = req.headers.authorization.split(" ")[1];
        jwt.verify(bearer!, process.env.SECRET!);
      }
      
      res.json("Access is allowed");

    } catch (err) {
      res.status(401).json("Unauthorized")
    }
  });

  return apiRouter;
};

export const app = express();

export const listenAPI = async () => {
  app.use(router());

  const port = 3011;

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

