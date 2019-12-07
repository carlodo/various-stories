import { Command, FileSysState } from "../types";
import { TerminalCommand } from "../../cliTutorialPlatform/types";

export const touch: Command = {
  execute: (action: TerminalCommand, state: FileSysState) => {
    const name = action.commands[1];
    const path = `${state.pwd}/${name}`;

    return {
      state: {
        ...state,
        files: {
          ...state.files,
          [path]: { name, path }
        }
      }
    };
  }
};
