import {
  LIST_DIRECTORY,
  MAKE_DIRECTORY,
  PRINT_WORKING_DIRECTORY,
  FileSysState,
  ExecutableCommand
} from "./types";
import { FolderFactory } from "./graph/folder/FolderFactory";
import { FileFactory } from "./graph/file/FileFactory";
import { DiagramModel } from "@projectstorm/react-diagrams";
import { FolderModel } from "./graph/folder/FolderModel";
import { parse } from "../utils/parser";
import { graphlib, layout as dagreLayout } from "dagre";

type Cmnd = {
  command: string;
  description: string;
  action: string;
  execute: (action: ExecutableCommand, state: FileSysState) => FileSysState;
  output: (action: ExecutableCommand, state: FileSysState) => string;
};

export type Commands = {
  ls: Cmnd;
  mkdir: Cmnd;
  pwd: Cmnd;
};

export type CLIBundle = {
  initialState: unknown;
  initialize: (engine: any) => void;
  componentFactories: unknown;
  commands: Commands;
  execute: (command: string, Engine: unknown) => void;
};

const commands = {
  ls: {
    command: "ls",
    description: "list directory",
    action: LIST_DIRECTORY,
    execute: (_action: ExecutableCommand, state: FileSysState) => state,
    output: (_action: ExecutableCommand, state: FileSysState) =>
      "terminal output ls"
  },
  mkdir: {
    command: "mkdir",
    description: "makes directory",
    action: MAKE_DIRECTORY,
    execute: (action: ExecutableCommand, state: FileSysState) => ({
      ...state,
      folders: [...state.folders, { name: action.commands[1] }]
    }),
    output: (_action: ExecutableCommand, state: FileSysState) =>
      "terminal output mkdir"
  },
  pwd: {
    command: "pwd",
    description: "print working directory",
    action: PRINT_WORKING_DIRECTORY,
    execute: (_action: ExecutableCommand, state: FileSysState) => state,
    output: (action: ExecutableCommand, state: FileSysState) => state.pwd
  }
};

const initialState: FileSysState = {
  tutorialContext: ["filesys"],
  history: [],
  user: "joe",
  pwd: "/home/joe",
  folders: [
    { name: "/" },
    { name: "home", parent: "root" },
    { name: "joe", parent: "home" }
  ]
};

export const makeLearnCliBundle = (): CLIBundle => {
  let state = initialState;

  return {
    initialState,
    initialize: (engine: any) => layout(state, engine),
    componentFactories: [FolderFactory, FileFactory],
    commands,
    execute: (command: string, engine: any) => {
      const executableCommand = parse(command);
      if (Object.keys(commands).indexOf(executableCommand.mainCommand) !== -1) {
        const supportedCommand = executableCommand.mainCommand as keyof Commands;
        state = commands[supportedCommand].execute(executableCommand, state);
        layout(state, engine);
      }
    }
  };
};

const layout = (state: FileSysState, engine: any) => {
  const model = new DiagramModel();
  model.addAll(
    ...state.folders.map(fld => new FolderModel({ name: fld.name }))
  );
  engine.setModel(model);
  const g = new graphlib.Graph({
    directed: true
  });
  g.setGraph({ rankdir: "TB", ranker: "longest-path" });

  model.getNodes().forEach(node =>
    g.setNode(node.getID(), {
      width: node.width,
      height: node.height
    })
  );

  dagreLayout(g);

  g.nodes().forEach(v => {
    const node = g.node(v);
    model.getNode(v).setPosition(node.x, node.y);
  });

  engine.repaintCanvas();
};
