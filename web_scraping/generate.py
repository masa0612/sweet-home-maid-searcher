#!/usr/bin/env python3
import scraping
import add_info
import json
OUTPUT_FILE = "../data/characters.json"

#print(get_cards("【朝一の悦び】彩葉"))
#exit()
cards = scraping.get_cards()
add_info.add_soon_flag(cards)
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)
