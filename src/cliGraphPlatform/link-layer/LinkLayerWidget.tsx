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
        {_.map(this.props.layer.getLinks(), link => {
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
