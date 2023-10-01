from pandas import read_csv
from json import dump

questions = read_csv("questions.csv")

books = [
  "This Very Tree",
  "The Great Stink",
  "Clementine",
  "Roller Girl",
  "Escape from Mr.",
  "Bad Beginnings",
  "Enola Holmes",
  "They Called Us Enemy",
  "Inheritance Games",
  "Guernsey Literary"
]

out = []

for b in range(len(books)):
    out.append([])

    questions_for_book = questions.loc[
        questions["Book"] == books[b]
    ]["Question"]

    final_questions = [question.strip() for question in list(questions_for_book)]
    out[b] = final_questions

with open("../src/data/questions-by-book.json", "w") as question_file:
    dump(out, question_file)