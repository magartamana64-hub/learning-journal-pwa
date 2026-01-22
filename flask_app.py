from flask import Flask, request, jsonify, render_template
import json
import os
from datetime import datetime

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "backend", "reflections.json")


def load_reflections():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []


def save_reflections(reflections):
    backend_dir = os.path.join(BASE_DIR, "backend")
    if not os.path.exists(backend_dir):
        os.makedirs(backend_dir)
    with open(DATA_FILE, "w") as f:
        json.dump(reflections, f, indent=4)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/reflections")
def reflections_page():
    return render_template("journal.html")


@app.route("/api/reflections", methods=["GET"])
def api_get_reflections():
    reflections = load_reflections()
    return jsonify(reflections)


@app.route("/api/add_reflection", methods=["POST"])
def api_add_reflection():
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


@app.route("/api/delete/<int:index>", methods=["DELETE"])
def api_delete_reflection(index):
    reflections = load_reflections()
    if 0 <= index < len(reflections):
        reflections.pop(index)
        save_reflections(reflections)
        return jsonify({"message": "Deleted"}), 200
    return jsonify({"error": "Invalid index"}), 404

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


if __name__ == "__main__":
    app.run(debug=True)
