import { TerminalCommand } from "../cliTutorialPlatform/types";

export type FileSysState = {
  user: string;
  pwd: string;
  folders: { [key: string]: { name: string; path: string } };
  files: { [key: string]: { name: string; path: string } };
};

export type Command = {
  description?: string;
  execute: (
    command: TerminalCommand,
    state: FileSysState
  ) => { state: FileSysState; output?: string };
};
