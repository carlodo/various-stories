import * as React from "react";
import { FolderModel } from "./FolderModel";
import { Folder, FolderBody } from "./Folder";
import {
  DiagramEngine,
  PortWidget,
  AbstractReactFactory
} from "@sljk/nice-graph";

export class FolderFactory extends AbstractReactFactory<
  FolderModel,
  DiagramEngine
> {
  constructor() {
    super("folder-node");
  }

  generateModel(event: any) {
    return new FolderModel({ name: event.name });
  }

  generateReactWidget({ model }: { model: any }): JSX.Element {
    const engine = this.engine;
    return (
      <Folder model={model}>
        <PortWidget engine={engine} port={model.getPort("in")}></PortWidget>
        <FolderBody isPWD={model.isPWD} />
        <PortWidget engine={engine} port={model.getPort("out")}></PortWidget>
      </Folder>
    );
  }
}
