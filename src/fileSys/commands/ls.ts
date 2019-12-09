import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import { FileSysTutorialState } from "../types";

// TODO: finish this command to output files and folders from pwd
export const ls = {
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut("ls command wip");
    return state;
  }
};
