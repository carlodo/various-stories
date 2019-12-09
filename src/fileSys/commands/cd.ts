import { Command, FileSysTutorialState } from "../types";
import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import pathlib from "path";

export const cd: Command = {
  description: 'cd (change directory)\nex: "cd /etc"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    const directory = action.commands[1];
    const path = calculatePath(directory, state);
    if (!state.folders[path]) {
      terminalEngine.stdOut(`${directory}: No such directory`);
      return state;
    }

    return {
      ...state,
      pwd: path
    };
  }
};

const calculatePath = (path: string, state: FileSysTutorialState) => {
  if (!path) return `/home/${state.user}`;

  const homeReplace = path.replace("~", `/home/${state.user}`);

  if (homeReplace === ".") return state.pwd;
  else {
    return pathlib.resolve(state.pwd, homeReplace);
  }
};
