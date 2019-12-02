import * as React from "react";
import { GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { NodeLayerWidget } from "./NodeLayerWidget";
import { NodeLayerFactory, NodeLayerModel } from "@projectstorm/react-diagrams";

export class NodeLayerFactory2 extends NodeLayerFactory {
  constructor() {
    super();
  }

  generateReactWidget(event: GenerateWidgetEvent<NodeLayerModel>): JSX.Element {
    return <NodeLayerWidget layer={event.model} engine={this.engine} />;
  }
}
