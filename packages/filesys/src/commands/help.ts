import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import { FileSysTutorialState, Command } from "../types";
import { cd } from "./cd";
import { touch } from "./touch";
import { pwd } from "./pwd";
import { mkdir } from "./mkdir";
import { clear } from "./clear";
import { either } from "fp-ts";

const commandDescriptions = [cd, mkdir, pwd, touch, clear]
  .map(cmd => cmd.description)
  .join("\n\n");

export const help: Command = {
  execute: (
    _action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => {
    terminalEngine.stdOut(
      `supported commands are:\n\n${commandDescriptions}\n\nhelp (shows this menu)`
    );

    return either.right(state);
  }
};
