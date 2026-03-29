import re
import subprocess
import logging

logger = logging.getLogger("main_logger")   

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



def get_video_info(url):
    """Get video information using yt-dlp"""
    try:
        cmd = [
            "yt-dlp",
            "--logger.debug",
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
            logger.warning(f"Could not get video title: {result.stderr}")
            return "Unknown Title"

    except Exception as e:
        logger.warning(f"Could not get video info: {e}")
        return "Unknown Title"
