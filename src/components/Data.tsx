import { ReactElement } from "react";
import Slab from "./ui/Slab";
import Txt from "./ui/Text";
import TextData from "../config/types/style/text";
import Grid from "./ui/Grid";
import State from "../config/types/state";
import Column from "./ui/Column";

import teams from "../data/teams.json";
import { Alignment } from "../config/types/style/position";
import Proportional from "./ui/Proportional";
import Size from "../config/types/style/size";

const Data = ({ state }: { state: State }): ReactElement => (
  <Proportional width={`calc(100vw - ${Size.Small} * 2)`}>
    <Slab>
      <Column align={Alignment.Center}>
        <Txt quiet size={TextData.Size.Small} val="DATA" />
        <Proportional width={`calc(100vw - ${Size.Small} * 4)`}>
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
                  val={
                    teams[state.current.player.teamIndex][
                      state.current.player.playerIndex
                    ].name
                  }
                />
              </Column>
            </Slab>
          </Grid>
        </Proportional>
        <Grid columns="2fr 1fr">
          <Slab inner>
            <Column align={Alignment.Center}>
              <Txt quiet size={TextData.Size.Small} val="ON DECK" />
              <Txt val={state.current.onDeckName} />
            </Column>
          </Slab>
          <Slab inner>
            <Column align={Alignment.Center}>
              <Txt
                quiet
                size={TextData.Size.Small}
                align={TextData.Alignment.Center}
                val="ROUND"
              />
              <Txt size={TextData.Size.Large} val={`${state.current.round}`} />
            </Column>
          </Slab>
        </Grid>
      </Column>
    </Slab>
  </Proportional>
);

export default Data;
