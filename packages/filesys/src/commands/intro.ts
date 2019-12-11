import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import { FileSysTutorialState, Command } from "../types";

export const introMessage = `Hello,

  welcome to a interactive bash and file system tutorial.
  
  If this is your first time here type 'help' to see the supported terminal commands.
  
  In case you are interested in the exercises type 'tut opt in'.`;

export const intro: Command = {
  description: "Show introduction message",
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut(introMessage);

    return state;
  }
};
