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

export type TerminalCommandInput = {
  argv: string[];
  inputRedirect?: string;
  outputRedirect?: string;
  isAppend?: boolean;
};

export type TerminalCommand = (input: TerminalCommandInput) => TerminalResponse;

export type TerminalCommandIndex = {
  ls: TerminalCommand;
  cd: TerminalCommand;
  echo: TerminalCommand;
  cat: TerminalCommand;
  rm: TerminalCommand;
  mkdir: TerminalCommand;
  touch: TerminalCommand;
};
