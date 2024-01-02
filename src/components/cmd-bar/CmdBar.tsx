/**
 * Main command bar for navigating questions.
 */
import { ReactElement } from "react";
import Size from "../../config/types/style/size";
import CmdBtn from "./CmdBtn";
import { Alignment, Justification } from "../../config/types/style/position";
import Column from "../ui/Column";
import Grid from "../ui/Grid";
import Action from "../../config/types/action";
import Positional from "../ui/Positional";
import State from "../../config/types/state";
import { alreadyTriedAnother } from "../../config/reducer/player";
import Color from "../../config/types/style/color";

const reload = (dispatch: (action: Action) => void): void => {
  if (confirm("Are you sure you want to reload?")) {
    dispatch(Action.Reload);
  }
};

const undo = (dispatch: (action: Action) => void): void => {
  if (
    confirm(
      "Undo? Only do this if you made a mistake (there's no redo button).",
    )
  ) {
    dispatch(Action.Undo);
  }
};

const showReloadOrCmd = (
  gameOver: boolean,
  dispatch: (action: Action) => void,
  state: State,
): ReactElement => {
  // All of the logic for these buttons is handled in reducer/
  if (gameOver) {
    return (
      <Column justify={Justification.Center} align={Alignment.Center}>
        <CmdBtn val="Reload" onClick={(): void => reload(dispatch)} />
      </Column>
    );
  }

  return (
    <Grid columns="1fr 1fr">
      <CmdBtn val="Reload" onClick={(): void => reload(dispatch)} />
      <CmdBtn
        val="Undo"
        onClick={() => undo(dispatch)}
        disabled={state.history.length === 0}
      />
      <CmdBtn
        val="Another?"
        onClick={() => dispatch(Action.TryAnother)}
        disabled={alreadyTriedAnother(
          state.history,
          state.current.player,
          state.current.question.bookIndex,
        )}
      />
      <CmdBtn val="Next" onClick={() => dispatch(Action.Next)} />
    </Grid>
  );
};

const CmdBar = ({
  gameOver = false,
  dispatch,
  state,
}: {
  gameOver?: boolean;
  dispatch: (action: Action) => void;
  state: State;
}): ReactElement => (
  <Positional
    left={`${Size.Small}`}
    bottom={`${Size.Small}`}
    right={`${Size.Small}`}
    backgroundColor={`${Color.Background}`}
    padding={`${Size.Small} 0 0 0`}
  >
    {showReloadOrCmd(gameOver, dispatch, state)}
  </Positional>
);

export default CmdBar;
