/**
 * Full-width button inside CmdBar, for navigating through the questions.
 */
import { ReactElement } from "react";
import Clickable from "../ui/Clickable";
import WideBtn from "../ui/WideBtn";

const CmdBtn = ({
  val,
  onClick,
  disabled = false,
}: {
  val: string;
  onClick: () => void;
  disabled?: boolean;
}): ReactElement => {
  if (disabled) {
    return <WideBtn val={val} quiet />;
  }

  return (
    <Clickable onClick={onClick}>
      <WideBtn val={val} />
    </Clickable>
  );
};

export default CmdBtn;
