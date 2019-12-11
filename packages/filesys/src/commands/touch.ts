import { Command, FileSysTutorialState } from "../types";
import { TerminalCommand } from "@sljk/nice-graph";
import {
  pathLast,
  isDirectory,
  parentDirectory,
  resolvePath
} from "./directoryUtils";

export const touch: Command = {
  description: 'touch (create file) ex: "touch new_file"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    termnalEngine
  ) => {
    const path = action.commands[1];
    const resolvedPath = resolvePath(state, path);
    const fileName = pathLast(state, path);
    const parent = parentDirectory(state, path);
    if (parent === false || resolvedPath === false || fileName === false)
      return state;
    if (!isDirectory(state, parent)) {
      termnalEngine.stdOut(`${parent} no such directory`);
      return state;
    }

    return {
      ...state,
      files: {
        ...state.files,
        [resolvedPath]: { name: fileName, path: resolvedPath }
      }
    };
  }
};
