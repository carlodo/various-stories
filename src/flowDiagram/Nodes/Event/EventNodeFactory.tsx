import * as React from "react";
import { EventNodeModel } from "./EventNodeModel";
import { PortWidget, DiagramEngine } from "@projectstorm/react-diagrams-core";
import { EventNode, EventNodePort } from "./EventNode";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultPortModel } from "@projectstorm/react-diagrams";

export class EventNodeFactory extends AbstractReactFactory<
  EventNodeModel,
  DiagramEngine
> {
  constructor() {
    super("event-node");
  }

  generateModel(initialConfig: any) {
    return new EventNodeModel({ name: "Event 1" });
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <EventNode model={event.model}>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("in") || new DefaultPortModel(true)}
        >
          <EventNodePort />
        </PortWidget>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("out") || new DefaultPortModel(false)}
        >
          <EventNodePort />
        </PortWidget>
      </EventNode>
    );
  }
}
