import * as React from "react";
import { LinkWidget } from "./LinkWidget";
import { DiagramEngine, LinkLayerModel } from "@projectstorm/react-diagrams";

export interface LinkLayerWidgetProps {
  layer: LinkLayerModel;
  engine: DiagramEngine;
}

export class LinkLayerWidget extends React.Component<LinkLayerWidgetProps> {
  render() {
    const links = this.props.layer.getLinks();
    return (
      <>
        {Object.keys(links).map(key => {
          const link = links[key];

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
