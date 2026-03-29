from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
import time
import subprocess
import tempfile
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import logging
from shared.schema.shops import Shop
from utils.video_utils import extract_video_id, clean_youtube_url, get_video_info
import whisper


logger = logging.getLogger("main_logger")

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

import requests
import os

def call_mistral(messages):
    response = requests.post(
        "https://api.mistral.ai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {os.getenv('MISTRAL_API_KEY')}",
            "Content-Type": "application/json",
        },
        json={
            "model": "mistral-small-latest",
            "messages": messages,
            "max_tokens": 200,
            "temperature": 0.3,
        },
        timeout=30,
    )

    if not response.ok:
        raise Exception(f"Mistral error: {response.text}")

    data = response.json()
    return data["choices"][0]["message"]["content"]

# Initialize Whisper model
whisper_model = None


def get_whisper_model():
    global whisper_model
    if whisper_model is None:
        logger.debug("Loading Whisper model...")
        whisper_model = whisper.load_model("small")
        logger.debug("Whisper model loaded successfully")
    return whisper_model



def transcribe_audio(audio_path):
    """Transcribe audio using Whisper"""
    try:
        start = time.time()

        model = get_whisper_model()
        result = model.transcribe(audio_path)

        # Extract text from segments
        text = " ".join([item["text"] for item in result["segments"]])

        logger.info(f"Transcribed in {time.time() - start:.2f}s")
        return text

    except Exception as e:
        logger.error(f"Transcription failed: {e}")
        raise

def extract_audio_with_ytdlp(url):
    """Extract audio directly using yt-dlp without downloading video"""
    try:
        logger.debug(f"[INFO] Extracting audio from {url}")
        start = time.time()

        # Create temporary file for audio
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp_file:
            temp_audio_path = tmp_file.name

        # Use yt-dlp to extract audio only with better error handling
        cmd = [
            "yt-dlp",
            "--extract-audio",
            "--audio-format",
            "mp3",
            "--audio-quality",
            "0",
            "--no-playlist",
            "--no-warnings",
            "--quiet",
            "--no-check-certificates",
            "--force-ipv4",
            "-o",
            temp_audio_path,
            url,
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

        if result.returncode == 0:
            logger.info(f"Audio extracted successfully in {time.time() - start:.2f}s")
            return temp_audio_path
        else:
            logger.error(f"yt-dlp failed: {result.stderr}")

            # Try alternative approach with different format
            logger.debug("Trying alternative approach...")
            cmd_alt = [
                "yt-dlp",
                "--extract-audio",
                "--audio-format",
                "wav",
                "--audio-quality",
                "0",
                "--no-playlist",
                "--no-warnings",
                "--quiet",
                "--no-check-certificates",
                "--force-ipv4",
                "-o",
                temp_audio_path.replace(".mp3", ".wav"),
                url,
            ]

            result_alt = subprocess.run(cmd_alt, capture_output=True, text=True, timeout=300)

            if result_alt.returncode == 0:
                alt_path = temp_audio_path.replace(".mp3", ".wav")
                logger.info(f"[INFO] Audio extracted with alternative method: {alt_path}")
                return alt_path
            else:
                logger.error(f" Alternative method also failed: {result_alt.stderr}")
                return None

    except Exception as e:
        logger.error(f"Audio extraction failed: {e}")
        return None






@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"})


@app.route("/chat", methods=["POST"])
def chat():
    logger.debug("Chat endpoint called")

    try:
        data = request.get_json()
        messages = data.get("messages", [])
        logger.debug(f"Messages: {messages}")
        if not messages:
            return jsonify({"error": "No messages provided"}), 400

        # Get the last user message and current shop context
        user_messages = [msg for msg in messages if msg["role"] == "user"]
        if not user_messages:
            return jsonify({"error": "No user messages found"}), 400

        last_user_message = user_messages[-1]["content"]

        # Get shop type from first assistant message
        shop_context = ""
        for msg in messages:
            if msg["role"] == "assistant" and "Willkommen" in msg["content"]:
                if Shop.METZGEREI.value in msg["content"]:
                    shop_context = "butcher shop (Metzgerei) selling meat and sausages"
                elif Shop.BÄCKEREI.value in msg["content"]:
                    shop_context = "bakery (Bäckerei) selling bread and pastries"
                elif Shop.CAFE.value in msg["content"]:
                    shop_context = "café (Café) serving coffee and cakes"
                elif Shop.APOTHEKE.value in msg["content"]:
                    shop_context = "pharmacy (Apotheke) selling medicines"
                elif Shop.BLUMENLADEN.value in msg["content"]:
                    shop_context = "flower shop (Blumenladen) selling flowers"
                break

        logger.debug(f"Shop context: {shop_context}")
        logger.debug(f"Last user message: {last_user_message}")

        # Add the final prompt

      
        messages = [
            {
                "role": "system",
                "content": f"You are a shop assistant in a {shop_context}. Always respond in English and German."
            },
            {
                "role": "user",
                "content": f"""Provide ONE response in EXACTLY this format:

        English: ...
        German: ...

        Customer message: {last_user_message}
        """
            }
        ]
        
        response_text = call_mistral(messages)

        logger.debug(f"Model response: {response_text}")

        return jsonify({"response": response_text})
    except Exception as e:
        logger.debug(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/transcribe", methods=["POST"])
def transcribe():
    """Real transcription endpoint using Whisper with direct audio extraction"""
    logger.debug("Transcribe endpoint called")

    try:
        data = request.get_json()
        youtube_url = data.get("url")

        if not youtube_url:
            return jsonify({"error": "No YouTube URL provided"}), 400

        # Validate YouTube URL
        if not extract_video_id(youtube_url):
            return jsonify({"error": "Invalid YouTube URL"}), 400

        # Clean URL
        clean_url = clean_youtube_url(youtube_url)
        logger.debug(f"[INFO] Processing URL: {clean_url}")

        # Get video title
        video_title = get_video_info(clean_url)

        # Extract audio directly (no video download)
        audio_path = extract_audio_with_ytdlp(clean_url)

        if not audio_path or not os.path.exists(audio_path):
            raise ValueError("Failed to extract audio from video")

        # Transcribe audio with Whisper
        transcription = transcribe_audio(audio_path)

        # Clean up audio file
        try:
            os.remove(audio_path)
            logger.debug(f"[INFO] Deleted audio file: {audio_path}")
        except Exception as e:
            logger.debug(f"[WARNING] Failed to delete audio file: {e}")

        return jsonify(
            {
                "success": True,
                "title": video_title,
                "transcription": transcription,
                "url": youtube_url,
            }
        )

    except Exception as e:
        logger.debug(f"Transcription error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/transcribe-mock", methods=["POST"])
def transcribe_mock():
    """Mock transcription endpoint for testing"""
    logger.debug("Mock transcribe endpoint called")

    try:
        data = request.get_json()
        youtube_url = data.get("url")

        if not youtube_url:
            return jsonify({"error": "No YouTube URL provided"}), 400

        # Validate YouTube URL
        if not extract_video_id(youtube_url):
            return jsonify({"error": "Invalid YouTube URL"}), 400

        # For now, return a mock transcription for testing
        video_id = extract_video_id(youtube_url)

        # Simulate processing time
        time.sleep(2)

        mock_transcription = f"""
        This is a mock transcription for video {video_id}.

        The YouTube transcription feature is currently being tested.
        This would normally contain the actual transcribed text from the video.

        In a real implementation, this would be the actual audio transcription
        generated by the Whisper AI model after downloading and processing the video.

        The video URL was: {youtube_url}
        """

        return jsonify(
            {
                "success": True,
                "title": f"Mock Video {video_id}",
                "transcription": mock_transcription.strip(),
                "url": youtube_url,
            }
        )

    except Exception as e:
        logger.debug(f"Transcription error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)
