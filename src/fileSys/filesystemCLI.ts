import { FileSysState, ExecutableCommand } from "./types";
import { FolderFactory } from "./graph/folder/FolderFactory";
import { FileFactory } from "./graph/file/FileFactory";
import { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { FolderModel } from "./graph/folder/FolderModel";
import { parse } from "../utils/parser";
import { graphlib, layout as dagreLayout } from "dagre";

type Cmnd = {
  command: string;
  description: string;
  execute: (
    command: ExecutableCommand,
    state: FileSysState
  ) => { state: FileSysState; output?: string };
};

export type Commands = { [key: string]: Cmnd };

export type CLIBundle = {
  initialState: unknown;
  initialize: (engine: any) => void;
  componentFactories: unknown;
  commands: Commands;
  execute: (command: string, Engine: unknown) => string | undefined;
};

const commands: { [key: string]: Cmnd } = {
  ls: {
    command: "ls",
    description: "list directory",
    execute: (_action: ExecutableCommand, state: FileSysState) => ({
      state,
      output: "ls command"
    })
  },
  mkdir: {
    command: "mkdir",
    description: "makes directory",
    execute: (action: ExecutableCommand, state: FileSysState) => {
      const name = action.commands[1];
      const path = `${state.pwd}/${name}`;

      return {
        state: {
          ...state,
          folders: {
            ...state.folders,
            [path]: { name, path }
          }
        }
      };
    }
  },
  pwd: {
    command: "pwd",
    description: "print working directory",
    execute: (_action: ExecutableCommand, state: FileSysState) => ({
      state,
      output: state.pwd
    })
  }
};

const initialState: FileSysState = {
  user: "joe",
  pwd: "/home/joe",
  folders: {
    "/": { name: "/", path: "/" },
    "/etc": { name: "etc", path: "/etc" },
    "/home": { name: "home", path: "/home" },
    "/home/joe": { name: "joe", path: "/home/joe" }
  }
};

export const makeLearnCliBundle = (): CLIBundle => {
  let state = initialState;

  return {
    initialState,
    initialize: (engine: any) => {
      engine.setModel(new DiagramModel());
      layout(state, engine);
    },
    componentFactories: [FolderFactory, FileFactory],
    commands,
    execute: (command: string, engine: any): string | undefined => {
      const executableCommand = parse(command);
      if (Object.keys(commands).indexOf(executableCommand.mainCommand) !== -1) {
        const supportedCommand = executableCommand.mainCommand as keyof Commands;
        const { state: newState, output } = commands[supportedCommand].execute(
          executableCommand,
          state
        );
        state = newState;
        layout(state, engine);

        return output;
      } else {
        return `Sorry, command "${executableCommand.mainCommand}" is not supported`;
      }
    }
  };
};

const layout = (state: FileSysState, engine: DiagramEngine) => {
  const model = engine.getModel();
  const folders = state.folders;
  const newFolders = Object.keys(folders).reduce<FolderModel[]>(
    (acc, current) => {
      const currentFolder = folders[current];
      return !!model.getNode(currentFolder.path)
        ? acc
        : [
            ...acc,
            new FolderModel({
              id: currentFolder.path,
              name: currentFolder.name
            })
          ];
    },
    []
  );
  model.addAll(...newFolders);

  Object.keys(folders).forEach(foldPath => {
    if (foldPath === "/") return;
    const paths = foldPath.split("/");
    paths.pop();
    const parent =
      paths.length === 1
        ? folders["/"]
        : folders[`/${paths.slice(1).join("/")}`];
    const parentNode = model.getNode(parent.path);
    const node = model.getNode(foldPath);
    const sourcePort = parentNode.getPort("out");
    const targetPort = node.getPort("in");
    if (Object.keys(targetPort.links).length > 0) return;

    const link = sourcePort.createLinkModel();
    link.setSourcePort(sourcePort);
    sourcePort.reportPosition();

    link.setTargetPort(targetPort);
    model.addLink(link);
  });

  const g = new graphlib.Graph({
    multigraph: true,
    directed: true
  });
  g.setGraph({ rankdir: "TB", ranker: "longest-path" });

  model.getNodes().forEach(node =>
    g.setNode(node.getID(), {
      width: node.width,
      height: node.height
    })
  );

  g.setDefaultEdgeLabel(() => ({}));

  model.getLinks().forEach(link => {
    if (link.getSourcePort() && link.getTargetPort()) {
      g.setEdge({
        v: link
          .getSourcePort()
          .getNode()
          .getID(),
        w: link
          .getTargetPort()
          .getNode()
          .getID(),
        name: link.getID()
      });
    }
  });

  dagreLayout(g);

  g.nodes().forEach(v => {
    const node = g.node(v);
    model.getNode(v).setPosition(node.x, node.y);
  });

  engine.setModel(model);
  engine.repaintCanvas();
};
