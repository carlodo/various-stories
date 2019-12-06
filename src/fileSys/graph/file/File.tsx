import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";
import { theme } from "../../../theme";

export interface Model {
  name: string;
}

export interface Props {
  model: Model;
  children?: React.ReactNode;
}

const Container = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LabelWrap = styled.div`
  position: relative;
  margin-top: 5px;
  font-size: 0.8em;
`;

export const FileBody = () => (
  <svg height={40} width={30}>
    <path
      id="svg_2"
      d="M 0 0 L 0 40 L 30 40 L 30 10 L 20 10 L 20 0 Z"
      strokeWidth={1}
      stroke="#222"
      fill={theme.global.colors.orange}
    />
    <path
      id="svg_2"
      d="M 20 0 L 20 10 L 30 10 Z"
      strokeWidth={0.33}
      stroke="#222"
      fill={theme.global.colors.orange}
    />
  </svg>
);

export const File = ({ children, model }: Props) => (
  <Container>
    {children}
    <LabelWrap>
      <NodeLabel>{model.name}</NodeLabel>
    </LabelWrap>
  </Container>
);
