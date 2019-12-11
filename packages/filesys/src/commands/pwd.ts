import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import { FileSysTutorialState } from "../types";

export const pwd = {
  description: "pwd (print working directory)",
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut(state.pwd);
    return state;
  }
};
