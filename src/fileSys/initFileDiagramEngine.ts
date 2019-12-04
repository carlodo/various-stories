import createEngine from "@projectstorm/react-diagrams";
import { FileFactory } from "./graph/file/FileFactory";
import { FolderFactory } from "./graph/folder/FolderFactory";
import { InputType } from "@projectstorm/react-canvas-core";
import { NodeLayerFactory2 } from "./node-layer/NodeLayerFactory";
import { LinkLayerFactory } from "./link-layer/LinkLayerFactory";
import { NewLinkFactory } from "./link-layer/NewLinkFactory";

export const initFileDiagramEngine = () => {
  // create an instance of the engine with all the defaults
  const engine = createEngine();

  engine.getLayerFactories().registerFactory(new NodeLayerFactory2());
  engine.getLayerFactories().registerFactory(new LinkLayerFactory());

  engine.getNodeFactories().registerFactory(new FileFactory());
  engine.getNodeFactories().registerFactory(new FolderFactory());

  engine.getLinkFactories().registerFactory(new NewLinkFactory());
  // Deregister the default MOUSE_WHEEL actions
  const eventBus = engine.getActionEventBus();
  eventBus
    .getActionsForType(InputType.MOUSE_WHEEL)
    .forEach(action => eventBus.deregisterAction(action));

  return engine;
};
