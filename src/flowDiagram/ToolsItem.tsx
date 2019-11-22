import * as React from "react";
import styled from "styled-components";

export interface TrayItemWidgetProps {
  model: any;
  color?: string;
  name: string;
}

const StyledLi = styled.li<{ color?: string }>`
  pointer-events: all;
  margin-bottom: 5px;
  border: 2px solid ${({ color, theme }) => color || theme.global.colors.green};
  text-align: center;
  list-style: none;
  background-color: ${({ theme }) => theme.global.colors.white};
  width: 60px;
  height: 60px;
  border-radius: 5px;
  cursor: grab;
  :active {
    cursor: grabbing;
  }
`;

export const ToolItem: React.FC<TrayItemWidgetProps> = props => (
  <StyledLi
    color={props.color}
    draggable
    onDragStart={event => {
      event.dataTransfer.setData(
        "storm-diagram-node",
        JSON.stringify(props.model)
      );
    }}
  >
    {props.name}
  </StyledLi>
);
