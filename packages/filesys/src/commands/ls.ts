import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import { FileSysTutorialState } from "../types";
import { either } from "fp-ts";

// TODO: finish this command to output files and folders from pwd
export const ls = {
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut("ls command wip");
    return either.right(state);
  }
};
