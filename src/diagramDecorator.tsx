import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 90vh;
`;

export const diagramDecorator = (storyFn: () => React.ReactNode) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{storyFn()}</Wrapper>
  </ThemeProvider>
);
