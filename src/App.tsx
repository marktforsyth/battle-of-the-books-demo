/**
 * Main program for battle of the books.
 *
 * There is no page navigation through a router; to show the game over page,
 * this just uses a conditional statement. State is backed up in local storage
 * through a useEffect.
 */
import { ReactElement, useEffect, useReducer } from "react";
import reducer from "./config/reducer/main";
import initialState from "./config/initial-state";
import EndPage from "./components/EndPage";
import State from "./config/types/state";
import MainContainer from "./components/ui/MainContainer";
import QuestionAnswer from "./components/QuestionAnswer";
import Data from "./components/Data";
import CmdBar from "./components/cmd-bar/CmdBar";

const App = (): ReactElement => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState: State): State => {
      // If state was backed up, load it
      if (localStorage["state"] === "") {
        return initialState;
      }

      try {
        return JSON.parse(localStorage["state"]);
      } catch (TypeError) {
        console.log("Hmmm local storage was formatted wrong . . .");
        return initialState;
      }
    },
  );

  useEffect((): void => {
    // Every time we change state, back it up
    localStorage["state"] = JSON.stringify(state);
  }, [state]);

  // Render

  if (state.current.round > 4) { // TODO make a constant called roundLimit for demos
    return (
      <MainContainer gameOver>
        <EndPage />
        <CmdBar gameOver dispatch={dispatch} state={state} />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Data state={state} />
      <QuestionAnswer state={state} />
      <CmdBar dispatch={dispatch} state={state} />
    </MainContainer>
  );
};

export default App;
