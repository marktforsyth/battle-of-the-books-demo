/**
 * The subset of reducer functions which focus on the player.
 * They do most of the heavy lifting so the main reducer can be short.
 */
import { last } from "../../shared-logic/collection";
import { OnDeck, Player, Situation, Status } from "../types/state";
import whoReadWhat from "../../data/who-read-what.json";
import { AtBat, Progress, WhatChanges } from "../types/progress";

const situationsWithPlayer = (
  history: Situation[],
  player: Player,
): Situation[] =>
  history.filter(
    (situation: Situation): boolean =>
      situation.player.playerIndex === player.playerIndex &&
      situation.player.teamIndex === player.teamIndex,
  );

const alreadyTriedAnother = (
  history: Situation[],
  currentPlayer: Player,
  currentBookIndex: number,
): boolean => {
  const playerSituations = situationsWithPlayer(history, currentPlayer);
  const previousPlayerSituation = last(playerSituations);

  return (
    previousPlayerSituation !== undefined &&
    previousPlayerSituation.question.bookIndex === currentBookIndex
  );
};

// These two are completely untethered from state--they can take any inputs

const roundProgress = (
  playerIndex: number,
  teamIndex: 0 | 1,
  round: number,
): Progress => {
  const modifier = round - 1;
  const len = whoReadWhat[teamIndex].length;

  const start = (modifier * 4) % len;
  const end = (start + len - 1) % len;

  const otherTeamLen = whoReadWhat[Math.abs(teamIndex - 1)].length;

  const otherTeamStart = (modifier * 4) % otherTeamLen;
  const nextRoundStart = ((modifier + 1) * 4) % otherTeamLen;

  return {
    otherTeamStart,
    nextRoundStart,
    timeToTransition: end === playerIndex % len,
    len,
  };
};

const whatChanges = (
  playerIndex: number,
  teamIndex: 0 | 1,
  progress: Progress,
): WhatChanges => {
  if (!progress.timeToTransition) {
    return {
      nextPlayerIndex: (playerIndex + 1) % progress.len,
      teamChanges: false,
      roundChanges: false,
    };
  }

  if (teamIndex === 0) {
    return {
      nextPlayerIndex: progress.otherTeamStart,
      teamChanges: true,
      roundChanges: false,
    };
  }

  // Next round!
  return {
    nextPlayerIndex: progress.nextRoundStart,
    teamChanges: true,
    roundChanges: true,
  };
};

// These two are helpers for nextPlayerAndRound

const nextTeam = (currentTeam: 0 | 1, teamChanges: boolean): 0 | 1 => {
  if (teamChanges) {
    if (currentTeam === 0) {
      return 1;
    }

    return 0;
  }

  return currentTeam;
};

const nextRound = (currentRound: number, roundChanges: boolean): number => {
  if (roundChanges) {
    return currentRound + 1;
  }

  return currentRound;
};

const nextPlayerAndRound = (
  currentPlayerIndex: number,
  teamIndex: 0 | 1,
  round: number,
): [Player, number] => {
  const progress = roundProgress(currentPlayerIndex, teamIndex, round);
  const { nextPlayerIndex, teamChanges, roundChanges } = whatChanges(
    currentPlayerIndex,
    teamIndex,
    progress,
  );

  return [
    {
      playerIndex: nextPlayerIndex,
      teamIndex: nextTeam(teamIndex, teamChanges),
    },
    nextRound(round, roundChanges),
  ];
};

// This is a helper for onDeckNameAndStatus
const onDeckStatus = (
  teamChanges: boolean,
  roundChanges: boolean,
  round: number,
): Status => {
  if (roundChanges && round + 1 > 4) {
    return Status.LastRound;
  }

  if (teamChanges) {
    return Status.OtherTeam;
  }

  return Status.Normal;
};

const onDeckNameAndStatus = (
  nextPlayerIndex: number,
  teamIndex: 0 | 1,
  round: number,
): OnDeck => {
  const progress = roundProgress(nextPlayerIndex, teamIndex, round);
  const {
    nextPlayerIndex: onDeckPlayerIndex,
    teamChanges,
    roundChanges,
  } = whatChanges(nextPlayerIndex, teamIndex, progress);

  return {
    name: whoReadWhat[nextTeam(teamIndex, teamChanges)][onDeckPlayerIndex].name,
    status: onDeckStatus(teamChanges, roundChanges, round),
  };
};

// These values should come directly from state
const atBat = (currentPlayer: Player, currentRound: number): AtBat => {
  const [nextPlayer, nextRound] = nextPlayerAndRound(
    currentPlayer.playerIndex,
    currentPlayer.teamIndex,
    currentRound,
  );
  const onDeck = onDeckNameAndStatus(
    nextPlayer.playerIndex,
    nextPlayer.teamIndex,
    nextRound,
  );

  return {
    nextPlayer,
    onDeck,
    nextRound,
  };
};

export { situationsWithPlayer, alreadyTriedAnother, atBat };
