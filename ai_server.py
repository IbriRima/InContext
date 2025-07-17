from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
import json
import time
import subprocess
import tempfile
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import whisper

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Setup Hugging Face Client
HF_TOKEN = os.getenv("HUGGING_FACE_TOKEN")
if not HF_TOKEN:
    raise ValueError("Missing HUGGING_FACE_TOKEN environment variable")

MODEL_ID = "meta-llama/Llama-3.2-11B-Vision-Instruct"

# Initialize the client with the correct API
client = InferenceClient(
    model=MODEL_ID,
    token=HF_TOKEN,
)

# Initialize Whisper model
whisper_model = None


def get_whisper_model():
    global whisper_model
    if whisper_model is None:
        print("Loading Whisper model...")
        whisper_model = whisper.load_model("small")
        print("Whisper model loaded successfully")
    return whisper_model


def extract_video_id(url):
    """Extract video ID from various YouTube URL formats"""
    patterns = [
        r"(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w\-]{11})",
        r"(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/([\w\-]{11})",
        r"(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/watch\?v=([\w\-]{11})",
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def clean_youtube_url(url):
    """Clean and normalize YouTube URL"""
    # Remove any extra parameters and normalize
    if "youtu.be" in url:
        # Convert youtu.be to youtube.com format
        video_id = extract_video_id(url)
        if video_id:
            return f"https://www.youtube.com/watch?v={video_id}"

    # For youtube.com URLs, ensure we have the video ID
    video_id = extract_video_id(url)
    if video_id:
        return f"https://www.youtube.com/watch?v={video_id}"

    return url


def extract_audio_with_ytdlp(url):
    """Extract audio directly using yt-dlp without downloading video"""
    try:
        print(f"[INFO] Extracting audio from {url}")
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

        print(f"[INFO] Running command: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)

        if result.returncode == 0:
            print(f"[INFO] Audio extracted successfully in {time.time() - start:.2f}s")
            return temp_audio_path
        else:
            print(f"[ERROR] yt-dlp failed: {result.stderr}")

            # Try alternative approach with different format
            print("[INFO] Trying alternative approach...")
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

            result_alt = subprocess.run(
                cmd_alt, capture_output=True, text=True, timeout=300
            )

            if result_alt.returncode == 0:
                alt_path = temp_audio_path.replace(".mp3", ".wav")
                print(f"[INFO] Audio extracted with alternative method: {alt_path}")
                return alt_path
            else:
                print(f"[ERROR] Alternative method also failed: {result_alt.stderr}")
                return None

    except Exception as e:
        print(f"[ERROR] Audio extraction failed: {e}")
        return None


def get_video_info(url):
    """Get video information using yt-dlp"""
    try:
        cmd = [
            "yt-dlp",
            "--print",
            "title",
            "--no-playlist",
            "--no-warnings",
            "--quiet",
            url,
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode == 0:
            title = result.stdout.strip()
            return title
        else:
            print(f"[WARNING] Could not get video title: {result.stderr}")
            return "Unknown Title"

    except Exception as e:
        print(f"[WARNING] Could not get video info: {e}")
        return "Unknown Title"


def transcribe_audio(audio_path):
    """Transcribe audio using Whisper"""
    try:
        print(f"[INFO] Transcribing audio: {audio_path}")
        start = time.time()

        model = get_whisper_model()
        result = model.transcribe(audio_path)

        # Extract text from segments
        text = " ".join([item["text"] for item in result["segments"]])

        print(f"[INFO] Transcribed in {time.time() - start:.2f}s")
        return text

    except Exception as e:
        print(f"[ERROR] Transcription failed: {e}")
        raise


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

        # For now, return a simple response since the chat API is complex
        reply = "I'm a German tutor! How can I help you learn German today?"
        return jsonify({"response": reply})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/transcribe", methods=["POST"])
def transcribe():
    """Real transcription endpoint using Whisper with direct audio extraction"""
    print("Transcribe endpoint called")

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
        print(f"[INFO] Processing URL: {clean_url}")

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
            print(f"[INFO] Deleted audio file: {audio_path}")
        except Exception as e:
            print(f"[WARNING] Failed to delete audio file: {e}")

        return jsonify(
            {
                "success": True,
                "title": video_title,
                "transcription": transcription,
                "url": youtube_url,
            }
        )

    except Exception as e:
        print(f"Transcription error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/transcribe-mock", methods=["POST"])
def transcribe_mock():
    """Mock transcription endpoint for testing"""
    print("Mock transcribe endpoint called")

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
        print(f"Transcription error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)
