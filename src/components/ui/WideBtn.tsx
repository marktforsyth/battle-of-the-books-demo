import { ReactElement } from "react";
import Slab from "./Slab";
import Row from "./Row";
import Txt from "./Text";
import Proportional from "./Proportional";
import { Justification } from "../../config/types/style/position";

const WideBtn = ({
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

export default WideBtn
