import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Equal, Expect } from "../helpers/type-utils";

const app = express();

/**
 * The intention of this function is to parse the query params
 * before the handler is called. If the query params are invalid,
 * we want to return a 400 response.
 *
 * The issue is that the handler is not type safe. We need to
 * find some way to pass the type of the parsed query params to the
 * RequestHandler AND the Request type to make the tests happy
 * below.
 *
 * Clues:
 *
 * 1. You'll need to investigate the generic signature of RequestHandler
 * and Request.
 *
 * 2. Remember that any query params passed will always need to conform to
 * Record<string, string>.
 */
const makeTypeSafeGet =
  (
    parser: (queryParams: Request["query"]) => unknown,
    handler: RequestHandler
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      /**
       * Try removing the 'as' cast below and see what happens.
       */
      parser(req.query);
    } catch (e) {
      res.status(400).send("Invalid query: " + (e as Error).message);
      return;
    }

    return handler(req, res, next);
  };

const getUser = makeTypeSafeGet(
  (query) => {
    if (typeof query.id !== "string") {
      throw new Error("You must pass an id");
    }

    return {
      id: query.id,
    };
  },
  (req, res) => {
    // req.query should be EXACTLY the type returned from
    // the parser above
    type tests = [Expect<Equal<typeof req.query, { id: string }>>];

    res.json({
      id: req.query.id,
      name: "Matt",
    });
  }
);

app.get("/user", getUser);
