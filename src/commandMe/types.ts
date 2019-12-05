export type TerminalCommand = {
  mainCommand: string;
  commands: string[];
  options: { [key: string]: boolean | string };
};

export type CLIBundle = {
  initialize: (engine: any) => void;
  execute: (command: string, Engine: unknown) => string | undefined;
};
