import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import { FileSysState } from "../types";

export const pwd = {
  description: "pwd (print working directory)",
  execute: (
    _action: TerminalCommand,
    state: FileSysState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut(state.pwd);
    return state;
  }
};
