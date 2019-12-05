import * as React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DefaultLinkModel } from "@projectstorm/react-diagrams";
import { Spring, animated } from "react-spring/renderprops";
import { theme } from "../../theme";

export interface DefaultLinkProps {
  link: DefaultLinkModel;
  diagramEngine: DiagramEngine;
}

export const NewLinkWidget = ({ link }: DefaultLinkProps) => {
  const [point1, point2] = link.getPoints();

  const initialPoint = `M ${point1.getX()} ${point1.getY()} L ${point1.getX()} ${point1.getY()}`;
  const newPath = `M ${point1.getX()} ${point1.getY()} L ${point2.getX()} ${point2.getY()}`;

  return (
    <Spring native from={{ d: initialPoint }} to={{ d: newPath }}>
      {props => (
        <animated.path
          {...props}
          stroke={theme.global.colors.gray}
          strokeWidth={2}
        />
      )}
    </Spring>
  );
};
