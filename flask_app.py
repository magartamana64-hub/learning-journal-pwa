

from flask import Flask, request, jsonify, render_template
import json
import os
from datetime import datetime

# Create Flask app
app = Flask(__name__)

# Base directory of project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Correct path: /backend/reflections.json
DATA_FILE = os.path.join(BASE_DIR, "backend", "reflections.json")

# -----------------------------------------------------
# Helper Functions
# -----------------------------------------------------

def load_reflections():
    """Load reflections from JSON file."""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []


def save_reflections(reflections):
    """Save reflections list back to JSON file."""
    # Ensure backend folder exists
    backend_dir = os.path.join(BASE_DIR, "backend")
    if not os.path.exists(backend_dir):
        os.makedirs(backend_dir)

    with open(DATA_FILE, "w") as f:
        json.dump(reflections, f, indent=4)

# -----------------------------------------------------
# Routes
# -----------------------------------------------------

@app.route("/")
def index():
    """Serve main page."""
    return render_template("index.html")


# ---------------- GET ALL REFLECTIONS ----------------
@app.route("/reflections", methods=["GET"])
def get_reflections():
    reflections = load_reflections()
    return jsonify(reflections)


# ---------------- ADD NEW REFLECTION ----------------
@app.route("/add_reflection", methods=["POST"])
def add_reflection():
    data = request.get_json()

    new_entry = {
        "title": data.get("title"),
        "reflection": data.get("reflection"),
        "date": datetime.now().strftime("%Y-%m-%d %H:%M")
    }

    reflections = load_reflections()
    reflections.append(new_entry)
    save_reflections(reflections)

    return jsonify(new_entry), 201


# --------------- OPTIONAL DELETE ROUTE ---------------
@app.route("/delete/<int:index>", methods=["DELETE"])
def delete_reflection(index):
    reflections = load_reflections()

    if 0 <= index < len(reflections):
        reflections.pop(index)
        save_reflections(reflections)
        return jsonify({"message": "Deleted"}), 200

    return jsonify({"error": "Invalid index"}), 404



if __name__ == "__main__":
    app.run(debug=True)
