#!/usr/bin/env python3

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ai_server import extract_audio_with_ytdlp, transcribe_audio, clean_youtube_url
from utils.logger import logger


def test_audio_extraction():
    url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    logger.info(f"Testing audio extraction for: {url}")

    # Clean URL
    clean_url = clean_youtube_url(url)
    logger.info(f"Clean URL: {clean_url}")

    # Extract audio
    audio_path = extract_audio_with_ytdlp(clean_url)

    if audio_path and os.path.exists(audio_path):
        logger.info(f"Audio extracted successfully: {audio_path}")
        logger.info(f"File size: {os.path.getsize(audio_path)} bytes")

        # Test transcription
        try:
            transcription = transcribe_audio(audio_path)
            logger.info(f"Transcription: {transcription}")

            # Clean up
            os.remove(audio_path)
            logger.info("Audio file cleaned up")

        except Exception:
            logger.exception("Transcription failed")
    else:
        logger.error("Audio extraction failed")


if __name__ == "__main__":
    test_audio_extraction()
