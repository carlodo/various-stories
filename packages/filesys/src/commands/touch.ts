import { Command, FileSysTutorialState } from "../types";
import { TerminalCommand } from "@sljk/nice-graph";
import {
  pathLast,
  isDirectory,
  parentDirectory,
  resolvePath
} from "./directoryUtils";
import { left } from "fp-ts/lib/Either";

export const touch: Command = {
  description: 'touch (create file) ex: "touch new_file"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    termnalEngine
  ) => {
    // const path = action.commands[1];
    // const resolvedPath = resolvePath(state, path);
    // const fileName = pathLast(state, path);
    // const parent = parentDirectory(state, path);

    return left(new Error("Not implemented yet"));
  }
};
