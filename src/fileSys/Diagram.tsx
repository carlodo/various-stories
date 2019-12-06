import React, { useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { initFileDiagramEngine } from "./initFileDiagramEngine";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { Terminal } from "./Terminal";
import { makeLearnCliBundle } from "./filesystemCLI";
import { layoutGraph } from "../commandMe/layout";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    font-style: sans-serif;
  }
`;

const Container = styled.div`
  padding: 20px 0 20px 20px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.global.colors.blueDeep};
`;

const DiagramWidget = styled(CanvasWidget)`
  flex: 4;
  height: auto;

  /* override react-diagram defaults */
  overflow: scroll !important;
  cursor: default !important;
`;

const TerminalContainer = styled.div`
  flex: 1;
  height: 100%;
  min-width: 300px;
`;

const engine = initFileDiagramEngine();
const tutorial = makeLearnCliBundle();
tutorial.initialize(engine);
layoutGraph(engine);

export const Diagram: React.FC = () => {
  const execute = useCallback((command: string) => {
    tutorial.execute(command, engine);
    layoutGraph(engine);
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <TerminalContainer>
        <Terminal execute={execute} />
      </TerminalContainer>
      <DiagramWidget engine={engine} className="diagram" />
    </Container>
  );
};
