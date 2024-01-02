"""Convert CSV for who read what to JSON for front end."""
from json import dump, loads

from pandas import read_csv


def which_books(frame):
    """Dict showing who read what book, with T/F values"""
    first_col_name = frame.columns[0]
    return frame.set_index(first_col_name).T.to_dict("list")


# TODO make these two fns vectorized as part of which_books()?


def person(name_raw):
    """Take away number from name, if present"""
    return name_raw.split("-")[0]


def books(books_raw):
    """Generate array of book indices from raw true/false array"""
    return [b for b, book in enumerate(books_raw) if book]


def main():
    """Main function."""
    who = read_csv("who.csv")

    # There are two chunks that need to be appended together
    # The second is shorter and requires notna() checking
    first = which_books(who.iloc[:, :11])
    second = which_books(who.iloc[:, 12:][who.iloc[:, 12].notna()])
    people_raw = first | second

    people = {
        person(person_raw): books(books_raw)
        for person_raw, books_raw in people_raw.items()
    }

    # Assign people into teams
    with open("teams.json", "r", encoding="utf-8") as teams_file:
        txt = teams_file.read()
        teams = loads(txt)

    teams_with_books = [[], []]

    for t in range(2):
        for name in teams[t]:
            teams_with_books[t].append({"name": name, "books": people[name]})

    # Send the output to the front end
    with open(
        "../src/data/who-read-what.json",
        "w",
        encoding="utf-8",
    ) as who_file:
        dump(teams_with_books, who_file)


if __name__ == "__main__":
    main()
