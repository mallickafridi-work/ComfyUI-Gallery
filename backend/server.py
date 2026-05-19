# server/gallery_server.py
import os
from flask import Flask, request, send_file, jsonify

app = Flask(__name__)

# Recursive function to build folder tree
def get_folder_tree(folder_path):
    node = {
        "name": os.path.basename(folder_path),
        "path": folder_path,
        "children": []
    }

    try:
        items = os.scandir(folder_path)
    except Exception as e:
        print("Error reading folder:", folder_path, str(e))
        return node

    for item in items:
        if item.is_dir():
            sub_path = os.path.join(folder_path, item.name)
            child_node = get_folder_tree(sub_path)
            node["children"].append(child_node)

    return node

@app.route("/api/load-path", methods=["POST"])
def load_path():
    data = request.get_json()
    folder_path = data.get("path")
    normalized = os.path.abspath(folder_path)

    try:
        tree = get_folder_tree(normalized)
        return jsonify({"status": "ok", "path": normalized, "tree": tree})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/api/load-images", methods=["POST"])
def load_images():
    data = request.get_json()
    folder_path = data.get("path")
    normalized = os.path.normpath(folder_path)

    try:
        items = os.scandir(normalized)
        images = []
        for item in items:
            if item.is_file():
                name = item.name
                if name.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp")):
                    images.append({
                        "name": name,
                        "url": f"/api/image?folder={normalized}&file={name}"
                    })
        return jsonify({"status": "ok", "images": images})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/api/image")
def serve_image():
    folder = request.args.get("folder")
    file = request.args.get("file")
    file_path = os.path.join(folder, file)
    return send_file(file_path)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
