import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Equal, Expect } from "../helpers/type-utils";

const app = express();

type Params = Record<string, string>;

/**
 * The intention of this function is to parse the params
 * before the handler is called. If the params are invalid,
 * we want to return a 400 response.
 *
 * The issue is that the handler is not type safe. We need to
 * find some way to pass the type of the parsed params to the
 * RequestHandler AND the Request type to make the tests happy
 * below.
 *
 * Clues:
 *
 * 1. You'll need to investigate the generic signature of RequestHandler
 * and Request.
 *
 * 2. Remember that any params passed will always conform to
 * Record<string, string>.
 */
const makeTypeSafeGet =
  (parser: (params: Params) => unknown, handler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
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
