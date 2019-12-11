import React from "react";
import { storiesOf } from "@storybook/react";
import { theme, FileDiagram } from "@sljk/filesys";
import styled, { ThemeProvider } from "styled-components";

const Wrapper = styled.div`
  height: 90vh;
`;

const diagramDecorator = (storyFn: () => React.ReactNode) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{storyFn()}</Wrapper>
  </ThemeProvider>
);

storiesOf("Diagrams", module)
  .addParameters({ options: { enableShortcuts: false } })
  .addDecorator(diagramDecorator)
  .add("File sysytem diagram", () => <FileDiagram />);
