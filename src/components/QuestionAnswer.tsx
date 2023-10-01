import { ReactElement } from "react";
import State from "../config/types/state";

import questionsByBook from "../data/questions-by-book.json";
import books from "../data/books.json";
import Column from "./ui/Column";
import Slab from "./ui/Slab";
import TextData from "../config/types/style/text";
import Txt from "./ui/Text";
import Row from "./ui/Row";
import { Justification } from "../config/types/style/position";
import Proportional from "./ui/Proportional";
import Size from "../config/types/style/size";

const QuestionAnswer = ({ state }: { state: State }): ReactElement => (
  <Column>
    <Slab>
      <Column>
        <Row justify={Justification.Center}>
          <Txt quiet size={TextData.Size.Small} val="QUESTION" />
        </Row>
        <Txt
          val={`In what book ${
            questionsByBook[state.current.question.bookIndex][
              state.current.question.questionIndex
            ]
          }`}
        />
      </Column>
    </Slab>
    <Slab>
      <Proportional width={`calc(100vw - ${Size.Small} * 4)`}>
        <Column>
          <Row justify={Justification.Center}>
            <Txt quiet size={TextData.Size.Small} val="ANSWER" />
          </Row>
          <Txt val={books[state.current.question.bookIndex]} />
        </Column>
      </Proportional>
    </Slab>
  </Column>
);

export default QuestionAnswer;
