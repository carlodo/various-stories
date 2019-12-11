import * as React from "react";
import { NewLinkWidget } from "./NewLinkWidget";
import styled from "@emotion/styled";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DefaultLinkModel } from "@projectstorm/react-diagrams";

export const Path = styled.path`
  fill: none;
  pointer-events: all;
`;

export class NewLinkFactory<
  Link extends DefaultLinkModel = DefaultLinkModel
> extends AbstractReactFactory<Link, DiagramEngine> {
  constructor(type = "default") {
    super(type);
  }

  generateReactWidget(event: any): JSX.Element {
    return <NewLinkWidget link={event.model} diagramEngine={this.engine} />;
  }

  generateModel(event: any): Link {
    return new DefaultLinkModel() as Link;
  }

  generateLinkSegment(model: Link, selected: boolean, path: string) {
    return (
      <Path
        selected={selected}
        stroke={model.getOptions().color}
        strokeWidth={model.getOptions().width}
        d={path}
      />
    );
  }
}
