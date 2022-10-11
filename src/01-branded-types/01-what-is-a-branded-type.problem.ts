import { Brand } from "../helpers/Brand";

type Password = Brand<string, "Password">;
type Email = Brand<string, "Email">;

const password = "1231423" as Password;

const email = "mpocock@me.com" as Email;

let passwordSlot: Password;

// @ts-expect-error
passwordSlot = email;

passwordSlot = password;
