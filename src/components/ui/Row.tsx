/**
 * CSS flex row, with strict rules (enums for align/justify).
 */
import { PropsWithChildren, ReactElement } from "react";
import Size from "../../config/types/style/size";
import { Alignment, Justification } from "../../config/types/style/position";

const Row = ({
  align = Alignment.Start,
  justify = Justification.Start,
  children,
}: PropsWithChildren<{
  align?: Alignment;
  justify?: Justification;
}>): ReactElement => (
  <div
    style={{
      display: "flex",
      gap: Size.Small,
      justifyContent: justify,
      alignItems: align,
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </div>
);

export default Row;
