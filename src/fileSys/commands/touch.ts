import { Command, FileSysTutorialState } from "../types";
import { TerminalCommand } from "../../cliTutorialPlatform/types";
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
