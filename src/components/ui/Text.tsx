import { ReactElement } from "react";
import TextData from "../../config/types/style/text";
import Size from "../../config/types/style/size";
import { check } from "../../shared-logic/main";

const Txt = ({
  align = TextData.Alignment.Left,
  quiet = false,
  size = TextData.Size.Medium,
  val,
}: {
  align?: TextData.Alignment;
  quiet?: boolean;
  size?: TextData.Size;
  val: string;
}): ReactElement => (
  <div
    style={{
      color: check(quiet, TextData.Color.Quiet, TextData.Color.Main),
      fontWeight: check(size !== TextData.Size.Small, "300", "normal"),
      fontSize: size,
      textAlign: align,
      padding: `0 ${Size.Small}`,
      lineHeight: check(size === TextData.Size.Medium, "1.5", "1.2"),
    }}
  >
    {val}
  </div>
);

export default Txt;
