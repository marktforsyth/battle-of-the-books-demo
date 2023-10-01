import { ReactElement } from "react";
import Size from "../../config/types/style/size";
import NavButton from "./NavButton";
import { Alignment, Justification } from "../../config/types/style/position";
import { check } from "../../shared-logic/main";
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

const Nav = ({
  over = false,
  dispatch,
  state,
}: {
  over?: boolean;
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
    {check(
      over,
      <Column justify={Justification.Center} align={Alignment.Center}>
        <NavButton val="Reload" onClick={(): void => reload(dispatch)} />
      </Column>,
      <Grid columns="1fr 1fr">
        <NavButton val="Reload" onClick={(): void => reload(dispatch)} />
        <NavButton
          val="Undo"
          onClick={() => undo(dispatch)}
          disabled={state.history.length === 0}
        />
        <NavButton
          val="Another?"
          onClick={() => dispatch(Action.TryAnother)}
          disabled={alreadyTriedAnother(state)}
        />
        <NavButton val="Next" onClick={() => dispatch(Action.Next)} />
      </Grid>,
    )}
  </Positional>
);

export default Nav;
