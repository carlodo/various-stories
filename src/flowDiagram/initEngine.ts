import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { ActivityNodeFactory } from "./Nodes/Activity/ActivityNodeFactory";
import { EventNodeFactory } from "./Nodes/Event/EventNodeFactory";
import { GatewayNodeFactory } from "./Nodes/Gateway/GatewayNodeFactory";
import { DefaultState } from "./diagram/DefaultState";
import { ActivityNodeModel } from "./Nodes/Activity/ActivityNodeModel";
import { EventNodeModel } from "./Nodes/Event/EventNodeModel";
import { InputType } from "@projectstorm/react-canvas-core";

export const initEngine = () => {
  // create an instance of the engine with all the defaults
  const engine = createEngine();

  engine.getStateMachine().pushState(new DefaultState());
  engine.getNodeFactories().registerFactory(new ActivityNodeFactory());
  engine.getNodeFactories().registerFactory(new EventNodeFactory());
  engine.getNodeFactories().registerFactory(new GatewayNodeFactory());

  // Deregister the default MOUSE_WHEEL actions
  const eventBus = engine.getActionEventBus();
  eventBus
    .getActionsForType(InputType.MOUSE_WHEEL)
    .forEach(action => eventBus.deregisterAction(action));

  const model = new DiagramModel();

  const node1 = new EventNodeModel({
    id: "1",
    name: "Main event",
    color: "rgb(192,192,255)"
  });
  const node2 = new ActivityNodeModel({
    id: "2",
    name: "Sample activity",
    color: "rgb(192,192,255)"
  });
  const node3 = new EventNodeModel({
    id: "3",
    name: "End event",
    color: "rgb(192,192,255)"
  });

  node1.setPosition(300, 200);
  node2.setPosition(500, 200);
  node3.setPosition(700, 200);

  model.addAll(node1, node2, node3);

  // TODO: Find or create a nicer api for diagram management
  // Add links
  const node1out = node1.getPort("out");
  const node2in = node2.getPort("in");
  const node2out = node2.getPort("out");
  const node3in = node3.getPort("in");
  if (node1out && node2in && node2out && node3in) {
    const link1 = node1out.createLinkModel();
    const link2 = node2out.createLinkModel();
    if (link1 && link2) {
      link1.setSourcePort(node1out);
      link1.setTargetPort(node2in);
      link2.setSourcePort(node2out);
      link2.setTargetPort(node3in);

      model.addAll(link1, link2);
    }
  }

  // model.registerListener({
  //   selectionChanged: () => console.log("New selection...")
  // });
  engine.setModel(model);

  return engine;
};
