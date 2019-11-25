import React, { useState, useEffect } from "react";
import styled from "styled-components";

export interface Props {}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  background-color: gray;
  min-width: 300px;
  height: 100vh;
  border-radius: 5px;
  font-family: "Anonymous Pro", monospace;
`;

const Text = styled.p`
  background-color: gray;
  color: white;
  font-size: 18px;
  max-width: 90%;
`;

const Caret = styled.div`
    height: 18px
    width: 12px;
    margin-bottom: -5px;
    background-color: white;
    display: inline-block;
`;

const Input = styled.div`
  display: flex;
  align-items: end;
`;

const Dollar = styled.p`
  font-size: 18px;
  color: #abfd98;
  padding: 0 5px;
`;

export const Terminal = ({}: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const allHandler = (e: KeyboardEvent) => {
      if (e.code === "Backspace")
        e.metaKey ? setValue("") : setValue(val => val.slice(0, -1));
    };
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        console.log(value);
        setValue("");
      } else {
        setValue(val => val + String.fromCharCode(e.charCode));
      }
    };
    window.addEventListener("keypress", handler, false);
    window.addEventListener("keydown", allHandler, false);
    return () => {
      window.removeEventListener("keypress", handler);
      window.removeEventListener("keydown", allHandler);
    };
  }, [value]); // TODO: remove this dependency

  return (
    <Container>
      <Input>
        <Dollar>$</Dollar>
        <Text>
          {value}
          <Caret />
        </Text>
      </Input>
    </Container>
  );
};
