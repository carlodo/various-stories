import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { FileFactory } from "./graph/file/FileFactory";
import { FolderFactory } from "./graph/folder/FolderFactory";
import { InputType } from "@projectstorm/react-canvas-core";
import { FolderModel } from "./graph/folder/FolderModel";

export const initFileDiagramEngine = () => {
  // create an instance of the engine with all the defaults
  const engine = createEngine();

  engine.getNodeFactories().registerFactory(new FileFactory());
  engine.getNodeFactories().registerFactory(new FolderFactory());

  // Deregister the default MOUSE_WHEEL actions
  const eventBus = engine.getActionEventBus();
  eventBus
    .getActionsForType(InputType.MOUSE_WHEEL)
    .forEach(action => eventBus.deregisterAction(action));

  const node = new FolderModel({
    name: "/"
  });
  node.setPosition(400, 40);

  const model = new DiagramModel();
  model.addNode(node);
  engine.setModel(model);

  return engine;
};
