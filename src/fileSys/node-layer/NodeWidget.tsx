import * as React from "react";
import * as _ from "lodash";
import { PeformanceWidget } from "@projectstorm/react-canvas-core";
import { NodeModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { ActualNode } from "./ActualNode";

export interface NodeProps {
  node: NodeModel;
  children?: any;
  diagramEngine: DiagramEngine;
}

export const NodeWidget = ({ node, diagramEngine }: NodeProps) => {
  return (
    <PeformanceWidget model={node} serialized={node.serialize()}>
      {() => <ActualNode node={node} diagramEngine={diagramEngine} />}
    </PeformanceWidget>
  );
};
