import { chooseRandom, indices } from "../../shared-logic/main";
import { Player, Question, Situation } from "../types/state";
import questionsByBook from "../../data/questions-by-book.json";
import { situationsWithPlayer } from "./player";
import Book from "./book-checks";

const unusedQuestionIndicesByBook = (history: Situation[]): number[][] =>
  questionsByBook.map((book: string[], b: number): number[] =>
    indices(book).filter(
      (q: number): boolean =>
        history.filter(
          (situation: Situation): boolean =>
            situation.question.bookIndex === b &&
            situation.question.questionIndex === q,
        ).length === 0,
    ),
  );

const newQuestionSameBook = (
  history: Situation[],
  bookIndex: number,
): Question => {
  const unusedQuestionIndices = unusedQuestionIndicesByBook(history);
  const nextQuestionIndex = chooseRandom(unusedQuestionIndices[bookIndex]);

  return {
    questionIndex: nextQuestionIndex,
    bookIndex,
  };
};

const nextQuestionForPlayer = (
  history: Situation[],
  player: Player,
  currentBookIndex: number,
): Question => {
  const unusedQuestionIndices = unusedQuestionIndicesByBook(history);
  const playerSituations = situationsWithPlayer(history, player);
  const availableBooks = indices(unusedQuestionIndices).filter(
    (b: number): boolean =>
      Book.unused(b, unusedQuestionIndices) &&
      Book.read(b, player) &&
      Book.notJustUsed(b, currentBookIndex) &&
      Book.notSameTwice(b, playerSituations),
  );
  const nextBookIndex = chooseRandom(availableBooks);

  if (unusedQuestionIndices[nextBookIndex] === undefined) {
    console.log(unusedQuestionIndices);
    console.log(nextBookIndex);
    console.log(availableBooks);
    throw Error(
      "We ran out of questions; this should never happen in a real game",
    );
  }

  const nextQuestionIndex = chooseRandom(unusedQuestionIndices[nextBookIndex]);

  return {
    questionIndex: nextQuestionIndex,
    bookIndex: nextBookIndex,
  };
};

export { newQuestionSameBook, nextQuestionForPlayer };
