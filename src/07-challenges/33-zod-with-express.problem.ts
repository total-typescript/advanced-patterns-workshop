import express, { RequestHandler } from "express";
import { it } from "vitest";
import { z, ZodError } from "zod";
import { Equal, Expect } from "../helpers/type-utils";

const makeTypeSafeHandler = (
  config: {
    params?: unknown;
    body?: unknown;
  },
  handler: unknown,
): unknown => {
  return (req, res, next) => {
    const { params, body } = req;
    if (config.params) {
      try {
        config.params.parse(params);
      } catch (e) {
        return res.status(400).send((e as ZodError).message);
      }
    }
    if (config.body) {
      try {
        config.body.parse(body);
      } catch (e) {
        return res.status(400).send((e as ZodError).message);
      }
    }
    return handler(req, res, next);
  };
};

const app = express();

it("Should make the params AND body type safe", () => {
  app.get(
    "/users",
    makeTypeSafeHandler(
      {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
        }),
      },
      (req, res) => {
        type tests = [
          Expect<Equal<typeof req.params, { id: string }>>,
          Expect<Equal<typeof req.body, { name: string }>>,
        ];
      },
    ),
  );
});

it("Should default them to any if not passed in config", () => {
  app.get(
    "/users",
    makeTypeSafeHandler({}, (req, res) => {
      type tests = [
        Expect<Equal<typeof req.params, any>>,
        Expect<Equal<typeof req.body, any>>,
      ];
    }),
  );
});
