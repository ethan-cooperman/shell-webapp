import { TerminalCommandIndex, TerminalCommandInput } from "@/types/Terminal";
import doLs from "./commandHelpers/lsCommand";
import doCd from "./commandHelpers/cdCommand";
import doCat from "./commandHelpers/catCommand";
import doRm from "./commandHelpers/rmCommand";
import doRmdir from "./commandHelpers/rmdirCommand";
import doMkdir from "./commandHelpers/mkdirCommand";
import doTouch from "./commandHelpers/touchCommand";

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
