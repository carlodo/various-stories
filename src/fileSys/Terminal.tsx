import React, { useState, useEffect } from "react";
import styled from "styled-components";

export interface Props {
  execute: (command: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: gray;
  height: inherit;
  border-radius: 5px;
  font-family: "Anonymous Pro", monospace;
  overflow: hidden;
`;

const Text = styled.p`
  background-color: gray;
  color: white;
  font-size: 18px;
  max-width: 90%;
`;

const Caret = styled.span`
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

const HidtoryItem = styled.li`
  color: white;
  padding: 5px;
  font-size: 18px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0 5px;
`;

export const Terminal = ({ execute }: Props) => {
  const [value, setValue] = useState("");
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    const allHandler = (e: KeyboardEvent) => {
      if (e.code === "Backspace")
        e.metaKey ? setValue("") : setValue(val => val.slice(0, -1));
    };
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        // const output = execute(value); Add output to history component
        const commandOutput = execute(value);
        setOutputs(s => [
          ...s,
          { command: value, output: commandOutput, key: Date.now() }
        ]);
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
      <HistoryList>
        {outputs.map(item => (
          <div key={item.key + "command"}>
            <HidtoryItem>{item.command}</HidtoryItem>
            {item.output && (
              <HidtoryItem key={item.key + "output"}>{item.output}</HidtoryItem>
            )}
          </div>
        ))}
      </HistoryList>
    </Container>
  );
};
