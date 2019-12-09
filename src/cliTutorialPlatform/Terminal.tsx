import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

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

export interface Props {
  keyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  stdIn: string;
  stdOut: {
    output: string;
    key: number;
  }[];
  setStdIn: (stdIn: string) => void;
}

export const Terminal = ({ keyDown, stdIn, stdOut, setStdIn }: Props) => {
  const inputEl = useRef(null);

  const focusInput = useCallback(
    () => inputEl.current && inputEl.current.focus(),
    [inputEl]
  );

  useEffect(focusInput, [inputEl]);

  return (
    <Container onClick={focusInput}>
      <InputContainer>
        <Dollar>$</Dollar>
        <TextContainer>
          <TextInput
            value={stdIn}
            ref={inputEl}
            onKeyDown={keyDown}
            onChange={e => setStdIn(e.target.value)}
          ></TextInput>
          <TextWrapHelper
            dangerouslySetInnerHTML={{
              __html: stdIn.replace(/\n/g, "<br/>&nbsp")
            }}
          ></TextWrapHelper>
        </TextContainer>
      </InputContainer>
      <HistoryList>
        {stdOut.map(item => (
          <div key={item.key}>
            <HistoryItem>{item.output}</HistoryItem>
          </div>
        ))}
      </HistoryList>
    </Container>
  );
};
