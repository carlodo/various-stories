import { TerminalCommand } from "../../commandMe/types";
import { FileSysState } from "../types";

export const pwd = {
  execute: (_action: TerminalCommand, state: FileSysState) => ({
    state,
    output: state.pwd
  })
};
