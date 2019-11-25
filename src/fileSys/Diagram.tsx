import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { initFileDiagramEngine } from "./initFileDiagramEngine";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { Terminal } from "./Terminal";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    width: 100vw;
    height: 100vh;
    font-style: sans-serif;
  }
`;

const Container = styled.div`
  padding: 20px;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: orange;

  > .diagram {
    flex: 4;
    height: 100vh;
  }
`;

const engine = initFileDiagramEngine();

export const Diagram: React.FC = () => (
  <Container>
    <GlobalStyle />
    <Terminal />
    <CanvasWidget engine={engine} className="diagram" />
  </Container>
);
