import React, { useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { initFileDiagramEngine } from "./initFileDiagramEngine";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { Terminal } from "./Terminal";
import { makeLearnCliBundle } from "./filesystemCLI";

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

const TerminalContainer = styled.div`
  flex: 1;
  height: 100vh;
  min-width: 300px;
`;

const engine = initFileDiagramEngine();
const tutorial = makeLearnCliBundle();
tutorial.initialize(engine);

export const Diagram: React.FC = () => {
  const execute = useCallback(
    (command: string) => tutorial.execute(command, engine),
    []
  );

  return (
    <Container>
      <GlobalStyle />
      <TerminalContainer>
        <Terminal execute={execute} />
      </TerminalContainer>
      <CanvasWidget engine={engine} className="diagram" />
    </Container>
  );
};
