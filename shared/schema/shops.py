from enum import Enum


class Shop(str, Enum):
    METZGEREI = "Metzgerei"
    BÄCKEREI = "Bäckerei"
    APOTHEKE = "Apotheke"
    BLUMENLADEN = "Blumenladen"
    CAFE = "Café"
