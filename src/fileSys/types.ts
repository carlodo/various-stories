import { TerminalCommand, TerminalEngine } from "../cliTutorialPlatform/types";

export type FileSysState = {
  user: string;
  pwd: string;
  folders: { [key: string]: { name: string; path: string } };
  files: { [key: string]: { name: string; path: string } };
};

export type ChallangeState = {
  tut: {
    outro: string;
    optedIn: boolean;
    activeChallange: number;
    challanges: Challange[];
  };
};

export type FileSysTutorialState = FileSysState & ChallangeState;

export type Challange = {
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
  ) => FileSysTutorialState;
};
