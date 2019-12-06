import { createEngine } from "../commandMe/createEngine";
import { FileFactory } from "./graph/file/FileFactory";
import { FolderFactory } from "./graph/folder/FolderFactory";

export const initFileDiagramEngine = () => {
  // create an instance of the engine with all the defaults
  const engine = createEngine();

  engine.getNodeFactories().registerFactory(new FileFactory());
  engine.getNodeFactories().registerFactory(new FolderFactory());

  return engine;
};
