import React from "react";
import styled from "styled-components";
import { NodeLabel } from "../NodeLabel";

export interface Model {
  name: string;
  color: string;
  isSelected: () => boolean;
}

export interface Props {
  model: Model;
  children: React.ReactNode;
}

export interface EventNodeWidgetState {}

const Body = styled.div<{ color: string; selected: boolean }>`
  border: solid 2px
    ${({ selected, theme }) =>
      selected ? theme.global.colors.redOrange : theme.global.colors.gray};
  border-radius: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${({ theme }) => theme.global.colors.yellowTransparent};
  pointer-events: all;
  cursor: crosshair;
`;

const Port = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 4px;
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

export const EventNodePort = () => <Port />;

export const EventNode = ({ children, model }: Props) => (
  <Container>
    <Body color={model.color} selected={model.isSelected()}>
      {children}
    </Body>
    <NodeLabel>{model.name}</NodeLabel>
  </Container>
);
