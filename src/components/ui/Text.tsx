/**
 * Unsemantic text that follows strict rules.
 */
import { ReactElement } from "react";
import TextData from "../../config/types/style/text";
import Size from "../../config/types/style/size";

// The following three functions help choose style props based on predefined
// parameters, leading to a narrower range of options for size/color/etc.

const pickColor = (quiet: boolean): TextData.Color => {
  if (quiet) {
    return TextData.Color.Quiet;
  }

  return TextData.Color.Main;
};

const pickFontWeight = (size: TextData.Size): string => {
  if (size === TextData.Size.Small) {
    return "normal";
  }

  return "300";
};

const pickLineHeight = (size: TextData.Size): string => {
  if (size === TextData.Size.Medium) {
    return "1.5";
  }

  return "1.2";
};

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
      color: pickColor(quiet),
      fontWeight: pickFontWeight(size),
      fontSize: size,
      textAlign: align,
      padding: `0 ${Size.Small}`,
      lineHeight: pickLineHeight(size),
    }}
  >
    {val}
  </div>
);

export default Txt;
