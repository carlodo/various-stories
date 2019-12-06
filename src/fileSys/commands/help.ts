import { TerminalCommand } from "../../commandMe/types";
import { FileSysState } from "../types";

// TODO: finish this command to output files and folders from pwd
export const help = {
  execute: (_action: TerminalCommand, state: FileSysState) => ({
    state,
    output: `
    supported commands are:

        cd (change directory)
        ex: "cd /etc"
        
        mkdir (make directory)
        ex: "mkdir new_folder"
        
        pwd (print working directory)
        
        touch (create file)
        ex: "touch new_file"

        help (shows this menu)
    `
  })
};
