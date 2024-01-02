/**
 * An element that exists to be clicked.
 *
 * Although unconventional, this makes clicking more semantically visible in
 * UI infrastructure but allows each element to maintain its unique styling. I
 * don't like the messiness of giving every random element an optional onClick
 * handler, but the styling of buttons is very limited and thus usually needs
 * to be overridden. This seemed the cleanest method within my UI framework.
 */
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
