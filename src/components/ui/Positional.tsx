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
