import createRDEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { InputType } from "@projectstorm/react-canvas-core";
import { NodeLayerFactory2 } from "./node-layer/NodeLayerFactory";
import { LinkLayerFactory } from "./link-layer/LinkLayerFactory";
import { NewLinkFactory } from "./link-layer/NewLinkFactory";
import { DefaultDiagramState } from "../cliTutorialPlatform/DefaultDiagramState";

export const createEngine = () => {
  // create an instance of the engine with all the defaults
  const engine = createRDEngine();

  engine.getLayerFactories().registerFactory(new NodeLayerFactory2());
  engine.getLayerFactories().registerFactory(new LinkLayerFactory());
  engine.getLinkFactories().registerFactory(new NewLinkFactory());

  engine.getStateMachine().pushState(new DefaultDiagramState());
  engine.setModel(new DiagramModel());

  // Deregister the default MOUSE_WHEEL actions
  const eventBus = engine.getActionEventBus();
  eventBus
    .getActionsForType(InputType.MOUSE_WHEEL)
    .forEach(action => eventBus.deregisterAction(action));

  return engine;
};
