import * as React from "react";
import {
  AbstractReactFactory,
  GenerateModelEvent,
  GenerateWidgetEvent
} from "@projectstorm/react-canvas-core";
import { LinkLayerWidget } from "./LinkLayerWidget";
import { DiagramEngine, LinkLayerModel } from "@projectstorm/react-diagrams";

export class LinkLayerFactory extends AbstractReactFactory<
  LinkLayerModel,
  DiagramEngine
> {
  constructor() {
    super("diagram-links");
  }

  generateModel(event: GenerateModelEvent): LinkLayerModel {
    return new LinkLayerModel();
  }

  generateReactWidget(event: GenerateWidgetEvent<LinkLayerModel>): JSX.Element {
    return <LinkLayerWidget layer={event.model} engine={this.engine} />;
  }
}
