from pandas import read_csv
from json import dumps

teams = (
    (
        "Snowplow",
        "Aardvark",
        "Windowsill",
    ),
    (
        "Noone",
        "Someone",
        "Spinach",
    )
)

who = read_csv("who.csv")  # This doesn't exist in the demo
people = {}

for i in range(27):
    name_one_block = who.iloc[i, 0]
    name_one = name_one_block.split("-")[0]
    books_one = [i for i, item in enumerate(who.iloc[i, 1:11]) if item]
    
    if len(books_one) > 0:
        people[name_one] = books_one

    name_two_block = who.iloc[i, 12]
    if name_two_block == name_two_block:
        name_two = name_two_block.split("-")[0]
        books_two = [i for i, item in enumerate(who.iloc[i, 13:23]) if item]
        
        if len(books_two) > 0:
            people[name_two] = books_two

teams_with_books = [[], []]

for t in range(2):
    for name in teams[t]:
        teams_with_books[t].append({
            "name": name,
            "books": people[name]
        })

print(dumps(teams_with_books))

