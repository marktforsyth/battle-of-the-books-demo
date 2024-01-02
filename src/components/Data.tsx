/**
 * Displays all of the stats, excluding current question and answer.
 *
 * These are all calculated automatically as the game progresses and stored
 * in state. Look at src/reducer for more details on how this is calculated.
 */
import { ReactElement } from "react";
import Slab from "./ui/Slab";
import Txt from "./ui/Text";
import TextData from "../config/types/style/text";
import Grid from "./ui/Grid";
import State, { OnDeck } from "../config/types/state";
import Column from "./ui/Column";

import whoReadWhat from "../data/who-read-what.json";
import { Alignment, Justification } from "../config/types/style/position";
import Proportional from "./ui/Proportional";
import Size from "../config/types/style/size";
import { Status } from "../config/types/state";
import Positional from "./ui/Positional";
import Row from "./ui/Row";

const showOnDeck = (onDeck: OnDeck): ReactElement => {
  switch (onDeck.status) {
    case Status.Normal: {
      return (
        <Column align={Alignment.Center}>
          <Txt quiet size={TextData.Size.Small} val="ON DECK" />
          <Txt val={onDeck.name} />
        </Column>
      );
    }
    case Status.OtherTeam: {
      return (
        <Column align={Alignment.Center}>
          <Txt quiet size={TextData.Size.Small} val="ON DECK" />
          <Txt val={onDeck.name} />
          <Txt val="(Other Team)" size={TextData.Size.Small} />
        </Column>
      );
    }
    default: {
      return (
        <Column align={Alignment.Center}>
          <Row align={Alignment.Center} justify={Justification.Center}>
            <Txt val="Last Question!" />
          </Row>
        </Column>
      );
    }
  }
};

// TODO
// Make the titles outside the slab, centered, slightly bigger
// Answer should be a larger font (thin?)
// Gaps between titles and next slabs (I mean it's not actually even a list)
// Play around with this

const Data = ({ state }: { state: State }): ReactElement => (
  <Proportional width={`calc(100vw - ${Size.Small} * 2)`}>
    <Slab>
      <Column align={Alignment.Center}>
        <Txt quiet size={TextData.Size.Small} val="DATA" />
        <Proportional width={`calc(100vw - ${Size.Small} * 4)`}>
          {/* Each of these grids is a row */}
          <Grid columns="1fr 3fr">
            <Slab inner>
              <Column align={Alignment.Center}>
                <Txt quiet size={TextData.Size.Small} val="TEAM" />
                <Txt
                  size={TextData.Size.Large}
                  val={`${state.current.player.teamIndex + 1}`}
                />
              </Column>
            </Slab>
            <Slab inner>
              <Column align={Alignment.Center}>
                <Txt quiet size={TextData.Size.Small} val="BATTER" />
                <Txt
                  size={TextData.Size.Large}
                  val={whoReadWhat[state.current.player.teamIndex][
                    state.current.player.playerIndex
                  ].name}
                />
              </Column>
            </Slab>
          </Grid>
        </Proportional>
        <Grid columns="2fr 1fr">
          <Slab inner>
            {showOnDeck(state.current.onDeck)}
          </Slab>
          <Slab inner>
            <Column align={Alignment.Center}>
              <Txt
                quiet
                size={TextData.Size.Small}
                align={TextData.Alignment.Center}
                val="ROUND"
              />
              <Row align={Alignment.Center} justify={Justification.Center}>
                <Txt
                  size={TextData.Size.Large}
                  val={`${state.current.round}`}
                />
              </Row>
            </Column>
          </Slab>
        </Grid>
      </Column>
    </Slab>
  </Proportional>
);

export default Data;
