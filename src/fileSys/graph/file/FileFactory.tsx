import * as React from "react";
import { FileModel } from "./FileModel";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { File, FileBody } from "./File";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";

export class FileFactory extends AbstractReactFactory<
  FileModel,
  DiagramEngine
> {
  constructor() {
    super("file-node");
  }

  generateModel(event: any) {
    return new FileModel({ name: event.name });
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
