import { z } from "zod";

type Example = z.ZodType;

const transformer = z.string().transform((s) => Number(s));
