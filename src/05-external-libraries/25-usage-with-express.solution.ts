import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Equal, Expect } from "../helpers/type-utils";

const app = express();

type Params = Record<string, string>;

const makeTypeSafeGet =
  <TParams extends Params>(
    parser: (params: Params) => TParams,
    handler: RequestHandler<TParams>,
  ) =>
  (req: Request<TParams>, res: Response, next: NextFunction) => {
    try {
      /**
       * Try removing the 'as' cast below and see what happens.
       */
      parser(req.params);
    } catch (e) {
      res.status(400).send("Invalid params: " + (e as Error).message);
      return;
    }

    return handler(req, res, next);
  };

const getUser = makeTypeSafeGet(
  (params) => {
    if (typeof params.id !== "string") {
      throw new Error("You must pass an id");
    }

    return {
      id: params.id,
    };
  },
  (req, res) => {
    // req.params should be EXACTLY the type returned from
    // the parser above
    type tests = [Expect<Equal<typeof req.params, { id: string }>>];

    res.json({
      id: req.params.id,
      name: "Matt",
    });
  },
);

app.get("/user", getUser);
