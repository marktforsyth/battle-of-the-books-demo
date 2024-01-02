/**
 * Starting state of the program, remove more clutter from the main files.
 */
import State, { Status } from "./types/state";
import whoReadWhat from "../data/who-read-what.json";

const initialState: State = {
  current: {
    question: {
      questionIndex: 0,
      bookIndex: 0,
    },
    player: {
      playerIndex: 0,
      teamIndex: 0,
    },
    onDeck: {
      name: whoReadWhat[0][1].name,
      status: Status.Normal,
    },
    round: 1,
  },
  history: [],
};

export default initialState;
