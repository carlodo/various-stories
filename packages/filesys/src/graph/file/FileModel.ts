import {
  BaseModelOptions,
  NodeModel,
  DefaultPortModel
} from "@sljk/nice-graph";

export interface FileModelOptions extends BaseModelOptions {
  name: string;
}

export class FileModel extends NodeModel {
  name: string;

  constructor(options: FileModelOptions) {
    super({ ...options, type: "file-node" });
    this.name = options.name;
    this.width = 25;
    this.height = 40;

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

  // TODO: fix this
  serialize(): any {
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
