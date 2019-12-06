import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

export interface Props {
  execute: (command: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: ${({ theme }) => theme.global.colors.transparentGray};
  height: calc(100% - 20px);
  border-radius: 5px;
  font-family: "Anonymous Pro", monospace;
  overflow-y: scroll;
  padding: 10px 0;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
`;

const TextContainer = styled.div`
  flex: 1;
  position: relative;
`;

const TextInput = styled.textarea`
  box-sizing: border-box;
  padding: 5px 5px 5px 0;
  overflow: hidden;
  position: absolute;
  width: calc(100% - 10px);
  height: 100%;
  font-size: 1.2em;
  font-family: "Anonymous Pro", monospace;
  background-color: transparent;
  border: none;
  resize: none;

  :focus {
    outline-width: 0;
  }

  caret-color: ${({ theme }) => theme.global.colors.white};
  color: ${({ theme }) => theme.global.colors.white};
`;

const TextWrapHelper = styled.div`
  font-size: 1.2em;
  padding-bottom: 1.5em;
  visibility: hidden;
  padding: 5px;
  width: calc(100% - 10px);
`;

const Dollar = styled.p`
  font-size: 1.2em;
  color: #abfd98;
  padding: 5px;
  margin: 0px;
`;

const HistoryItem = styled.li`
  color: white;
  padding: 5px;
  font-size: 18px;
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0 0;
  white-space: pre-line;
`;

export const Terminal = ({ execute }: Props) => {
  const [value, setValue] = useState("");
  const [outputs, setOutputs] = useState([]);
  const inputEl = useRef(null);

  const focusInput = useCallback(
    () => inputEl.current && inputEl.current.focus(),
    [inputEl]
  );

  useEffect(focusInput, [inputEl]);

  const keyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode !== 13) return;

      e.preventDefault();
      const value = e.currentTarget.value;

      if (value === "") return;

      setValue("");
      const commandOutput = execute(value);
      setOutputs(outputs => [
        ...outputs,
        { command: value, output: commandOutput, key: Date.now() }
      ]);
    },
    [execute, setOutputs]
  );

  return (
    <Container onClick={focusInput}>
      <InputContainer>
        <Dollar>$</Dollar>
        <TextContainer>
          <TextInput
            value={value}
            ref={inputEl}
            onKeyDown={keyDown}
            onChange={e => setValue(e.target.value)}
          ></TextInput>
          <TextWrapHelper
            dangerouslySetInnerHTML={{
              __html: value.replace(/\n/g, "<br/>&nbsp")
            }}
          ></TextWrapHelper>
        </TextContainer>
      </InputContainer>
      <HistoryList>
        {outputs.map(item => (
          <div key={item.key}>
            <HistoryItem>$ {item.command}</HistoryItem>
            {item.output && <HistoryItem>{item.output}</HistoryItem>}
          </div>
        ))}
      </HistoryList>
    </Container>
  );
};
