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

const Body = styled.div`
  border: solid 2px ${({ theme }) => theme.global.colors.gray};
  border-radius: 0px 5px 5px 5px;
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${({ theme }) => theme.global.colors.folder};
  pointer-events: all;
  cursor: crosshair;
`;

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

const Trap = styled.div`
  position: relative;
  right: 27px;
  top: -112px;
  height: 0;
  width: 14px;
  border-bottom: 12px solid ${({ theme }) => theme.global.colors.folderBack};
  border-left: 0px solid transparent;
  border-right: 12px solid transparent;
`;

const TrapBorder = styled.div`
  position: relative;
  right: 27px;
  top: -100px;
  height: 0;
  width: 16px;
  border-bottom: 14px solid ${({ theme }) => theme.global.colors.gray};
  border-left: 0px solid transparent;
  border-right: 14px solid transparent;
`;

export const FolderPort = (_props: FolderPortProps) => <Port />;

export const Folder = ({ model, children }: FolderProps) => (
  <Container>
    <svg width="90" height="60">
      <rect
        id="svg_1"
        height="60"
        width="90"
        stroke-width="5"
        stroke="#000000"
        fill="#aad4ff"
      />
    </svg>
    <NodeLabel>{model.name}</NodeLabel>
  </Container>
);
