import { DiagramEngine } from "@projectstorm/react-diagrams";

export type TerminalCommand = {
  mainCommand: string;
  commands: string[];
  options: { [key: string]: boolean | string };
};

export interface TerminalEngine {
  clearStdOut: () => void;
  stdOut: (newStdOut: string) => void;
}

export type CLIBundle = {
  initialize: (engine: DiagramEngine, terminalEngine: TerminalEngine) => void;
  execute: (
    command: string,
    diagramEngine: DiagramEngine,
    terminalEngine: TerminalEngine
  ) => void;
};
