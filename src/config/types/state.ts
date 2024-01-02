/**
 * All the types for state (also referenced in other files). Also includes the
 * State type itself at the bottom.s
 */
type Question = {
  questionIndex: number;
  bookIndex: number;
};

type Player = {
  playerIndex: number;
  teamIndex: 0 | 1;
};

enum Status {
  Normal,
  OtherTeam,
  LastRound,
}

type OnDeck = {
  name: string;
  status: Status;
};

type Situation = {
  question: Question;
  player: Player;
  onDeck: OnDeck;
  round: number;
};

type State = {
  current: Situation;
  history: Situation[];
};

export default State;
export type { Question, Player, Situation, OnDeck };
export { Status };
