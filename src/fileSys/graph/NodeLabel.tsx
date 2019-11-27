import React from "react";
import styled from "styled-components";
import { GrayLabel } from "../../GrayLabel";

type Props = {
  children: React.ReactNode;
};

const CrosshairLabel = styled.div`
  pointer-events: all;
  font-size: 0.9em;
  cursor: crosshair;
`;

export const NodeLabel = ({ children }: Props) => (
  <CrosshairLabel>
    <GrayLabel>{children}</GrayLabel>
  </CrosshairLabel>
);
