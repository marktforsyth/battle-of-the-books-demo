import { PropsWithChildren, ReactElement } from "react";

const Clickable = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>): ReactElement => (
  <div style={{ cursor: "pointer", userSelect: "none" }} onClick={onClick}>
    {children}
  </div>
);

export default Clickable;
