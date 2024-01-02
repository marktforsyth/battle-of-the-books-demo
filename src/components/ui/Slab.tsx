/**
 * A Slab. Like a card or a bubble or a rounded rectangle.
 */
import { PropsWithChildren, ReactElement } from "react";
import Color from "../../config/types/style/color";
import Size from "../../config/types/style/size";
import Styles from "../../config/types/style/styles";

const pickNonSharedStyles = (inner: boolean): Styles => {
  if (inner) {
    return {
      backgroundColor: Color.Background,
      borderRadius: Size.Medium,
    };
  }

  return {
    backgroundColor: Color.Container,
    borderRadius: Size.Large,
  };
};
const Slab = ({
  inner = false,
  children,
}: PropsWithChildren<{
  inner?: boolean;
}>): ReactElement => (
  <div
    style={{
      ...pickNonSharedStyles(inner),
      padding: Size.Small,
    }}
  >
    {children}
  </div>
);

export default Slab;
