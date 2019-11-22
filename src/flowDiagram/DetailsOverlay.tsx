import React from "react";
import { Tools } from "./Tools";
import styled from "styled-components";

export interface Props {}

const Overlay = styled.div`
  padding: 20px 20px;
  position: absolute;
  display: flex;
  top: 0px;
  width: calc(100% - 40px);
  justify-content: space-between;
  pointer-events: none;
`;

export const DetailsOverlay: React.FC<Props> = () => (
  <Overlay>
    <Tools />
  </Overlay>
);
