/**
 * Types used for finding the changes between players. Mainly for the player
 * reducer helper functions.
 */
import { OnDeck, Player } from "./state";

type Progress = {
  otherTeamStart: number;
  nextRoundStart: number;
  timeToTransition: boolean;
  len: number;
};

type AtBat = {
  nextPlayer: Player;
  onDeck: OnDeck;
  nextRound: number;
};

type WhatChanges = {
  nextPlayerIndex: number;
  teamChanges: boolean;
  roundChanges: boolean;
};

export type { Progress, AtBat, WhatChanges };
