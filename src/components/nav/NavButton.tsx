import { ReactElement } from "react";
import { check } from "../../shared-logic/main";
import Clickable from "../ui/Clickable";
import { Justification } from "../../config/types/style/position";
import Row from "../ui/Row";
import Proportional from "../ui/Proportional";
import Slab from "../ui/Slab";
import Txt from "../ui/Text";

const Full = ({
  val,
  quiet = false,
}: {
  val: string;
  quiet?: boolean;
}): ReactElement => (
  <Proportional>
    <Slab>
      <Row justify={Justification.Center}>
        <Txt quiet={quiet} val={val} />
      </Row>
    </Slab>
  </Proportional>
);

const NavButton = ({
  val,
  onClick,
  disabled = false,
}: {
  val: string;
  onClick: () => void;
  disabled?: boolean;
}): ReactElement =>
  check(
    disabled,
    <Full val={val} quiet />,
    <Clickable onClick={onClick}>
      <Full val={val} />
    </Clickable>,
  );

export default NavButton;
