import parser from "yargs-parser";
import { TerminalCommand } from "@sljk/nice-graph";

export const parse = (command: string): TerminalCommand => {
  const { _, ...rest } = parser(command);
  return { mainCommand: _[0], commands: _, options: rest };
};
