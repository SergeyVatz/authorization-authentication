import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import express from "express";
import compression from "compression"
import { router } from "./router";

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
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
    // tslint:disable-next-line:no-console
    console.log(`API listening on 'localhost:${port}'`);
  }
  return listen;
};

listenAPI().catch((err) => {
  // tslint:disable-next-line:no-console
  console.error(JSON.stringify(err, null, 2));
  process.exit(1);
});
