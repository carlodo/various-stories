import {
  Action,
  ActionEvent,
  InputType,
  State
} from "@projectstorm/react-canvas-core";
import {
  PortModel,
  LinkModel,
  DiagramEngine,
  PointModel
} from "@projectstorm/react-diagrams-core";
import { MouseEvent, KeyboardEvent } from "react";
import { Point } from "@projectstorm/geometry";

/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<DiagramEngine> {
  sourcePort?: PortModel;
  link?: LinkModel;

  constructor() {
    super({ name: "create-new-link" });

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        // @ts-ignore
        fire: (actionEvent: ActionEvent<MouseEvent>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(actionEvent);
          const {
            event: { clientX, clientY }
          } = actionEvent;
          const ox = this.engine.getModel().getOffsetX();
          const oy = this.engine.getModel().getOffsetY();

          if (element instanceof PortModel && !this.sourcePort) {
            this.sourcePort = element;

            /* would be cool if link creating could be done somewhat like
                        const link = createLink({
                            sourcePort: this.sourcePort,
                            points: [{ x: clientX, y: clientY }, { x: clientX, y: clientY }]
                        })
                        */
            const link = this.sourcePort.createLinkModel();
            if (!link) return;
            link.setSourcePort(this.sourcePort);
            link.getFirstPoint().setPosition(clientX - ox, clientY - oy);
            link
              .getLastPoint()
              .setPosition(clientX - ox + 20, clientY - oy + 20);

            this.link = this.engine.getModel().addLink(link);
          } else if (
            element instanceof PortModel &&
            this.sourcePort &&
            this.link &&
            element !== this.sourcePort &&
            this.sourcePort.canLinkToPort(element)
          ) {
            this.link.setTargetPort(element);
            element.reportPosition();
            this.clearState();
            this.eject();
          } else if (this.link && element === this.link.getLastPoint()) {
            this.link.addPoint(
              new PointModel({
                link: this.link,
                position: new Point(clientX - ox, clientY - oy)
              }),
              -1
            );
            // this.link.addPoint(clientX - ox, clientY - oy, -1);
          }

          this.engine.repaintCanvas();
        }
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_MOVE,
        // @ts-ignore
        fire: (actionEvent: ActionEvent<React.MouseEvent>) => {
          if (!this.link) return;
          const { event } = actionEvent;
          this.link.getLastPoint().setPosition(event.clientX, event.clientY);
          this.engine.repaintCanvas();
        }
      })
    );

    this.registerAction(
      new Action({
        type: InputType.KEY_UP,
        // @ts-ignore
        fire: (actionEvent: ActionEvent<KeyboardEvent>) => {
          // on esc press remove any started link and pop back to default state
          if (this.link && actionEvent.event.keyCode === 27) {
            this.link.remove();
            this.clearState();
            this.eject();
            this.engine.repaintCanvas();
          }
        }
      })
    );
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }
}
