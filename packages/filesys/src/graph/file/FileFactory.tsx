import * as React from "react";
import { FileModel } from "./FileModel";
import {
  DiagramEngine,
  PortWidget,
  AbstractReactFactory
} from "@sljk/nice-graph";
import { File, FileBody } from "./File";

export class FileFactory extends AbstractReactFactory<
  FileModel,
  DiagramEngine
> {
  constructor() {
    super("file-node");
  }

  generateModel(event: any) {
    return new FileModel(event.initialConfig);
  }

  generateReactWidget({ model }: any): JSX.Element {
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
