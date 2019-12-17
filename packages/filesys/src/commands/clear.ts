import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import { FileSysTutorialState, Command } from "../types";
import { either } from "fp-ts";

export const clear: Command = {
  description: "clear (clear the terminal)",
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.clearStdOut();
    return either.right(state);
  }
};
