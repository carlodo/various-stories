import { Command, FileSysState } from "../types";
import { TerminalCommand } from "../../commandMe/types";

export const mkdir: Command = {
  execute: (action: TerminalCommand, state: FileSysState) => {
    const name = action.commands[1];
    if (!name || name === "") return;
    const path = `${state.pwd}/${name}`;

    return {
      state: {
        ...state,
        folders: {
          ...state.folders,
          [path]: { name, path }
        }
      }
    };
  }
};
