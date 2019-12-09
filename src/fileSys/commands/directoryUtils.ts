import pathlib from "path";
import { FileSysTutorialState } from "../types";

export const isDirectory = (state: FileSysTutorialState, path: string) => {
  const resolvedPath = resolvePath(state, path);
  if (!resolvedPath) return false;

  return !!state.folders[resolvedPath];
};

export const resolvePath = (state: FileSysTutorialState, path: string) => {
  // Try to use fp-ts Either functor and add types
  if (!path || path === "") return false;

  const pathWithTilda = path.replace("~", `/home/${state.user}`);
  const isRelativePath = !pathWithTilda.startsWith("/");
  const startPath = isRelativePath ? `${state.pwd}/` : "/";

  return pathlib.resolve(startPath, pathWithTilda);
};

export const parentDirectory = (state: FileSysTutorialState, path: string) => {
  const resolvedPath = resolvePath(state, path);
  const splitPath = resolvedPath.split("/");
  return splitPath.slice(0, -1).join("/");
};

export const pathLast = (state: FileSysTutorialState, path: string) => {
  const resolvedPathSplit = resolvePath(state, path).split("/");
  return resolvedPathSplit[resolvedPathSplit.length - 1];
};
