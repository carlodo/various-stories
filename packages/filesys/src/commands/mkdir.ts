import { Command, FileSysTutorialState, Folders, Folder } from "../types";
import { TerminalCommand } from "@sljk/nice-graph";
import {
  isDirectory,
  resolvePath,
  pathLast,
  parentDirectory,
  isFile
} from "./directoryUtils";
import { Either, left, right, chain, fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

export const mkdir: Command = {
  description: 'mkdir (make directory)\nex: "mkdir new_folder"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine
  ): Either<Error, FileSysTutorialState> => {
    if (action.commands.length < 2) return left(new Error("Need folder names"));

    const newFolderResults = createNewFolders(
      state,
      action.commands.slice(1, action.commands.length)
    );

    const { newFolders } = newFolderResults.reduce<{ newFolders: Folders }>(
      (acc, newFolder) =>
        fold<Error, Folder, { newFolders: Folders }>(
          error => {
            terminalEngine.stdOut(error.message);
            return acc;
          },
          ({ name, path }) => {
            acc.newFolders[path] = { name, path };
            return acc;
          }
        )(newFolder),
      { newFolders: state.folders }
    );

    return right({
      ...state,
      folders: newFolders
    });
  }
};

const alreadyExistsCheck = (
  path: string,
  state: FileSysTutorialState
): Either<Error, string> =>
  isDirectory(state, path) || isFile(state, path)
    ? left(new Error(`${path}: File or folder already exists`))
    : right(path);

const directoryExists = (path: string, state: FileSysTutorialState) =>
  isDirectory(state, path)
    ? right(path)
    : left(new Error(`${path} no such directory`));

const createNewFolders = (state: FileSysTutorialState, folderPaths: string[]) =>
  folderPaths.map(fp =>
    pipe(resolvePath(state, fp), chain(createNewFolder(state)))
  );

const createNewFolder = (state: FileSysTutorialState) => (path: string) =>
  pipe(
    alreadyExistsCheck(path, state),
    chain(existingPath => parentDirectory(state, existingPath)),
    chain(parentDirectory => directoryExists(parentDirectory, state)),
    chain(() => pathLast(state, path)),
    chain(name => right({ name, path }))
  );
