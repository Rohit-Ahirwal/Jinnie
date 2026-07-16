import json

def sse(data: dict):
    return f"data: {json.dumps(data)}\n\n"