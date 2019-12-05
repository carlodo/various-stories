import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";
import { FolderModelOptions } from "./FolderModel";

export interface FolderProps {
  model: FolderModelOptions;
  children?: React.ReactNode;
}

export interface FolderPortProps {}

const Container = styled.div`
  position: relative;
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

export const FolderBody = () => (
  <svg width={40} height={25}>
    <rect
      id="svg_1"
      height={25}
      width={40}
      strokeWidth={2}
      stroke="#000000"
      fill="#aad4ff"
    />
  </svg>
);

export const Folder = ({ model, children }: FolderProps) => (
  <Container>
    {children}
    <LabelWrap>
      <NodeLabel>{`${model.name}${model.isPWD && "*"}`}</NodeLabel>
    </LabelWrap>
  </Container>
);
