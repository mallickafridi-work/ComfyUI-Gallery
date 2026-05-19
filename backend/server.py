import os
import server  # type: ignore
from aiohttp import web # type: ignore

print("🔥 comfyui_gallery backend loaded")

def get_folder_tree(folder_path):
    node = {"name": os.path.basename(folder_path), "path": folder_path, "children": []}
    try:
        for item in os.scandir(folder_path):
            if item.is_dir():
                node["children"].append(get_folder_tree(os.path.join(folder_path, item.name)))
    except Exception as e:
        print("Error:", e)
    return node


@server.PromptServer.instance.routes.post("/api/load-path")
async def load_path(request):
    data = await request.json()
    folder_path = data.get("path")

    normalized = os.path.abspath(folder_path)
    tree = get_folder_tree(normalized)

    return web.json_response({
        "status": "ok",
        "path": normalized,
        "tree": tree
    })


@server.PromptServer.instance.routes.post("/api/load-images")
async def load_images(request):
    data = await request.json()
    folder_path = data.get("path")

    normalized = os.path.normpath(folder_path)
    images = []

    try:
        for item in os.scandir(normalized):
            if item.is_file():
                name = item.name

                if name.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp")):
                    images.append({
                        "name": name,
                        "url": f"/api/image?folder={normalized}&file={name}"
                    })

    except Exception as e:
        return web.json_response({
            "status": "error",
            "message": str(e)
        })

    return web.json_response({
        "status": "ok",
        "images": images
    })


@server.PromptServer.instance.routes.get("/api/image")
async def serve_image(request):
    folder = request.query.get("folder")
    file = request.query.get("file")

    file_path = os.path.join(folder, file)

    if not os.path.exists(file_path):
        return web.json_response({"error": "file not found", "path": file_path})

    return web.FileResponse(file_path)