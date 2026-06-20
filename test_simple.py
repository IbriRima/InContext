import requests
from utils.logger import logger


def test_simple_transcription():
    """Test with a very short video"""

    # Use a very short, simple video
    test_url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"  # "Me at the zoo" - first YouTube video

    logger.info("Testing simple transcription...")
    logger.info(f"URL: {test_url}")

    try:
        response = requests.post(
            "http://localhost:8000/transcribe",
            json={"url": test_url},
            timeout=60,  # 1 minute timeout
        )

        logger.info(f"Status: {response.status_code}")
        logger.info(f"Response: {response.text}")

    except Exception:
        logger.exception("Error while testing simple transcription")


if __name__ == "__main__":
    test_simple_transcription()
