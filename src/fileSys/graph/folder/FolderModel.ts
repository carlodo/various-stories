import {
  NodeModel,
  DefaultPortModel,
  LinkModel,
  DefaultLinkModel
} from "@projectstorm/react-diagrams";
import {
  BaseModelOptions,
  AbstractModelFactory,
  BasePositionModel
} from "@projectstorm/react-canvas-core";
import { Point } from "@projectstorm/geometry";

export interface ModelOptions extends BaseModelOptions {
  name: string;
}

// When new link is created by clicking on port the RightAngleLinkModel needs to be returned.
export class StraightLinkPortModel extends DefaultPortModel {
  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new DefaultLinkModel({
      curvyness: 0
    });
  }
}

export class FolderModel extends NodeModel {
  name: string;

  constructor(options: ModelOptions) {
    super({
      ...options,
      type: "activity-node"
    });
    this.name = options.name;
    this.width = 40;
    this.height = 25;

    this.addPort(
      new StraightLinkPortModel({
        id: this.getID() + "in",
        in: true,
        out: false,
        name: "in"
      })
    );
    this.addPort(
      new StraightLinkPortModel({
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
