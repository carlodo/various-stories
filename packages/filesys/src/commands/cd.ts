import { Command, FileSysTutorialState } from "../types";
import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import pathlib from "path";
import { either as E } from "fp-ts";

export const cd: Command = {
  description: 'cd (change directory)\nex: "cd /etc"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ): E.Either<Error, FileSysTutorialState> => {
    const directory = action.commands[1];
    const path = calculatePath(directory, state);
    if (!state.folders[path]) {
      terminalEngine.stdOut(`${directory}: No such directory`);
      return E.left(Error(`${directory}: No such directory`));
    }

    return E.right({
      ...state,
      pwd: path
    });
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
