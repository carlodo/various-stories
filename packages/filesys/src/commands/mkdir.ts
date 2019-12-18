import { Command, FileSysTutorialState, Folders, Folder } from "../types";
import { TerminalCommand } from "@sljk/nice-graph";
import { createNewNodes } from "./filesysUtils";
import { Either, right, fold } from "fp-ts/lib/Either";

export const mkdir: Command = {
  description: 'mkdir (make directory)\nex: "mkdir new_folder"',
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine
  ): Either<Error, FileSysTutorialState> => {
    const { state: newState, errors } = createNewNodes(
      state,
      action.commands.slice(1, action.commands.length),
      "folder"
    );

    terminalEngine.stdOut(errors.join(";\n"));

    return right(newState);
  }
};
