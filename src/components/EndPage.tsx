import { ReactElement } from "react";
import Column from "./ui/Column";
import { Alignment, Justification } from "../config/types/style/position";
import Txt from "./ui/Text";
import TextData from "../config/types/style/text";
import Proportional from "./ui/Proportional";

const EndPage = (): ReactElement => {
  return (
    <Proportional height="calc(100vh - 6.8rem)">
      <Column justify={Justification.Center} align={Alignment.Center}>
        <Txt val="All done!" size={TextData.Size.Large} />
      </Column>
    </Proportional>
  );
};

export default EndPage;
