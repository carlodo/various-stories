import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";

export interface Model {
  name: string;
}

export interface FolderProps {
  model: Model;
  children?: React.ReactNode;
}

export interface FolderPortProps {}

const Port = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.global.colors.lightGray};
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.global.colors.redOrange};
  }
`;

const Container = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FolderPort = (_props: FolderPortProps) => <Port />;

export const Folder = ({ model, children }: FolderProps) => (
  <Container>
    <svg width={40} height={25}>
      <rect
        id="svg_1"
        height={25}
        width={40}
        strokeWidth="5"
        stroke="#000000"
        fill="#aad4ff"
      />
    </svg>
    <NodeLabel>{model.name}</NodeLabel>
  </Container>
);
