from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Setup Hugging Face Client
HF_TOKEN = os.getenv("HUGGING_FACE_TOKEN")
if not HF_TOKEN:
    raise ValueError("Missing HUGGING_FACE_TOKEN environment variable")

client = InferenceClient(
    provider="hf-inference",
    api_key=HF_TOKEN,
)

MODEL_ID = "meta-llama/Llama-3.2-11B-Vision-Instruct"


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})


@app.route("/chat", methods=["POST"])
def chat():
    print("Chat endpoint called")

    try:
        data = request.get_json()
        messages = data.get("messages", [])
        print(f"Messages: {messages}")
        if not messages:
            return jsonify({"error": "No messages provided"}), 400

        system_prompt = {
            "role": "system",
            "content": "You are a friendly German language tutor. Respond in simple, helpful German sentences. Each answer should be in English the translate it to German and return bot english and german answers",
        }
        messages.insert(0, system_prompt)

        completion = client.chat.completions.create(model=MODEL_ID, messages=messages)

        reply = completion.choices[0].message.content
        return jsonify({"response": reply})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)
