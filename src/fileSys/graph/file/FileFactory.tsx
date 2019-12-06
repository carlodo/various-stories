import * as React from "react";
import { FileModel } from "./FileModel";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { File, FileBody } from "./File";
import {
  AbstractReactFactory,
  GenerateModelEvent
} from "@projectstorm/react-canvas-core";

export class FileFactory extends AbstractReactFactory<
  FileModel,
  DiagramEngine
> {
  constructor() {
    super("file-node");
  }

  generateModel(event: GenerateModelEvent) {
    return new FileModel(event.initialConfig);
  }

  generateReactWidget({ model }): JSX.Element {
    return (
      <File model={model}>
        <PortWidget
          engine={this.engine}
          port={model.getPort("in")}
        ></PortWidget>
        <FileBody />
        <PortWidget
          engine={this.engine}
          port={model.getPort("out")}
        ></PortWidget>
      </File>
    );
  }
}
