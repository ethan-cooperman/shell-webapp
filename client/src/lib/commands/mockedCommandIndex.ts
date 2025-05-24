import { TerminalCommandIndex, TerminalCommandInput } from "@/types/Terminal";

const mockedCommandIndex: TerminalCommandIndex = {
  ls: async (input: TerminalCommandInput) => {
    if (input.argv.length == 1) {
      return { output: "There are files here", isError: false };
    } else {
      return {
        output: `ls: expected 0 arguments`,
        isError: true,
      };
    }
  },
  cd: async (input: TerminalCommandInput) => {
    if (input.argv.length === 2) {
      return {
        output: `Changing directory to ${input.argv[1]}. Or am I ...?`,
        isError: false,
      };
    } else {
      return {
        output: `cd: expected 1 argument`,
        isError: true,
      };
    }
  },
  echo: async (input: TerminalCommandInput) => {
    return {
      output: input.argv.slice(1).join(" "),
      isError: false,
    };
  },
  cat: async (input: TerminalCommandInput) => {
    if (input.argv.length === 2) {
      return {
        output: `I should be reading contents of file ${input.argv[1]}`,
        isError: false,
      };
    } else {
      return {
        output: `cat: expected 1 argument`,
        isError: true,
      };
    }
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

export default mockedCommandIndex;
