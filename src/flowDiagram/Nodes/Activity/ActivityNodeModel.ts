import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface ActivityNodeModelOptions extends BaseModelOptions {
  color?: string;
  name: string;
}

export class ActivityNodeModel extends NodeModel {
  color: string;
  name: string;

  constructor(options: ActivityNodeModelOptions) {
    super({
      ...options,
      type: "activity-node"
    });
    this.name = options.name;
    this.color = options.color || "red";
    this.width = 100;
    this.height = 100;

    this.addPort(
      new DefaultPortModel({
        id: this.name + "123",
        in: true,
        name: "in"
      })
    );
    this.addPort(
      new DefaultPortModel({
        id: this.name + "234",
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
      color: this.color,
      name: this.name
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.color = event.data.color;
    this.name = event.data.name;
  }
}
