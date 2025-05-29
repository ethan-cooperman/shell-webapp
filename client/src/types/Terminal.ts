type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export type TerminalResponse = {
  output: string;
  isError: boolean;
};

export type TerminalEntry = {
  input: string;
} & TerminalResponse;

// object type representing parsed line in shell
export type ParsedCommandInput = {
  argv: string[];
  inputRedirect?: string;
  outputRedirect?: string;
  isAppend?: boolean;
};

// command of parsed inputs and cwd to execute in
export type TerminalCommandInput = Prettify<
  ParsedCommandInput & {
    cwdRef: React.RefObject<string>;
  }
>;

// type to represent a terminal command to allow for multiple implementations
export type TerminalCommand = (
  input: TerminalCommandInput
) => Promise<TerminalResponse>;

// type to represent http request body
export type RequestBody = { [key: string]: string | number | boolean };

export type TerminalCommandIndex = {
  ls: TerminalCommand;
  cd: TerminalCommand;
  echo: TerminalCommand;
  cat: TerminalCommand;
  rm: TerminalCommand;
  mkdir: TerminalCommand;
  touch: TerminalCommand;
  rmdir: TerminalCommand;
  pwd: TerminalCommand;
};
