import {
  Result,
  TerminalResponse,
  TerminalCommandIndex,
  ParsedCommandInput,
} from "@/types/Terminal";
import mockedCommandIndex from "./mockedCommandIndex";
import terminalCommandIndex from "./terminalCommandIndex";
import handleOutputRedirect from "./handleOutputRedirect";

// command index to use here
let commandIndex: TerminalCommandIndex = mockedCommandIndex;

if (process.env.NEXT_PUBLIC_USE_MOCK === "TRUE") {
  commandIndex = mockedCommandIndex;
} else {
  commandIndex = terminalCommandIndex;
}

/**
 * Given a raw string line of terminal input, parses it
 * @param input raw string input into the terminal
 * @returns ParsedCommandInput representation of argv (without redirects)
 *         and file redirects in the object
 */
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

/**
 * Performs appropriate operation for a raw line of terminal input
 * @param input raw string of terminal input
 * @param cwdRef React ref to a string cwd representation
 * @returns TerminalResponse object representing stdout/stderr
 */
export default async function handleTerminalInput(
  input: string,
  cwdRef: React.RefObject<string>
): Promise<TerminalResponse> {
  // parse input
  const parseResult: Result<ParsedCommandInput> = parseTerminalInput(input);

  // if there's an error, return error message
  if (!parseResult.success) {
    return { output: parseResult.error, isError: true };
  }

  // get argv
  const commandInput: ParsedCommandInput = parseResult.value;

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
  const commandOutput: TerminalResponse = await commandIndex[commandName]({
    cwdRef: cwdRef,
    ...commandInput,
  });

  // handle redirects if user wants it and we don't have an error to report
  if (commandInput.outputRedirect && !commandOutput.isError) {
    const outputRedirectResult: TerminalResponse = await handleOutputRedirect(
      commandOutput.output,
      commandInput.outputRedirect,
      !!commandInput.isAppend,
      cwdRef
    );

    if (outputRedirectResult.isError) {
      return outputRedirectResult;
    } else {
      return { isError: false, output: "" };
    }
  } else {
    return commandOutput;
  }
}
