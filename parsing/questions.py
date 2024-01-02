"""Convert questions CSV to data for front end."""
from json import dump

from pandas import read_csv


def main():
    """Main function."""
    questions_books = read_csv("questions.csv")
    books = {}

    for _, row in questions_books.iterrows():
        question = row["Question"].strip()
        book = row["Book"]

        if book not in books:
            books[book] = [question]
        else:
            books[book].append(question)

    # Format it into two files for the front end

    # TODO change the front end to make this step unnecessary, because a dict
    # feels cleaner than two arrays
    out_books = []
    out_questions = []

    for book, questions in books.items():
        out_books.append(book)
        out_questions.append(questions)

    # Push the data to their needed files

    with open(
        "../src/data/questions-by-book.json",
        "w",
        encoding="utf-8",
    ) as question_file:
        dump(out_questions, question_file)

    with open(
        "../src/data/books.json",
        "w",
        encoding="utf-8",
    ) as book_file:
        dump(out_books, book_file)


if __name__ == "__main__":
    main()
