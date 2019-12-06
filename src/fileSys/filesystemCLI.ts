import { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { FolderModel } from "./graph/folder/FolderModel";
import { parse } from "../utils/parser";
import { graphlib, layout as dagreLayout } from "dagre";
import { TerminalCommand, CLIBundle } from "../commandMe/types";
import { FileModel } from "./graph/file/FileModel";
import { layoutGraph } from "../commandMe/layout";

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
      if (commands[executableCommand.mainCommand]) {
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
  const { folders, files, pwd } = state;
  const model = engine.getModel();

  const newFolders = Object.keys(folders).reduce<FolderModel[]>(
    (acc, current) => {
      const currentFolder = folders[current];
      const currentModel = model.getNode(currentFolder.path);
      if (!!currentModel) {
        if (currentModel && currentModel instanceof FolderModel)
          currentModel.setPwd(false);
        return acc;
      } else {
        return [
          ...acc,
          new FolderModel({
            id: currentFolder.path,
            name: currentFolder.name
          })
        ];
      }
    },
    []
  );

  model.addAll(...newFolders);

  const node = model.getNode(pwd);
  if (node && node instanceof FolderModel) {
    node.setPwd(true);
  }

  const newFiles = Object.keys(files).reduce<FileModel[]>((acc, current) => {
    const currentFile = files[current];

    return !!model.getNode(currentFile.path)
      ? acc
      : [
          ...acc,
          new FileModel({
            id: currentFile.path,
            name: currentFile.name
          })
        ];
  }, []);

  model.addAll(...newFiles);

  Object.keys({ ...folders, ...files }).forEach(currentPath => {
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

  layoutGraph(engine);
};
