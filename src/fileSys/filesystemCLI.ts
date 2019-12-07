import { DiagramModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { FolderModel } from "./graph/folder/FolderModel";
import { parse } from "../utils/parser";
import { CLIBundle } from "../cliTutorialPlatform/types";
import { FileModel } from "./graph/file/FileModel";
import { Command, FileSysState } from "./types";
import { ls } from "./commands/ls";
import { mkdir } from "./commands/mkdir";
import { pwd } from "./commands/pwd";
import { touch } from "./commands/touch";
import { cd } from "./commands/cd";
import { help } from "./commands/help";

export type Commands = { [key: string]: Command };

const commands: { [key: string]: Command } = {
  ls,
  mkdir,
  pwd,
  touch,
  cd,
  help
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
      updateEngine(state, engine);
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
        updateEngine(state, engine);

        return output;
      } else {
        return `Sorry, command "${executableCommand.mainCommand}" is not supported`;
      }
    }
  };
};

const updateEngine = (state: FileSysState, engine: DiagramEngine) => {
  const { folders, files, pwd } = state;
  const model = engine.getModel();

  const modelIds = model.getNodes().map(nodeModel => {
    const modelId = nodeModel.getID();
    if (nodeModel instanceof FolderModel) {
      if (folders[modelId]) {
        nodeModel.setPwd(modelId === pwd);
      } else {
        model.removeNode(nodeModel);
      }
    } else if (nodeModel instanceof FileModel) {
      if (!files[modelId]) model.removeNode(nodeModel);
    }

    return modelId;
  });

  const newFolders = Object.keys(folders)
    .filter(path => modelIds.indexOf(path) === -1)
    .map(
      path =>
        new FolderModel({
          id: path,
          name: folders[path].name,
          isPWD: path === pwd,
          path
        })
    );

  const newFiles = Object.keys(files)
    .filter(path => modelIds.indexOf(path) === -1)
    .map(
      path =>
        new FileModel({
          id: path,
          name: files[path].name,
          path
        })
    );

  model.addAll(...newFolders, ...newFiles);

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

  engine.setModel(model);
};
