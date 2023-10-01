type Question = {
  questionIndex: number;
  bookIndex: number;
};

type Player = {
  playerIndex: number;
  teamIndex: 0 | 1;
};

type Situation = {
  question: Question;
  player: Player;
  onDeckName: string;
  round: number;
};

type State = {
  current: Situation;
  history: Situation[];
};

export default State;
export type { Question, Player, Situation };
