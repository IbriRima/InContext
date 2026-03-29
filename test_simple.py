#!/usr/bin/env python3
"""
Simple test for YouTube download functionality
"""

import requests
import json


def test_simple_transcription():
    """Test with a very short video"""

    # Use a very short, simple video
    test_url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"  # "Me at the zoo" - first YouTube video

    print("Testing simple transcription...")
    print(f"URL: {test_url}")

    try:
        response = requests.post(
            "http://localhost:8000/transcribe",
            json={"url": test_url},
            timeout=60,  # 1 minute timeout
        )

        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    test_simple_transcription()
