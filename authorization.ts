import jwt from "jsonwebtoken";

export const authorization = (token: string) => {
  try {
    jwt.verify(token, "some_secret");
    return "Private info";
  } catch (err) {
    throw new Error("Unauthorized");
  }
}

