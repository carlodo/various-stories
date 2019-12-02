import {
  DiagramEngine,
  NodeModel,
  PortModel
} from "@projectstorm/react-diagrams";

export const addNode = (engine: DiagramEngine, node: NodeModel) =>
  engine.getModel().addNode(node);

export const getNode = (engine: DiagramEngine, nodeId: string) =>
  engine.getModel().getNode(nodeId);

export const linkNodes = (
  engine: DiagramEngine,
  sourcePort: PortModel,
  targetPort: PortModel
) => {
  const link = sourcePort.createLinkModel();
  link.setSourcePort(sourcePort);
  link.setTargetPort(targetPort);
  engine.getModel().addLink(link);
};

export const removeNode = (engine: DiagramEngine, node: NodeModel) =>
  engine.getModel().removeNode(node);

export const repaint = (engine: DiagramEngine) => {};
