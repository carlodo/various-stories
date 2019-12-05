import { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { FolderModel } from "./graph/folder/FolderModel";
import { parse } from "../utils/parser";
import { graphlib, layout as dagreLayout } from "dagre";
import { TerminalCommand, CLIBundle } from "../commandMe/types";
import { FileModel } from "./graph/file/FileModel";

export type FileSysState = {
  user: string;
  pwd: string;
  folders: { [key: string]: { name: string; path: string } };
  files: { [key: string]: { name: string; path: string } };
};

type Command = {
  description?: string;
  execute: (
    command: TerminalCommand,
    state: FileSysState
  ) => { state: FileSysState; output?: string };
};

export type Commands = { [key: string]: Command };

const commands: { [key: string]: Command } = {
  ls: {
    description: "list directory",
    execute: (_action: TerminalCommand, state: FileSysState) => ({
      state,
      output: "ls command"
    })
  },
  mkdir: {
    execute: (action: TerminalCommand, state: FileSysState) => {
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
    execute: (_action: TerminalCommand, state: FileSysState) => ({
      state,
      output: state.pwd
    })
  },
  touch: {
    execute: (action: TerminalCommand, state: FileSysState) => {
      const name = action.commands[1];
      const path = `${state.pwd}/${name}`;

      return {
        state: {
          ...state,
          files: {
            ...state.files,
            [path]: { name, path }
          }
        }
      };
    }
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
  },
  files: {
    "/home/joe/.bash_profile": {
      name: ".bash_profile",
      path: "/home/joe/.bash_profile"
    }
  }
};

export const makeLearnCliBundle = (): CLIBundle => {
  let state = initialState;

  return {
    initialize: (engine: any) => {
      engine.setModel(new DiagramModel());
      layout(state, engine);
    },
    execute: (command: string, engine: DiagramEngine): string | undefined => {
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
      const mod = model.getNode(currentFolder.path);
      console.log(currentFolder.path, state.pwd, "fff");
      return !!mod
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

  const node = model.getNode(state.pwd);
  if (node && node instanceof FolderModel) {
    node.setPwd(true);
  }

  const newFiles = Object.keys(state.files).reduce<FileModel[]>(
    (acc, current) => {
      const currentFile = state.files[current];

      return !!model.getNode(currentFile.path)
        ? acc
        : [
            ...acc,
            new FileModel({
              id: currentFile.path,
              name: currentFile.name
            })
          ];
    },
    []
  );

  model.addAll(...newFiles);

  Object.keys({ ...folders, ...state.files }).forEach(currentPath => {
    if (currentPath === "/") return;
    const paths = currentPath.split("/");
    paths.pop();
    const parent =
      paths.length === 1
        ? folders["/"]
        : folders[`/${paths.slice(1).join("/")}`];
    const parentNode = model.getNode(parent.path);
    const node = model.getNode(currentPath);
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
