import express, { RequestHandler } from "express";

const app = express();

// /user?id=124123
const getUser: RequestHandler<
  any,
  {
    name: string;
  },
  any,
  {
    id: string;
  }
> = (req, res) => {
  req.query.id;
};

app.get("/user");

app.post("/user", (req, res) => {});

app.listen(3000);
