import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";

export interface Model {
  color: string;
  name: string;
  isSelected: () => boolean;
}

export interface ActivityNodeProps {
  model: Model;
  children: React.ReactNode;
}

export interface ActivityNodePortProps {}

const Body = styled.div<{ color: string; selected: boolean }>`
  border: solid 2px
    ${({ selected, theme }) =>
      selected ? theme.global.colors.redOrange : theme.global.colors.gray};
  border-radius: 5px;
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${({ theme }) => theme.global.colors.greenTransparent};
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

export const ActivityNodePort = (_props: ActivityNodePortProps) => <Port />;

export const ActivityNode = ({ model, children }: ActivityNodeProps) => (
  <Container>
    <Body color={model.color} selected={model.isSelected()}>
      {children}
    </Body>
    <NodeLabel>{model.name}</NodeLabel>
  </Container>
);
