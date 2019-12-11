import * as React from "react";
import { NodeLayerModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { NodeWidget } from "./NodeWidget";

export interface NodeLayerWidgetProps {
  layer: NodeLayerModel;
  engine: DiagramEngine;
}

export class NodeLayerWidget extends React.Component<NodeLayerWidgetProps> {
  render() {
    const nodes = this.props.layer.getNodes();
    return Object.keys(nodes).map(nodeKey => (
      <NodeWidget
        key={nodes[nodeKey].getID()}
        diagramEngine={this.props.engine}
        node={nodes[nodeKey]}
      />
    ));
  }
}
