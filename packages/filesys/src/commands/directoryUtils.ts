import pathlib from "path";
import { FileSysTutorialState, Path } from "../types";
import { Either, left, right, chain } from "fp-ts/lib/Either";
import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/pipeable";

export const isDirectory = (state: FileSysTutorialState, path: Path) =>
  either.fold(
    () => false,
    (path: Path) => !!state.folders[path]
  )(resolvePath(state, path));

export const isFile = (state: FileSysTutorialState, path: Path) =>
  either.fold(
    () => false,
    (path: Path) => !!state.files[path]
  )(resolvePath(state, path));

export const resolvePath = (
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

export const parentDirectory = (
  state: FileSysTutorialState,
  path: string
): Either<Error, Path> =>
  pipe(
    resolvePath(state, path),
    chain(resolvedPath =>
      right(
        resolvedPath
          .split("/")
          .slice(0, -1)
          .join("/")
      )
    )
  );

export const pathLast = (
  state: FileSysTutorialState,
  path: Path
): Either<Error, Path> =>
  either.map((path: Path) => {
    const pathSplit = path.split("/");
    return pathSplit[pathSplit.length - 1];
  })(resolvePath(state, path));
