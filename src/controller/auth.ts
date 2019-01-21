import { NextFunction, Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";

export class OAuth {
  public authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const cert_priv = fs.readFileSync(__dirname + '/../../rsa-private.pem');
      const token = jwt.sign(req.body, cert_priv, { algorithm: 'RS256', expiresIn: 30000 });
      res.status(200).json({
        access_token: token,
        expires_in: 30000,
      })
    } catch (err) {
      res.json(err);
    }
  }

  public authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const cert_public = fs.readFileSync(__dirname + '/../../rsa-public.pem');
      const token = req.headers.authorization!.split(" ")[1];
      const verified = jwt.verify(token, cert_public);
      if (verified) {
        res.json("Private info");
      }

    } catch(err)  {
      res.json(err);
    }
  };
}