import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { NodeModel, DiagramEngine } from "@projectstorm/react-diagrams";

const Node = styled.div`
  position: absolute;
  pointer-events: all;
`;

export interface NodeProps {
  node: NodeModel;
  diagramEngine: DiagramEngine;
}

const trans = (x: number, y: number) => `translate3d(${x}px,${y}px,0)`;

export const ActualNode = ({ node, diagramEngine }: NodeProps) => {
  const { xy } = useSpring({
    xy: [node.getX(), node.getY()]
  });

  return (
    <animated.div
      key={node.getID()}
      className="animatedNode"
      style={{
        // @ts-ignore
        transform: xy.interpolate(trans)
      }}
    >
      <Node className="node" data-nodeid={node.getID()}>
        {diagramEngine.generateWidgetForNode(node)}
      </Node>
    </animated.div>
  );
};
