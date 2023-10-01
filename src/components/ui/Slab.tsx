import { PropsWithChildren, ReactElement } from "react";
import Color from "../../config/types/style/color";
import Size from "../../config/types/style/size";
import { check } from "../../shared-logic/main";

const Slab = ({
  inner = false,
  children,
}: PropsWithChildren<{
  inner?: boolean;
}>): ReactElement => (
  <div
    style={{
      ...check(
        inner,
        {
          backgroundColor: Color.Background,
          borderRadius: Size.Medium,
        },
        {
          backgroundColor: Color.Container,
          borderRadius: Size.Large,
        },
      ),
      padding: Size.Small,
    }}
  >
    {children}
  </div>
);

export default Slab;
