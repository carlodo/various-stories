import React, { useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { layoutGraph } from "../cliTutorialPlatform/layout";
import { TerminalContainer } from "./TerminalContainer";
import { TerminalEngine, CLIBundle } from "./types";
import { createEngine } from "./createEngine";

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
  overflow: scroll;
`;

const DiagramWidget = styled(CanvasWidget)`
  flex: 4;
  height: auto;

  /* override react-diagram defaults */
  overflow: visible !important;
  cursor: default !important;
`;

const TerminalWrapper = styled.div`
  flex: 1;
  height: 100%;
  min-width: 300px;
  position: sticky;
  left: 0;
  z-index: 1;
`;

type Props = {
  cliBundle: CLIBundle;
};

export const Diagram: React.FC<Props> = ({ cliBundle }) => {
  const engine = createEngine();

  const execute = useCallback(
    (command: string, terminalEngine: TerminalEngine) => {
      cliBundle.execute(command, engine, terminalEngine);
      layoutGraph(engine);
    },
    [engine]
  );

  const initializeTerminal = useCallback(
    (terminalEngine: TerminalEngine) => {
      cliBundle.initialize(engine, terminalEngine);
      layoutGraph(engine);
    },
    [engine]
  );

  return (
    <Container>
      <GlobalStyle />
      <TerminalWrapper>
        <TerminalContainer
          execute={execute}
          initializeTerminal={initializeTerminal}
        />
      </TerminalWrapper>
      <DiagramWidget engine={engine} className="diagram" />
    </Container>
  );
};
