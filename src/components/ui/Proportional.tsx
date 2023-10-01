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
