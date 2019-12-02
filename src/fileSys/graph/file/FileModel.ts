import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface FileModelOptions extends BaseModelOptions {
  name: string;
}

export class FileModel extends NodeModel {
  name: string;

  constructor(options: FileModelOptions) {
    super({ ...options, type: "event-node" });
    this.name = options.name;
    this.width = 60;
    this.height = 80;

    this.addPort(
      new DefaultPortModel({
        id: this.getID() + "in",
        in: true,
        out: false,
        name: "in"
      })
    );
    this.addPort(
      new DefaultPortModel({
        id: this.getID() + "out",
        in: false,
        out: true,
        name: "out"
      })
    );
  }

  setName(name: string) {
    this.name = name;
  }

  serialize() {
    return {
      ...super.serialize(),
      name: this.name
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.name = event.data.name;
  }
}
