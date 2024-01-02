/**
 * Element to position other elements.
 *
 * Usually for absolute positioning, like of the command bar. Feels a little
 * ineligant compared to the rest of the UI; could definitely use some polish.
 */
import { PropsWithChildren, ReactElement } from "react";

const Positional = ({
  top = "unset",
  right = "unset",
  bottom = "unset",
  left = "unset",
  backgroundColor = "transparent",
  padding = "0 0 0 0",
  children,
}: PropsWithChildren<{
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  backgroundColor?: string;
  padding?: string;
}>): ReactElement => (
  <div
    style={{
      position: "fixed",
      top,
      right,
      bottom,
      left,
      backgroundColor,
      padding,
    }}
  >
    {children}
  </div>
);

export default Positional;
