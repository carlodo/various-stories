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

const Body = styled.div<{ color: string; selected: boolean }>`
  border: solid 2px
    ${({ selected, theme }) =>
      selected ? theme.global.colors.redOrange : theme.global.colors.gray};
  border-radius: 5px;
  width: 60px;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  align-content: space-between;
  background-color: ${({ theme }) => theme.global.colors.purpleTransparent};
  pointer-events: all;
  cursor: crosshair;
  transform: rotate(45deg);
  margin-bottom: 10px;
`;

const Port = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
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

export const FlexBasis = styled.div`
  flex-basis: 100%;
`;

export const Spacer = () => <FlexBasis />;

export const GatewayPort = () => <Port />;

export const GatewayNode = ({ children, model }: Props) => (
  <Container>
    <Body color={model.color} selected={model.isSelected()}>
      {children}
    </Body>
    <NodeLabel>{model.name}</NodeLabel>
  </Container>
);
