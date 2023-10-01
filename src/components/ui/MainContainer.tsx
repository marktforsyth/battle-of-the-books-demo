import { PropsWithChildren, ReactElement } from "react";
import Size from "../../config/types/style/size";
import Color from "../../config/types/style/color";
import { check } from "../../shared-logic/main";

const MainContainer = ({
  over = false,
  children,
}: PropsWithChildren<{ over?: boolean }>): ReactElement => (
  <div
    style={{
      ...check(
        over,
        { height: "100vh" },
        {
          padding: `${Size.Small} ${Size.Small} 8rem ${Size.Small}`,
          height: `calc(100vh - 8.5rem)`,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: Size.Small,
        },
      ),
      backgroundColor: Color.Background,
      overflow: "scroll",
    }}
  >
    {children}
  </div>
);

export default MainContainer;
