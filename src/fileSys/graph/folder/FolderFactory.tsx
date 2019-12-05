import * as React from "react";
import { FolderModel } from "./FolderModel";
import { Folder, FolderBody } from "./Folder";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";

export class FolderFactory extends AbstractReactFactory<
  FolderModel,
  DiagramEngine
> {
  constructor() {
    super("activity-node");
  }

  generateModel(initialConfig) {
    return new FolderModel({ name: "/" });
  }

  generateReactWidget({ model }: { model: any }): JSX.Element {
    const engine = this.engine;
    return (
      <Folder model={model}>
        <PortWidget engine={engine} port={model.getPort("in")}></PortWidget>
        <FolderBody />
        <PortWidget engine={engine} port={model.getPort("out")}></PortWidget>
      </Folder>
    );
  }
}
