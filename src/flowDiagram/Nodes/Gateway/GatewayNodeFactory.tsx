import * as React from "react";
import { GatewayNodeModel } from "./GatewayNodeModel";
import { GatewayNode, GatewayPort, Spacer } from "./GatewayNode";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { DefaultPortModel } from "@projectstorm/react-diagrams";

export class GatewayNodeFactory extends AbstractReactFactory<
  GatewayNodeModel,
  DiagramEngine
> {
  constructor() {
    super("gateway-node");
  }

  generateModel(initialConfig: any) {
    return new GatewayNodeModel({ name: "Gateway 1" });
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <GatewayNode model={event.model}>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("in") || new DefaultPortModel(true)}
        >
          <GatewayPort />
        </PortWidget>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("out1") || new DefaultPortModel(false)}
        >
          <GatewayPort />
        </PortWidget>
        <Spacer />
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("out2") || new DefaultPortModel(false)}
        >
          <GatewayPort />
        </PortWidget>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("out3") || new DefaultPortModel(false)}
        >
          <GatewayPort />
        </PortWidget>
      </GatewayNode>
    );
  }
}
