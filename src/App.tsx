import { ReactElement, useEffect, useReducer } from "react";
import Nav from "./components/nav/Nav";
import reducer from "./config/reducer/main";
import initialState from "./config/initial-state";
import EndPage from "./components/EndPage";
import State from "./config/types/state";
import MainContainer from "./components/ui/MainContainer";
import QuestionAnswer from "./components/QuestionAnswer";
import Data from "./components/Data";
import { check } from "./shared-logic/main";

const App = (): ReactElement => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState: State): State => {
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
    localStorage["state"] = JSON.stringify(state);
  }, [state]);

  return check(
    state.current.round > 3,
    <MainContainer over>
      <EndPage />
      <Nav over dispatch={dispatch} state={state} />
    </MainContainer>,
    <MainContainer>
      <Data state={state} />
      <QuestionAnswer state={state} />
      <Nav dispatch={dispatch} state={state} />
    </MainContainer>,
  );
};

export default App;
