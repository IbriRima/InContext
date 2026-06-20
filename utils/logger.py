import logging
import sys

RESET = "\033[0m"
COLORS = {
    "DEBUG": "\033[34m",   # blue
    "INFO": "\033[32m",    # green
    "WARNING": "\033[33m", # yellow
    "ERROR": "\033[31m",   # red
    "CRITICAL": "\033[35m",# magenta
}


class ColoredFormatter(logging.Formatter):
    """Formatter that adds color codes to the log level name."""

    def format(self, record):
        original_levelname = record.levelname
        color = COLORS.get(original_levelname, "")
        if color:
            record.levelname = f"{color}{original_levelname}{RESET}"
        try:
            return super().format(record)
        finally:
            record.levelname = original_levelname


logger = logging.getLogger("main_logger")
logger.setLevel(logging.DEBUG)

if not logger.handlers:
    handler = logging.StreamHandler(stream=sys.stdout)
    handler.setLevel(logging.DEBUG)
    handler.setFormatter(
        ColoredFormatter(
            "%(asctime)s %(levelname)s %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
    )
    logger.addHandler(handler)
    logger.propagate = False
