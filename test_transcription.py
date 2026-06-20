import requests
from utils.logger import logger

def test_transcription():
    """Test the transcription endpoint"""

    test_url = "https://www.youtube.com/watch?v=9bZkp7q19f0"

    logger.info("Testing YouTube transcription...")
    logger.info(f"URL: {test_url}")

    try:
        response = requests.post(
            "http://localhost:8000/transcribe",
            json={"url": test_url},
            timeout=300,  # 5 minutes timeout
        )

        if response.status_code == 200:
            result = response.json()
            logger.info("✅ Transcription successful!")
            logger.info(f"Title: {result['title']}")
            logger.info(f"Transcription length: {len(result['transcription'])} characters")
            logger.info(f"First 200 chars: {result['transcription'][:200]}...")
        else:
            logger.error(f"❌ Transcription failed with status {response.status_code}")
            logger.error(f"Error: {response.text}")

    except Exception:
        logger.exception("❌ Test failed")


def test_health():
    """Test the health endpoint"""

    try:
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            logger.info("✅ Health check passed")
            return True
        else:
            logger.error(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception:
        logger.exception("❌ Health check failed")
        return False


def test_url_validation():
    """Test URL validation"""

    test_urls = [
        "https://www.youtube.com/watch?v=9bZkp7q19f0",
        "https://youtu.be/9bZkp7q19f0",
        "https://youtube.com/watch?v=9bZkp7q19f0",
        "https://www.youtube.com/watch?v=9bZkp7q19f0&feature=shared",
    ]

    logger.info("\nTesting URL validation...")
    for url in test_urls:
        try:
            response = requests.post(
                "http://localhost:8000/transcribe",
                json={"url": url},
                timeout=10,  # Short timeout for validation test
            )
            if response.status_code == 200:
                logger.info(f"✅ {url} - Valid")
            else:
                logger.warning(f"❌ {url} - Invalid: {response.status_code}")
        except Exception:
            logger.exception(f"❌ {url} - Error")


if __name__ == "__main__":
    logger.info("🧪 Testing YouTube Transcription Server")
    logger.info("=" * 50)

    # Test health first
    if test_health():
        logger.info("\n" + "=" * 50)
        test_transcription()
        logger.info("\n" + "=" * 50)
        test_url_validation()
    else:
        logger.error("❌ Server is not running. Please start the server first.")
        logger.info("Run: source venv/bin/activate && python ai_server.py")
