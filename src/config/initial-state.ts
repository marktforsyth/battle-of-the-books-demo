import State from "./types/state";
import teams from "../data/teams.json";

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
    onDeckName: teams[0][1].name,
    round: 1,
  },
  history: [],
};

export default initialState;
