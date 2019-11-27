import parser from "yargs-parser";
import { ExecutableCommand } from "../filesys/types";

export const parse = (command: string): ExecutableCommand => {
  const { _, ...rest } = parser(command);
  return { mainCommand: _[0], commands: _, options: rest };
};
