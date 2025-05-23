import {
  Result,
  TerminalResponse,
  TerminalCommandIndex,
  ParsedCommandInput,
} from "@/types/Terminal";
import mockedCommandIndex from "./mockedCommandIndex";

// command index to use here
let commandIndex: TerminalCommandIndex = mockedCommandIndex;

// TODO: get this working once we have actual functions
if (process.env.NEXT_PUBLIC_USE_MOCK) {
  commandIndex = mockedCommandIndex;
}

function parseTerminalInput(input: string): Result<ParsedCommandInput> {
  // trim and split input
  const tokens: string[] = input
    .trim()
    .split(" ")
    .filter((x) => x);

  // prepare a final argv
  const finalInput: ParsedCommandInput = {
    argv: [],
  };

  // parse for redirects
  let skip = false;
  for (let i = 0; i < tokens.length; i++) {
    // if this is a file name for redirects
    if (skip) {
      skip = false;
    }
    // handle output redirects
    else if (
      (tokens[i] === ">" || tokens[i] === ">>") &&
      i < tokens.length - 1
    ) {
      const targetFile = tokens[i + 1];

      // Validate the redirection target
      if (!targetFile || targetFile.startsWith(">")) {
        return {
          success: false,
          error: `invalid output redirection target after "${tokens[i]}"`,
        };
      }

      if (!("outputRedirect" in finalInput)) {
        finalInput.outputRedirect = tokens[i + 1];
        finalInput.isAppend = tokens[i] === ">>";
        skip = true;
      } else {
        return {
          success: false,
          error: "cannot have multiple output redirects",
        };
      }
    }
    // handle input redirects
    else if (tokens[i] === "<" && i < tokens.length - 1) {
      if (!("inputRedirects" in finalInput)) {
        finalInput.inputRedirect = tokens[i + 1];
        skip = true;
      } else {
        return {
          success: false,
          error: "cannot have multiple output redirects",
        };
      }
    } else if (tokens[i] === ">" || tokens[i] === ">>" || tokens[i] === "<") {
      return {
        success: false,
        error: "must redirect to a file",
      };
    } else {
      finalInput.argv.push(tokens[i]);
    }
  }

  return { success: true, value: finalInput };
}

export default async function handleTerminalInput(
  input: string,
  cwdRef: React.RefObject<string>
): Promise<TerminalResponse> {
  // parse input
  const parseResult = parseTerminalInput(input);

  // if there's an error, return error message
  if (!parseResult.success) {
    return { output: parseResult.error, isError: true };
  }

  // get argv
  const commandInput = parseResult.value;

  // Ensure argv is not empty
  if (!commandInput.argv || commandInput.argv.length === 0) {
    return { output: "no command provided.", isError: true };
  }

  // check that function is valid
  if (!(commandInput.argv[0] in commandIndex)) {
    return {
      output: `command not found: ${commandInput.argv[0]}`,
      isError: true,
    };
  }

  // get first element in argv for function name
  const commandName = commandInput.argv[0] as keyof TerminalCommandIndex;

  // pass in parsed input with ref to cwd variable
  // TODO: handle redirects from this point
  return await commandIndex[commandName]({
    cwdRef: cwdRef,
    ...commandInput,
  });
}
