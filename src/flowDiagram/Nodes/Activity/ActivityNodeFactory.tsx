import * as React from "react";
import { ActivityNodeModel } from "./ActivityNodeModel";
import { ActivityNode, ActivityNodePort } from "./ActivityNode";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { DefaultPortModel } from "@projectstorm/react-diagrams";

export class ActivityNodeFactory extends AbstractReactFactory<
  ActivityNodeModel,
  DiagramEngine
> {
  constructor() {
    super("activity-node");
  }

  generateModel(initialConfig: any) {
    return new ActivityNodeModel({ name: "Activity 1" });
  }

  generateReactWidget(event: any): JSX.Element {
    const engine = this.engine;
    return (
      <ActivityNode model={event.model}>
        <PortWidget
          engine={engine}
          port={event.model.getPort("in") || new DefaultPortModel(true)}
        >
          <ActivityNodePort />
        </PortWidget>
        <PortWidget
          engine={engine}
          port={event.model.getPort("out") || new DefaultPortModel(false)}
        >
          <ActivityNodePort />
        </PortWidget>
      </ActivityNode>
    );
  }
}
