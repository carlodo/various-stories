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

const PortIn = styled.div`
  position: relative;
  top: -22px;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.global.colors.folder};
  cursor: pointer;
`;

const PortOut = styled(PortIn)`
  top: -27px;
`;

const Container = styled.div`
  position: relative;
  pointer-events: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LabelWrap = styled.div`
  position: relative;
  top: -20px;
`;

export const FolderPortIn = (_props: FolderPortProps) => <PortIn />;
export const FolderPortOut = (_props: FolderPortProps) => <PortOut />;

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
    {children}
    <LabelWrap>
      <NodeLabel>{model.name}</NodeLabel>
    </LabelWrap>
  </Container>
);
