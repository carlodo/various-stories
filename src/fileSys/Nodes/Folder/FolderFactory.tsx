import * as React from "react";
import { FolderModel } from "./FolderModel";
import { Folder, FolderPort } from "./Folder";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { DefaultPortModel } from "@projectstorm/react-diagrams";

export class FolderFactory extends AbstractReactFactory<
  FolderModel,
  DiagramEngine
> {
  constructor() {
    super("activity-node");
  }

  generateModel(initialConfig: any) {
    return new FolderModel({ name: "Activity 1", color: "blue" });
  }

  generateReactWidget(event: any): JSX.Element {
    const engine = this.engine;
    return (
      <Folder model={event.model}>
        <PortWidget
          engine={engine}
          port={event.model.getPort("in") || new DefaultPortModel(true)}
        >
          <FolderPort />
        </PortWidget>
        <PortWidget
          engine={engine}
          port={event.model.getPort("out") || new DefaultPortModel(false)}
        >
          <FolderPort />
        </PortWidget>
      </Folder>
    );
  }
}
