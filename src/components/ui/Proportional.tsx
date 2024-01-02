/**
 * Element controlling width and height.
 *
 * Much like Positional, this feels hacked together. I want a solution that
 * feels more like my UI and less like glorified CSS.
 */
import { PropsWithChildren, ReactElement } from "react";

const Proportional = ({
  width = "unset",
  height = "unset",
  children,
}: PropsWithChildren<{
  width?: string;
  height?: string;
}>): ReactElement => (
  <div
    style={{
      width,
      height,
    }}
  >
    {children}
  </div>
);

export default Proportional;
