import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface GatewayNodeModelOptions extends BaseModelOptions {
  color?: string;
  name: string;
}

export class GatewayNodeModel extends NodeModel {
  color: string;
  name: string;

  constructor(options: GatewayNodeModelOptions) {
    super({
      ...options,
      type: "gateway-node"
    });
    this.name = options.name;
    this.color = options.color || "yellow";
    this.width = 100;
    this.height = 100;

    this.addPort(
      new DefaultPortModel({
        id: this.name + "1",
        in: true,
        name: "in"
      })
    );
    this.addPort(
      new DefaultPortModel({
        id: this.name + "2",
        in: false,
        name: "out1"
      })
    );
    this.addPort(
      new DefaultPortModel({
        id: this.name + "3",
        in: false,
        name: "out2"
      })
    );
    this.addPort(
      new DefaultPortModel({
        id: this.name + "4",
        in: false,
        name: "out3"
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

  deserialize(Gateway: any): void {
    super.deserialize(Gateway);
    this.color = Gateway.data.color;
    this.name = Gateway.data.name;
  }
}
