#!/usr/bin/env python3
"""
Test script for YouTube transcription functionality
"""

import requests


def test_transcription():
    """Test the transcription endpoint"""

    test_url = "https://www.youtube.com/watch?v=9bZkp7q19f0"

    print("Testing YouTube transcription...")
    print(f"URL: {test_url}")

    try:
        response = requests.post(
            "http://localhost:8000/transcribe",
            json={"url": test_url},
            timeout=300,  # 5 minutes timeout
        )

        if response.status_code == 200:
            result = response.json()
            print("✅ Transcription successful!")
            print(f"Title: {result['title']}")
            print(f"Transcription length: {len(result['transcription'])} characters")
            print(f"First 200 chars: {result['transcription'][:200]}...")
        else:
            print(f"❌ Transcription failed with status {response.status_code}")
            print(f"Error: {response.text}")

    except Exception as e:
        print(f"❌ Test failed: {e}")


def test_health():
    """Test the health endpoint"""

    try:
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False


def test_url_validation():
    """Test URL validation"""

    test_urls = [
        "https://www.youtube.com/watch?v=9bZkp7q19f0",
        "https://youtu.be/9bZkp7q19f0",
        "https://youtube.com/watch?v=9bZkp7q19f0",
        "https://www.youtube.com/watch?v=9bZkp7q19f0&feature=shared",
    ]

    print("\nTesting URL validation...")
    for url in test_urls:
        try:
            response = requests.post(
                "http://localhost:8000/transcribe",
                json={"url": url},
                timeout=10,  # Short timeout for validation test
            )
            if response.status_code == 200:
                print(f"✅ {url} - Valid")
            else:
                print(f"❌ {url} - Invalid: {response.status_code}")
        except Exception as e:
            print(f"❌ {url} - Error: {e}")


if __name__ == "__main__":
    print("🧪 Testing YouTube Transcription Server")
    print("=" * 50)

    # Test health first
    if test_health():
        print("\n" + "=" * 50)
        test_transcription()
        print("\n" + "=" * 50)
        test_url_validation()
    else:
        print("❌ Server is not running. Please start the server first.")
        print("Run: source venv/bin/activate && python ai_server.py")
