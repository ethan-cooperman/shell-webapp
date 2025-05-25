import { TerminalCommandIndex, TerminalCommandInput } from "@/types/Terminal";
import doLs from "./terminalCommands/lsCommand";
import doCd from "./terminalCommands/cdCommand";
import doCat from "./terminalCommands/catCommand";
import doRm from "./terminalCommands/rmCommand";
import doRmdir from "./terminalCommands/rmdirCommand";
import doMkdir from "./terminalCommands/mkdirCommand";
import doTouch from "./terminalCommands/touchCommand";

const terminalCommandIndex: TerminalCommandIndex = {
  ls: doLs,
  cd: doCd,
  cat: doCat,
  rm: doRm,
  rmdir: doRmdir,
  mkdir: doMkdir,
  touch: doTouch,
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
};

export default terminalCommandIndex;
