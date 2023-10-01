import Action from "../types/action";
import State from "../types/state";
import { last } from "../../shared-logic/main";
import { nextAtBat } from "./player";
import { newQuestionSameBook, nextQuestionForPlayer } from "./question";
import initialState from "../initial-state";

import teams from "../../data/teams.json";

const reducer = (state: State, action: Action): State => {
  switch (action) {
    case Action.Next: {
      const [nextPlayer, nextRound] = nextAtBat(
        state.current.player,
        state.current.round,
      );
      const [onDeckPlayer, _onDeckRound] = nextAtBat(nextPlayer, nextRound);

      const nextHistory = [...state.history, state.current];

      const { questionIndex: nextQuestionIndex, bookIndex: nextBookIndex } =
        nextQuestionForPlayer(
          nextHistory,
          nextPlayer,
          state.current.question.bookIndex,
        );

      return {
        current: {
          question: {
            questionIndex: nextQuestionIndex,
            bookIndex: nextBookIndex,
          },
          player: nextPlayer,
          onDeckName:
            teams[onDeckPlayer.teamIndex][onDeckPlayer.playerIndex].name,
          round: nextRound,
        },
        history: nextHistory,
      };
    }
    case Action.TryAnother: {
      const nextHistory = [...state.history, state.current];

      const { questionIndex: nextQuestionIndex, bookIndex: nextBookIndex } =
        newQuestionSameBook(nextHistory, state.current.question.bookIndex);

      return {
        current: {
          ...state.current,
          question: {
            questionIndex: nextQuestionIndex,
            bookIndex: nextBookIndex,
          },
        },
        history: nextHistory,
      };
    }
    case Action.Undo: {
      return {
        current: last(state.history),
        history: [...state.history].splice(0, state.history.length - 1),
      };
    }
    case Action.Reload: {
      return initialState;
    }
  }
};

export default reducer;
