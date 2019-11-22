import React, { ReactNode } from "react";
import styled from "styled-components";

export interface WindowProps {
  title: string;
  children: ReactNode;
}

interface CloseProps {
  onClick: () => void;
}

const Container = styled.div`
  pointer-events: all;
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.global.colors.white};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.global.colors.gray};
  width: 300px;
  cursor: default;
`;

const MainBar = styled.div`
  background-color: ${({ theme }) => theme.global.colors.black};
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const X1 = styled.div`
  margin-top: 2px;
  width: 15px;
`;

const X2 = styled.div`
  height: 13px;
  width: 2px;
  background-color: ${({ theme }) => theme.global.colors.lightGray};
  transform: rotate(45deg);
  z-index: 1;
`;

const X3 = styled.div`
  height: 13px;
  width: 2px;
  background-color: ${({ theme }) => theme.global.colors.lightGray};
  transform: rotate(90deg);
  z-index: 2;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.global.colors.white};
  font-weight: bold;
`;

const Content = styled.div`
  padding: 5px;
`;

const Close: React.SFC<CloseProps> = ({ onClick }) => (
  <X1 onClick={onClick}>
    <X2>
      <X3 />
    </X2>
  </X1>
);

export const Window: React.SFC<WindowProps> = ({ title, children }) => (
  <Container>
    <MainBar>
      <Title>{title}</Title>
      <Close
        onClick={() => {
          console.log("close click");
        }}
      />
    </MainBar>
    <Content>{children}</Content>
  </Container>
);
