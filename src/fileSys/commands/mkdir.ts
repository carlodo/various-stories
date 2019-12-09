import { Command, FileSysTutorialState } from "../types";
import { TerminalCommand } from "../../cliTutorialPlatform/types";
import {
  isDirectory,
  resolvePath,
  pathLast,
  parentDirectory
} from "./directoryUtils";

export const mkdir: Command = {
  description: 'mkdir (make directory)\nex: "mkdir new_folder"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine
  ) => {
    const newFolders = action.commands.slice(1, action.commands.length).reduce(
      (folders, path) => {
        const resolvedPath = resolvePath(state, path);

        if (state.files[resolvedPath] || folders[resolvedPath]) {
          terminalEngine.stdOut(
            `${resolvedPath}: File or folder already exists`
          );
          return folders;
        }

        const parentDir = parentDirectory(state, path);
        const name = pathLast(state, path);

        if (!isDirectory(state, parentDir)) {
          terminalEngine.stdOut(`${parentDir} no such directory`);
          return folders;
        }

        return {
          ...folders,
          [resolvedPath]: { name: name, path: resolvedPath }
        };
      },
      { ...state.folders }
    );

    return {
      ...state,
      folders: newFolders
    };
  }
};
