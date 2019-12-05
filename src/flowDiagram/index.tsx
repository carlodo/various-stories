import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { ActivityNodeModel } from "./Nodes/Activity/ActivityNodeModel";
import { EventNodeModel } from "./Nodes/Event/EventNodeModel";
import { GatewayNodeModel } from "./Nodes/Gateway/GatewayNodeModel";
import { DetailsOverlay } from "./DetailsOverlay";
import { initEngine } from "./initEngine";

const engine = initEngine();

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    width: 100%;
    height: 100vh;
    font-style: sans-serif;
  }

  .diagram {
    cursor: grab !important;
    width: 100%;
    height: 100%;
    background-color: white;
    background-size: 60px 60px, 60px 60px, 15px 15px, 15px 15px;
    background-position: -1px -1px, -1px -1px, -1px -1px, -1px -1px;
    background-image: -webkit-linear-gradient(
        rgb(200, 200, 200) 1px,
        transparent 1px
      ),
      -webkit-linear-gradient(0, rgb(200, 200, 200) 1px, transparent 1px),
      -webkit-linear-gradient(rgb(230, 230, 230) 1px, transparent 1px),
      -webkit-linear-gradient(0, rgb(230, 230, 230) 1px, transparent 1px);
  }
`;

export const Diagram: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container
        onDrop={event => {
          var data = JSON.parse(
            event.dataTransfer.getData("storm-diagram-node")
          );

          var node = null;
          if (data.type === "in") {
            node = new ActivityNodeModel({
              name: "Node 2",
              color: theme.global.colors.green
            });
          } else if (data.type === "event") {
            node = new EventNodeModel({ name: "Event 2" });
          } else if (data.type === "gateway") {
            node = new GatewayNodeModel({
              name: "Gateway",
              color: theme.global.colors.purple
            });
          } else {
            node = new DefaultNodeModel("Node 3", theme.global.colors.blue);
            node.addOutPort("Out");
          }
          var points = engine.getRelativeMousePoint(event);
          node.setPosition(points.x - 30, points.y - 30);
          engine.getModel().addNode(node);
          engine.repaintCanvas();
        }}
        onDragOver={event => event.preventDefault()}
      >
        <DetailsOverlay />
        <CanvasWidget engine={engine} className="diagram" />
      </Container>
    </>
  );
};
