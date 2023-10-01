import { check, last } from "../../shared-logic/main";
import State, { Player, Situation } from "../types/state";
import teams from "../../data/teams.json";

const situationsWithPlayer = (
  history: Situation[],
  player: Player,
): Situation[] =>
  history.filter(
    (situation: Situation): boolean =>
      situation.player.playerIndex === player.playerIndex &&
      situation.player.teamIndex === player.teamIndex,
  );

const alreadyTriedAnother = (state: State): boolean => {
  const playerSituations = situationsWithPlayer(
    state.history,
    state.current.player,
  );

  const previousPlayerSituation = last(playerSituations);

  return (
    previousPlayerSituation !== undefined &&
    previousPlayerSituation.question.bookIndex ===
      state.current.question.bookIndex
  );
};

const nextAtBat = (player: Player, round: number): [Player, number] => {
  const modifier = round - 1;
  const len = teams[player.teamIndex].length;

  const start = (modifier * 4) % len;
  const end = (start + len - 1) % len;

  const otherTeamLen = teams[Math.abs(player.teamIndex - 1)].length;

  const otherTeamStart = (modifier * 4) % otherTeamLen;
  const nextRoundStart = ((modifier + 1) * 4) % otherTeamLen;

  return check(
    end === player.playerIndex % len,
    check(
      player.teamIndex === 0,
      [{ playerIndex: otherTeamStart, teamIndex: 1 }, round],
      [{ playerIndex: nextRoundStart, teamIndex: 0 }, round + 1],
    ),
    [
      {
        playerIndex: (player.playerIndex + 1) % len,
        teamIndex: player.teamIndex,
      },
      round,
    ],
  );
};

export { situationsWithPlayer, alreadyTriedAnother, nextAtBat };
