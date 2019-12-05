import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";

export interface Model {
  name: string;
  isSelected: () => boolean;
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
  <svg width={25} height={40}>
    <rect
      id="svg_2"
      height={40}
      width={25}
      strokeWidth={2}
      stroke="#000000"
      fill="#ecf5b9"
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
