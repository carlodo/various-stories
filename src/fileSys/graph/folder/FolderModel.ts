import {
  NodeModel,
  DefaultPortModel,
  LinkModel,
  DefaultLinkModel
} from "@projectstorm/react-diagrams";
import {
  BaseModelOptions,
  AbstractModelFactory
} from "@projectstorm/react-canvas-core";

export interface FolderModelOptions extends BaseModelOptions {
  name: string;
  isPWD?: boolean;
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
  isPWD: boolean;

  constructor(options: FolderModelOptions) {
    super({
      ...options,
      type: "folder-node"
    });
    this.name = options.name;
    this.isPWD = options.isPWD;
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

  setPwd(isPWD: boolean) {
    this.isPWD = isPWD;
  }

  serialize() {
    return {
      ...super.serialize(),
      name: this.name,
      isPwd: this.isPWD
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.name = event.data.name;
    this.isPWD = event.data.isPWD;
  }
}
