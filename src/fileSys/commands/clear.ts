import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import { FileSysState } from "../types";

export const clear = {
  description: "clear (clear the terminal)",
  execute: (
    _action: TerminalCommand,
    state: FileSysState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.clearStdOut();
    return state;
  }
};
