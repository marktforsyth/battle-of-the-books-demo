/**
 * The main container for the project.
 *
 * Ideally, we wouldn't need this, but could instead craft this as an element
 * from other dedicated UI elements. For now this is cleanest.
 */
import { PropsWithChildren, ReactElement } from "react";
import Size from "../../config/types/style/size";
import Color from "../../config/types/style/color";
import Styles from "../../config/types/style/styles";

const pickNonSharedStyles = (
  gameOver: boolean,
): Styles => {
  if (gameOver) {
    return { height: "100vh" };
  }

  return {
    padding: `${Size.Small} ${Size.Small} 8rem ${Size.Small}`,
    height: `calc(100vh - 8.5rem)`,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: Size.Small,
  };
};

const MainContainer = ({
  gameOver = false,
  children,
}: PropsWithChildren<{ gameOver?: boolean }>): ReactElement => (
  <div
    style={{
      ...pickNonSharedStyles(gameOver),
      backgroundColor: Color.Background,
      overflow: "scroll",
    }}
  >
    {children}
  </div>
);

export default MainContainer;
