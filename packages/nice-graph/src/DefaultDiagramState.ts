import { SelectingState, State } from "@projectstorm/react-canvas-core";

export class DefaultDiagramState extends State {
  constructor() {
    super({
      name: "default"
    });
    this.childStates = [new SelectingState()];
  }
}
