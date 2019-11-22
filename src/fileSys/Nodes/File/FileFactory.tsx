import * as React from "react";
import { FileModel } from "./FileModel";
import { PortWidget, DiagramEngine } from "@projectstorm/react-diagrams-core";
import { File, FilePort } from "./File";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DefaultPortModel } from "@projectstorm/react-diagrams";

export class EventNodeFactory extends AbstractReactFactory<
  FileModel,
  DiagramEngine
> {
  constructor() {
    super("event-node");
  }

  generateModel(event: any) {
    return new FileModel({ name: event.name });
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <File model={event.model}>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("in") || new DefaultPortModel(true)}
        >
          <FilePort />
        </PortWidget>
        <PortWidget
          engine={this.engine}
          port={event.model.getPort("out") || new DefaultPortModel(false)}
        >
          <FilePort />
        </PortWidget>
      </File>
    );
  }
}
