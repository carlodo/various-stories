import {
  TerminalCommand,
  TerminalEngine
} from "../../cliTutorialPlatform/types";
import { FileSysTutorialState } from "../types";

// TODO: finish this command to output files and folders from pwd
export const tut = {
  execute: (
    action: TerminalCommand,
    state: FileSysTutorialState,
    terminalEngine: TerminalEngine
  ): FileSysTutorialState => {
    const cmnds = action.commands;
    if (cmnds[1] === "opt" && cmnds[2] === "in")
      return optedIn(action, state, terminalEngine);
    else if (cmnds[1] === "next")
      return nextChallenge(action, state, terminalEngine);
    else {
      terminalEngine.stdOut(`tut ${cmnds[1]} unknown command`);
      return state;
    }
  }
};

export const checkTutorialState = (
  state: FileSysTutorialState,
  terminal: TerminalEngine
): FileSysTutorialState => {
  if (!state.tut.optedIn) return state;

  const activeChallenge = state.tut.challenges[state.tut.activeChallenge];

  if (activeChallenge.check(state)) {
    terminal.stdOut(activeChallenge.victory);
    return state;
  }

  return state;
};

const optedIn = (
  _action: TerminalCommand,
  state: FileSysTutorialState,
  terminal: TerminalEngine
) => {
  terminal.stdOut(state.tut.challenges[state.tut.activeChallenge].intro);
  return {
    ...state,
    tut: {
      ...state.tut,
      optedIn: true
    }
  };
};

const nextChallenge = (
  _action: TerminalCommand,
  state: FileSysTutorialState,
  terminal: TerminalEngine
): FileSysTutorialState => {
  if (!state.tut.optedIn) {
    terminal.stdOut(
      "You haven't opted into the tutorial type 'tut opt in' first"
    );
    return state;
  }

  const activeChallenge = state.tut.activeChallenge + 1;
  if (state.tut.challenges[activeChallenge]) {
    terminal.stdOut(state.tut.challenges[activeChallenge].intro);

    return {
      ...state,
      tut: {
        ...state.tut,
        activeChallenge
      }
    };
  } else {
    terminal.stdOut(state.tut.outro);

    return {
      ...state,
      tut: {
        ...state.tut,
        activeChallenge: 1,
        optedIn: false
      }
    };
  }
};
