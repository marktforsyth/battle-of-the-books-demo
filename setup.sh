#!/bin/bash
cd parsing
python3 questions.py
echo Parsed questions and books

python3 who.py
echo Parsed people and teams
cd ..

yarn || npm i
