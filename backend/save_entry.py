import json
from datetime import datetime

FILE_PATH = "reflections.json"

def load_reflections():
    try:
        with open(FILE_PATH, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_reflections(data):
    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)

# Ask the user for input
title = input("Entry Title: ")
reflection = input("Write your reflection: ")

# Create a new entry
new_entry = {
    "title": title,
    "reflection": reflection,
    "date": datetime.now().strftime("%Y-%m-%d %H:%M")
}


data = load_reflections()
data.append(new_entry)
save_reflections(data)

print("Reflection saved!")
