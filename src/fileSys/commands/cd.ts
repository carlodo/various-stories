import { Command, FileSysState } from "../types";
import { TerminalCommand } from "../../commandMe/types";
import pathlib from "path";

export const cd: Command = {
  execute: (action: TerminalCommand, state: FileSysState) => {
    const directory = action.commands[1];
    const path = calculatePath(directory, state);
    if (!state.folders[path])
      return {
        state,
        output: `${directory}: No such directory`
      };

    return {
      state: {
        ...state,
        pwd: path
      }
    };
  }
};

const calculatePath = (path: string, state: FileSysState) => {
  if (!path) return `/home/${state.user}`;

  const homeReplace = path.replace("~", `/home/${state.user}`);

  if (homeReplace === ".") return state.pwd;
  else {
    return pathlib.resolve(state.pwd, homeReplace);
  }
};
