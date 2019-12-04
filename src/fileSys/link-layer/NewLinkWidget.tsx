import * as React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DefaultLinkModel } from "@projectstorm/react-diagrams";
import { Spring, animated } from "react-spring/renderprops";

export interface DefaultLinkProps {
  link: DefaultLinkModel;
  diagramEngine: DiagramEngine;
}

export const NewLinkWidget = ({ link }: DefaultLinkProps) => {
  const [point1, point2] = link.getPoints();

  return (
    <Spring
      to={{
        x1: point1.getX(),
        x2: point2.getX(),
        y1: point1.getY(),
        y2: point2.getY()
      }}
    >
      {props => (
        <animated.line
          x1={props.x1}
          y1={props.y1}
          x2={props.x2}
          y2={props.y2}
          style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
        />
      )}
    </Spring>
  );
};
