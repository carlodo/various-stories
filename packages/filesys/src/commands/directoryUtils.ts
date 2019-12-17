import pathlib from "path";
import { FileSysTutorialState, Path } from "../types";
import { Either, left, right } from "fp-ts/lib/Either";
import { either } from "fp-ts";

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
  either.map<Path, Path>(resolvedPath => {
    const splitPath = resolvedPath.split("/");
    return splitPath.slice(0, -1).join("/");
  })(resolvePath(state, path));
// either.chain<Error, String, String>(resolvedPath => {
//   const splitPath = resolvedPath.split("/");
//   return right(splitPath.slice(0, -1).join("/"));
// })(resolvePath(state, path));

export const pathLast = (
  state: FileSysTutorialState,
  path: Path
): Either<Error, Path> =>
  either.map((path: Path) => {
    const resolvedPathSplit = path.split("/");
    return resolvedPathSplit[resolvedPathSplit.length - 1];
  })(resolvePath(state, path));
