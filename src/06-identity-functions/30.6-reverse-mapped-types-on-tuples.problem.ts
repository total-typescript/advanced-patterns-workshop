type Command<TArgs extends string[]> = {
  cliCommand: string;
  args: [...TArgs];
  run: (...args: NoInfer<TArgs>) => void;
};

const createCommand = <TArgs extends string[]>(command: Command<TArgs>) => {
  return command;
};

const commands = createCommand({
  args: ["name", "example"],
  cliCommand: "hello",
  run: (str) => {
    console.log(`Hello, ${str[0]}`);
  },
});
