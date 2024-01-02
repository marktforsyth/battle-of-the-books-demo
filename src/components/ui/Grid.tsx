/**
 * CSS Grid with defaults and strict (ish) rules.
 */
import { PropsWithChildren, ReactElement } from "react";
import Size from "../../config/types/style/size";

const Grid = ({
  columns,
  children,
}: PropsWithChildren<{ columns: string }>): ReactElement => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: columns,
      gap: Size.Small,
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </div>
);

export default Grid;
