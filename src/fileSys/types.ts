export const LIST_DIRECTORY = "LIST_DIRECTORY";
export const MAKE_DIRECTORY = "MAKE_DIRECTORY";
export const PRINT_WORKING_DIRECTORY = "PRINT_WORKING_DIRECTORY";

type CommandPayload = {
  command: string;
};

export type ExecutableCommand = {
  mainCommand: string;
  commands: string[];
  options: { [key: string]: boolean | string };
};

export type ListDirectoryAction = {
  type: typeof LIST_DIRECTORY;
  payload: CommandPayload;
};

export type MakeDirectoryAction = {
  type: typeof MAKE_DIRECTORY;
  payload: CommandPayload;
};

export type PrintWorkingDirectoryAction = {
  type: typeof PRINT_WORKING_DIRECTORY;
  payload: CommandPayload;
};

export type FileSysState = {
  user: string;
  pwd: string;
  folders: { [key: string]: { name: string; path: string } };
};

export type FileSysActions =
  | ListDirectoryAction
  | MakeDirectoryAction
  | PrintWorkingDirectoryAction;
