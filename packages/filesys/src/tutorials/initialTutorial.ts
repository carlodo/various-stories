import { FileSysState } from "../types";

export const initialTutorialState = {
  optedIn: false,
  activeChallenge: 0,
  outro: `
      This tutorial is still in development.
      
      If you liked the concept please let me know. Also feel free to contribute or give feedback at [GIT URL] 😉.
    `,
  challenges: [
    {
      intro: `Greetings fellow CLI user 🤗. Welcome to the file system CLI tutorial.

        === CHALLENGE NO 1

        In this first challenge I dare you to create a folder named 'magic' in your home directory (/home/joe)
      `,
      victory: `🥁 HUZZAH 🥁

        for next challenge type 'tut next'
      `,
      check: (state: FileSysState) => !!state.folders["/home/joe/magic"]
    },
    {
      intro: `HOHO, I wasn't expecting you'll make it this far. Prepare for my ultimate challenge.

        === CHALLENGE NO 2

        Please create a file in /etc folder called 'ultimate-file'
      `,
      victory: `With the creation of this file you hear a loud 💥 in the distance.
        it seems the ultimate file has done it's damage. Time to head back to our home planet.
        
        for next challenge type 'tut next'
      `,
      check: (state: FileSysState) => !!state.files["/etc/ultimate-file"]
    }
  ]
};
