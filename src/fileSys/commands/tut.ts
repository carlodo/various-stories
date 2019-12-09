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
      return nextChallange(action, state, terminalEngine);
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

  const activeChallange = state.tut.challanges[state.tut.activeChallange];

  if (activeChallange.check(state)) {
    terminal.stdOut(activeChallange.victory);
    return state;
  }

  return state;
};

const optedIn = (
  _action: TerminalCommand,
  state: FileSysTutorialState,
  terminal: TerminalEngine
) => {
  terminal.stdOut(state.tut.challanges[state.tut.activeChallange].intro);
  return {
    ...state,
    tut: {
      ...state.tut,
      optedIn: true
    }
  };
};

const nextChallange = (
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

  const activeChallange = state.tut.activeChallange + 1;
  if (state.tut.challanges[activeChallange]) {
    terminal.stdOut(state.tut.challanges[activeChallange].intro);

    return {
      ...state,
      tut: {
        ...state.tut,
        activeChallange
      }
    };
  } else {
    terminal.stdOut(state.tut.outro);

    return {
      ...state,
      tut: {
        ...state.tut,
        activeChallange: 1,
        optedIn: false
      }
    };
  }
};
