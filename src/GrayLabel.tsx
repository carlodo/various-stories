import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Label = styled.div`
  pointer-events: all;
  font-size: 0.9em;
  padding: 2px;
  max-width: 140px;
  font-family: sans-serif;
  background-color: ${({ theme }) => theme.global.colors.transparentGray};
  color: white;
  margin-top: 5px;
`;

export const GrayLabel = ({ children }: Props) => <Label>{children}</Label>;
