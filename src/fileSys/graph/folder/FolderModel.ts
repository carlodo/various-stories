import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface ModelOptions extends BaseModelOptions {
  name: string;
}

export class FolderModel extends NodeModel {
  name: string;

  constructor(options: ModelOptions) {
    super({
      ...options,
      type: "activity-node"
    });
    this.name = options.name;
    this.width = 100;
    this.height = 100;

    this.addPort(
      new DefaultPortModel({
        id: this.getID() + "in",
        in: true,
        name: "in"
      })
    );
    this.addPort(
      new DefaultPortModel({
        id: this.getID() + "out",
        in: false,
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
