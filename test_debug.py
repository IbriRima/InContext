#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ai_server import extract_audio_with_ytdlp, transcribe_audio, clean_youtube_url


def test_audio_extraction():
    url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    print(f"Testing audio extraction for: {url}")

    # Clean URL
    clean_url = clean_youtube_url(url)
    print(f"Clean URL: {clean_url}")

    # Extract audio
    audio_path = extract_audio_with_ytdlp(clean_url)

    if audio_path and os.path.exists(audio_path):
        print(f"Audio extracted successfully: {audio_path}")
        print(f"File size: {os.path.getsize(audio_path)} bytes")

        # Test transcription
        try:
            transcription = transcribe_audio(audio_path)
            print(f"Transcription: {transcription}")

            # Clean up
            os.remove(audio_path)
            print("Audio file cleaned up")

        except Exception as e:
            print(f"Transcription failed: {e}")
    else:
        print("Audio extraction failed")


if __name__ == "__main__":
    test_audio_extraction()
