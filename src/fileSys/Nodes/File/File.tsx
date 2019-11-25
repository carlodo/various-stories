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

const Body = styled.div<{ selected: boolean }>`
  border: solid 2px
    ${({ selected, theme }) =>
      selected ? theme.global.colors.redOrange : theme.global.colors.gray};
  border-top: none;
  border-radius: 0px 0px 5px 5px;
  width: 40px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${({ theme }) => theme.global.colors.file};
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

const Trap = styled.div`
  position: relative;
  right: 0px;
  top: -98px;
  width: 28px;
  border-radius: 5px 0px 0px 0px;
  border-bottom: 12px solid ${({ theme }) => theme.global.colors.file};
  border-left: 0px solid transparent;
  border-right: 12px solid transparent;
`;

const TrapBorder = styled.div`
  position: relative;
  right: 0px;
  top: -86px;
  width: 30px;
  border-radius: 5px 0px 0px 0px;
  border-bottom: 14px solid ${({ theme }) => theme.global.colors.gray};
  border-left: 0px solid transparent;
  border-right: 14px solid transparent;
`;

const TrapEar = styled.div`
  position: relative;
  right: -14px;
  top: -124px;
  width: 0px;
  border-bottom: 12px solid ${({ theme }) => theme.global.colors.fileBack};
  border-left: 0px solid transparent;
  border-right: 12px solid transparent;
`;

const TrapEarBorder = styled.div`
  position: relative;
  right: -14px;
  top: -111px;
  width: 0px;
  border-bottom: 14px solid ${({ theme }) => theme.global.colors.gray};
  border-left: 0px solid transparent;
  border-right: 14px solid transparent;
`;

export const FilePort = () => <Port />;

export const File = ({ children, model }: Props) => (
  <Container>
    <svg width="60" height="80">
      <rect
        id="svg_1"
        height="80"
        width="60"
        stroke-width="5"
        stroke="#000000"
        fill="#ffffaa"
      />
    </svg>
    <NodeLabel>{model.name}</NodeLabel>
  </Container>
);
