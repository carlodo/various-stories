import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export const themeDecorator = (storyFn: () => React.ReactNode) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);
