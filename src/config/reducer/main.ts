/**
 * The central reducer, with components broken up across the entire directory.
 */
import Action from "../types/action";
import State from "../types/state";
import { last } from "../../shared-logic/collection";
import { atBat } from "./player";
import { newQuestionSameBook, nextQuestionForPlayer } from "./question";
import initialState from "../initial-state";

const reducer = (state: State, action: Action): State => {
  switch (action) {
    case Action.Next: {
      const { nextPlayer, onDeck, nextRound } = atBat(
        state.current.player,
        state.current.round,
      );

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
          onDeck: onDeck,
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
