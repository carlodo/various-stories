import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";

export interface Model {
  name: string;
  color: string;
  isSelected: () => boolean;
}

export interface FolderProps {
  model: Model;
  children: React.ReactNode;
}

export interface FolderPortProps {}

const Body = styled.div<{ color: string; selected: boolean }>`
  border: solid 2px
    ${({ selected, theme }) =>
      selected ? theme.global.colors.redOrange : theme.global.colors.gray};
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
  position: relative;
  pointer-events: none;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Trap = styled.div`
  position: relative;
  right: 27px;
  top: -113px;
  height: 0;
  width: 14px;
  border-bottom: 12px solid ${({ theme }) => theme.global.colors.folderBack};
  border-left: 0px solid transparent;
  border-right: 12px solid transparent;
`;

const TrapBorder = styled.div`
  position: relative;
  right: 27px;
  top: -101px;
  height: 0;
  width: 16px;
  border-bottom: 14px solid ${({ theme }) => theme.global.colors.gray};
  border-left: 0px solid transparent;
  border-right: 14px solid transparent;
`;

export const FolderPort = (_props: FolderPortProps) => <Port />;

export const Folder = ({ model, children }: FolderProps) => (
  <Container>
    <Body color={model.color} selected={model.isSelected()}>
      {children}
    </Body>
    <NodeLabel>{model.name}</NodeLabel>
    <TrapBorder />
    <Trap />
  </Container>
);
