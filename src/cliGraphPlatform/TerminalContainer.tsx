import React, { useState, useEffect, useCallback } from "react";
import { Terminal } from "./Terminal";
import { TerminalEngine } from "./types";

export interface Props {
  execute: (command: string, terminalEngine: TerminalEngine) => void;
  initializeTerminal: (terminalEngine: TerminalEngine) => void;
}

export const TerminalContainer = ({ execute, initializeTerminal }: Props) => {
  const [stdIn, setStdIn] = useState("");
  const [stdOut, setStdOut] = useState([]);

  const terminalEngine: TerminalEngine = {
    clearStdOut: () => setStdOut([]),
    stdOut: (outputValue: string) =>
      setStdOut(currentStdOut => [
        ...currentStdOut,
        { output: outputValue, key: `value${Math.random()}` }
      ])
  };

  useEffect(() => initializeTerminal(terminalEngine), []);

  const keyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode !== 13) return;

      // enter pressed (keycode 13)
      e.preventDefault();
      const command = e.currentTarget.value;

      if (command === "") return;

      setStdIn("");

      setStdOut(currentStdOut => [
        ...currentStdOut,
        { output: `$ ${command}`, key: `command${Math.random()}` }
      ]);
      execute(command, terminalEngine);
    },
    [execute, stdOut, setStdIn]
  );

  return (
    <Terminal
      keyDown={keyDown}
      stdIn={stdIn}
      stdOut={stdOut}
      setStdIn={setStdIn}
    />
  );
};
