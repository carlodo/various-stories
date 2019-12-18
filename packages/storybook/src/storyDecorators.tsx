import React from "react";
import { theme as filesysTheme } from "@sljk/filesys";
import styled, { ThemeProvider } from "styled-components";

const DiagramWrapper = styled.div`
  height: 90vh;
`;

export const themeDecorator = (theme: object) => (
  storyFn: () => React.ReactNode
) => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;

export const diagramDecorator = (storyFn: () => React.ReactNode) =>
  themeDecorator(filesysTheme)(() => (
    <DiagramWrapper>{storyFn()}</DiagramWrapper>
  ));
