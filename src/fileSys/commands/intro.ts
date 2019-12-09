import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import { FileSysState, Command } from "../types";

export const introMessage = `Hello,

  welcome to a interactive bash and file system tutorial.
  
  If this is your first time here type 'help' to see the supported terminal commands.
  
  In case you are interested in the exercises type 'opt in'.`;

export const intro: Command = {
  description: "Show introduction message",
  execute: (
    _action: TerminalCommand,
    state: FileSysState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut(introMessage);

    return state;
  }
};
