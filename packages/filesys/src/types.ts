import { TerminalCommand, TerminalEngine } from "@sljk/nice-graph";
import { either as E } from "fp-ts";

export type FileSysState = {
  user: string;
  pwd: string;
  folders: { [key: string]: { name: string; path: string } };
  files: { [key: string]: { name: string; path: string } };
};

export type Folder = { name: string; path: string };
export type Folders = { [key: string]: Folder };

export type File = { name: string; path: string };
export type Files = { [key: string]: Folder };

export type NodeType = "file" | "folder";

export type ChallengeState = {
  tut: {
    outro: string;
    optedIn: boolean;
    activeChallenge: number;
    challenges: Challenge[];
  };
};

export type FileSysTutorialState = FileSysState & ChallengeState;

export type Challenge = {
  intro: string;
  victory: string;
  check: (state: FileSysState) => boolean;
};

export type Command = {
  description?: string;
  execute: (
    command: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ) => E.Either<Error, FileSysTutorialState>;
};

export type Path = string;
