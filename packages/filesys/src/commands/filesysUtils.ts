import pathlib from "path";
import { FileSysTutorialState, Path, Folder, File, NodeType } from "../types";
import { Either, left, right, chain, fold } from "fp-ts/lib/Either";
import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";

export const absolutePath = (
  state: FileSysTutorialState,
  path: Path
): Either<Error, Path> => {
  if (!path || path === "")
    return left(new Error(`Invalid path passed "${path}"`));

  const pathWithTilda = path.replace("~", `/home/${state.user}`);
  const isRelativePath = !pathWithTilda.startsWith("/");
  const startPath = isRelativePath ? `${state.pwd}/` : "/";

  return right(pathlib.resolve(startPath, pathWithTilda));
};

export const isDirectory = (state: FileSysTutorialState, path: Path) =>
  either.fold(
    () => false,
    (path: Path) => !!state.folders[path]
  )(absolutePath(state, path));

export const isFile = (state: FileSysTutorialState, path: Path) =>
  either.fold(
    () => false,
    (path: Path) => !!state.files[path]
  )(absolutePath(state, path));

export const parentDirectory = (
  state: FileSysTutorialState,
  path: string
): Either<Error, Path> =>
  pipe(
    absolutePath(state, path),
    chain(resolvedPath => {
      const parentPath = resolvedPath
        .split("/")
        .slice(0, -1)
        .join("/");
      return parentPath === "" ? right("/") : right(parentPath);
    })
  );

export const pathLast = (
  state: FileSysTutorialState,
  path: Path
): Either<Error, Path> =>
  either.map((path: Path) => {
    const pathSplit = path.split("/");
    return pathSplit[pathSplit.length - 1];
  })(absolutePath(state, path));

export const alreadyExistsCheck = (
  path: string,
  state: FileSysTutorialState
): Either<Error, string> =>
  isDirectory(state, path) || isFile(state, path)
    ? left(new Error(`${path}: File or folder already exists`))
    : right(path);

export const directoryExistsCheck = (
  path: string,
  state: FileSysTutorialState
) =>
  isDirectory(state, path)
    ? right(path)
    : left(new Error(`${path} no such directory`));

export const createNewNodes = (
  state: FileSysTutorialState,
  filePaths: string[],
  nodeType: NodeType
): { state: FileSysTutorialState; errors: string[] } => {
  if (filePaths.length < 1) return { state, errors: ["File paths are needed"] };

  return filePaths
    .map(fp =>
      pipe(absolutePath(state, fp), chain(createNewFileSysNode(state)))
    )
    .reduce<{ errors: string[]; state: FileSysTutorialState }>(
      (acc, newNode) => {
        fold<Error, File, void>(
          (error: Error) => {
            acc.errors.push(error.message);
          },
          ({ name, path }: { name: string; path: string }) => {
            fold(
              (error: Error) => {
                acc.errors.push(error.message);
              },
              () => {
                if (nodeType === "file") acc.state.files[path] = { path, name };
                else acc.state.folders[path] = { path, name };
              }
            )(alreadyExistsCheck(path, acc.state));
          }
        )(newNode);

        return acc;
      },
      { errors: [], state }
    );
};

export const createNewFileSysNode = (state: FileSysTutorialState) => (
  path: string
) =>
  pipe(
    alreadyExistsCheck(path, state),
    chain(existingPath => parentDirectory(state, existingPath)),
    chain(parentDirectory => directoryExistsCheck(parentDirectory, state)),
    chain(() => pathLast(state, path)),
    chain(name => right({ name, path }))
  );
