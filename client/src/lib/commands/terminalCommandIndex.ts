import { TerminalCommandIndex, TerminalCommandInput } from "@/types/Terminal";
import doLs from "./terminalCommands/lsCommand";
import doCd from "./terminalCommands/cdCommand";
import doCat from "./terminalCommands/catCommand";

const terminalCommandIndex: TerminalCommandIndex = {
  ls: doLs,
  cd: doCd,
  cat: doCat,
  pwd: async (input: TerminalCommandInput) => {
    if (input.cwdRef.current) {
      return { isError: false, output: input.cwdRef.current };
    } else {
      return { isError: false, output: "No current working directory" };
    }
  },
  echo: async (input: TerminalCommandInput) => {
    return {
      output: input.argv.slice(1).join(" "),
      isError: false,
    };
  },
  rm: async (input: TerminalCommandInput) => {
    if (input.argv.length === 2) {
      return {
        output: `I should be deleting contents of file ${input.argv[1]}`,
        isError: false,
      };
    } else {
      return {
        output: `rm: expected 1 argument`,
        isError: true,
      };
    }
  },
  mkdir: async (input: TerminalCommandInput) => {
    if (input.argv.length === 2) {
      return {
        output: `I would be making a directory ${input.argv[1]}`,
        isError: false,
      };
    } else {
      return {
        output: `mkdir: expected 1 argument`,
        isError: true,
      };
    }
  },
  touch: async (input: TerminalCommandInput) => {
    if (input.argv.length === 2) {
      return {
        output: `I would be making a file ${input.argv[1]}`,
        isError: false,
      };
    } else {
      return {
        output: `touch: expected 1 argument`,
        isError: true,
      };
    }
  },
  rmdir: async (input: TerminalCommandInput) => {
    if (input.argv.length === 2) {
      return {
        output: `I would be removing directory ${input.argv[1]}`,
        isError: false,
      };
    } else {
      return {
        output: `rmdir: expected 1 argument`,
        isError: true,
      };
    }
  },
};

export default terminalCommandIndex;
