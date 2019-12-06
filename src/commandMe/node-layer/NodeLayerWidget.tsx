import * as React from "react";
import * as _ from "lodash";
import {
  NodeLayerModel,
  DiagramEngine,
  NodeModel
} from "@projectstorm/react-diagrams";
import { NodeWidget } from "./NodeWidget";

export interface NodeLayerWidgetProps {
  layer: NodeLayerModel;
  engine: DiagramEngine;
}

export class NodeLayerWidget extends React.Component<NodeLayerWidgetProps> {
  render() {
    return _.map(this.props.layer.getNodes(), (node: NodeModel) => (
      <NodeWidget
        key={node.getID()}
        diagramEngine={this.props.engine}
        node={node}
      />
    ));
  }
}
