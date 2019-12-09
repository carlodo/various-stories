import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import { FileSysTutorialState } from "../types";

export const clear = {
  description: "clear (clear the terminal)",
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.clearStdOut();
    return state;
  }
};
