import { Command, FileSysTutorialState, File, Files } from "../types";
import { TerminalCommand } from "@sljk/nice-graph";
import { createNewNodes } from "./filesysUtils";
import { fold, right } from "fp-ts/lib/Either";

export const touch: Command = {
  description: 'touch (create file) ex: "touch new_file"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine
  ) => {
    const { state: newState, errors } = createNewNodes(
      state,
      action.commands.slice(1, action.commands.length),
      "file"
    );

    terminalEngine.stdOut(errors.join(";\n"));

    return right(newState);
  }
};
