/**
 * Helper functions for question.ts to make sure we don't give redundant or
 * unanswerable questions.
 */
import { Player, Situation } from "../types/state";
import whoReadWhat from "../../data/who-read-what.json";

namespace Book {
  export const unused = (
    b: number,
    unusedQuestionIndices: number[][],
  ): boolean => unusedQuestionIndices[b].length > 0;

  export const read = (b: number, player: Player): boolean =>
    whoReadWhat[player.teamIndex][player.playerIndex].books.indexOf(b) !== -1;

  export const notJustUsed = (b: number, currentBookIndex: number): boolean =>
    b !== currentBookIndex;

  export const notSameTwice = (
    b: number,
    playerSituations: Situation[],
  ): boolean =>
    playerSituations.filter(
      (situation: Situation): boolean => situation.question.bookIndex === b,
    ).length === 0;
}

export default Book;
