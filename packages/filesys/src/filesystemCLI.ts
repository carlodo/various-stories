import { FolderModel } from "./graph/folder/FolderModel";
import { parse } from "./parser";
import { CLIBundle, TerminalEngine, DiagramEngine } from "@sljk/nice-graph";
import { FileModel } from "./graph/file/FileModel";
import { Command, FileSysState, FileSysTutorialState } from "./types";
import { ls } from "./commands/ls";
import { mkdir } from "./commands/mkdir";
import { pwd } from "./commands/pwd";
import { touch } from "./commands/touch";
import { cd } from "./commands/cd";
import { help } from "./commands/help";
import { clear } from "./commands/clear";
import { tut, checkTutorialState } from "./commands/tut";
import { intro, introMessage } from "./commands/intro";
import { FileFactory } from "./graph/file/FileFactory";
import { FolderFactory } from "./graph/folder/FolderFactory";

export type Commands = { [key: string]: Command };

const commands: { [key: string]: Command } = {
  ls,
  mkdir,
  pwd,
  touch,
  cd,
  help,
  clear,
  intro,
  tut
};

const initialFileState: FileSysState = {
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

const initialState: FileSysTutorialState = {
  ...initialFileState,
  tut: {
    optedIn: false,
    activeChallenge: 0,
    outro: `
      This tutorial is still in development.
      
      If you liked the concept please let me know. Also feel free to contribute or give feedback at [GIT URL] 😉.
    `,
    challenges: [
      {
        intro: `Greetings fellow CLI user 🤗. Welcome to the file system CLI tutorial.

        === CHALLENGE NO 1

        In this first challenge I dare you to create a folder named 'magic' in your home directory (/home/joe)
      `,
        victory: `🥁 HUZZAH 🥁

        for next challenge type 'tut next'
      `,
        check: state => !!state.folders["/home/joe/magic"]
      },
      {
        intro: `HOHO, I wasn't expecting you'll make it this far. Prepare for my ultimate challenge.

        === CHALLENGE NO 2

        Please create a file in /etc folder called 'ultimate-file'
      `,
        victory: `With the creation of this file you hear a loud 💥 in the distance.
        it seems the ultimate file has done it's damage. Time to head back to our home planet.
        
        for next challenge type 'tut next'
      `,
        check: state => !!state.files["/etc/ultimate-file"]
      }
    ]
  }
};

export const makeLearnCliBundle = (): CLIBundle => {
  let state = initialState;

  return {
    initialize: (
      diagramEngine: DiagramEngine,
      terminalEngine: TerminalEngine
    ) => {
      diagramEngine.getNodeFactories().registerFactory(new FileFactory());
      diagramEngine.getNodeFactories().registerFactory(new FolderFactory());

      terminalEngine.stdOut(introMessage);

      layoutGraph(state, diagramEngine);
    },
    execute: (
      command: string,
      diagramEngine: DiagramEngine,
      terminalEngine: TerminalEngine
    ): void => {
      const executableCommand = parse(command);
      if (commands[executableCommand.mainCommand]) {
        const supportedCommand = executableCommand.mainCommand as keyof Commands;
        const newState = commands[supportedCommand].execute(
          executableCommand,
          state,
          terminalEngine
        );

        state = checkTutorialState(newState, terminalEngine);

        layoutGraph(state, diagramEngine);
      } else {
        terminalEngine.stdOut(
          `Sorry, command "${executableCommand.mainCommand}" is not supported`
        );
      }
    }
  };
};

const layoutGraph = (state: FileSysTutorialState, engine: DiagramEngine) => {
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
