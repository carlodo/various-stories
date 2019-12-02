import * as React from "react";
import * as _ from "lodash";
import { LinkWidget } from "./LinkWidget";
import { DiagramEngine, LinkLayerModel } from "@projectstorm/react-diagrams";

export interface LinkLayerWidgetProps {
  layer: LinkLayerModel;
  engine: DiagramEngine;
}

export class LinkLayerWidget extends React.Component<LinkLayerWidgetProps> {
  render() {
    return (
      <>
        {//only perform these actions when we have a diagram
        _.map(this.props.layer.getLinks(), link => {
          return (
            <LinkWidget
              key={link.getID()}
              link={link}
              diagramEngine={this.props.engine}
            />
          );
        })}
      </>
    );
  }
}
