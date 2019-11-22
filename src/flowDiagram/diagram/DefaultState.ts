import { MouseEvent } from "react";
import {
  SelectingState,
  State,
  Action,
  InputType,
  ActionEvent,
  DragCanvasState
} from "@projectstorm/react-canvas-core";
import {
  PortModel,
  DiagramEngine,
  DragDiagramItemsState
} from "@projectstorm/react-diagrams-core";
import { CreateLinkState } from "./CreateLinkState";

export class DefaultState extends State<DiagramEngine> {
  constructor() {
    super({ name: "starting-state" });
    this.childStates = [new SelectingState()];

    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        // @ts-ignore
        fire: (event: ActionEvent<MouseEvent>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          // the canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.transitionWithEvent(new DragCanvasState(), event);
          }
          // initiate dragging a new link
          else if (element instanceof PortModel) {
            return;
          }
          // move the items (and potentially link points)
          else {
            this.transitionWithEvent(new DragDiagramItemsState(), event);
          }
        }
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        // @ts-ignore
        fire: (event: ActionEvent<MouseEvent>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          if (element instanceof PortModel)
            this.transitionWithEvent(new CreateLinkState(), event);
        }
      })
    );
  }
}
