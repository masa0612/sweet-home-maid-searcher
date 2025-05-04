#!/usr/bin/env python3
import re
import sys
import json
import requests
from bs4 import BeautifulSoup

OUTPUT_FILE = "assets/characters.json"
WIKI = "https://sweethomemaid.wikiru.jp/"

COLOR_MAP = {
  "pc_red.png": "赤",
  "pc_blu.png": "青",
  "pc_grn.png": "緑",
  "pc_yel.png": "黄",
  "pc_aqa.png": "水",
  "pc_vio.png": "紫",
}

def get_cards():
    response = requests.get(WIKI+"?全キャラクター一覧")
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find(id="sortabletable1")
    rows = table.find("tbody").find_all("tr")
    cards = []
    for row in rows:
        cards.append(get_card_info(WIKI+row.find("a").get("href")))
    return cards

def get_card_info(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    ie5s = soup.find_all(class_="ie5")

    char_table = ie5s[5]
    status_table = ie5s[6]
    skill1_table = ie5s[7]
    skill2_table = ie5s[8]
    ability_tables = ie5s[9:]

    card = dict()
    rows = char_table.find_all("tr")
    card["name"] = soup.find("h1").find("a").get_text(strip=True)
    character = re.search(r'】(.+)', card["name"]).group(1)
    if "コラボ" in card["name"] or "ロイズ" in card["name"]:
        if "の特権" not in card["name"]:
            card["character"] = "その他"
    else:
        card["character"] = character
    card["series"] = get_series(card["name"])
    card["rarity"] = int(rows[1].find_all("td")[1].find("a").get_text(strip=True)[1])
    card["color"] = COLOR_MAP[rows[1].find("img").get("alt")]

    rows = skill1_table.find_all("tr")
    skill_name = rows[0].find("strong").get_text(strip=True)
    card["s_type"] = get_skill_type(skill_name)
    card["b_tag"] = get_skill_tag(skill_name)

    rows = skill2_table.find_all("tr")
    card["soon_flag"] = add_soon_flag(card["name"])
    card["ct"] = get_ct(soup.find(class_="tag").find_all("a"), card["name"])
    a_tag, k_tag, plus, multiplier = parse_ability(ability_tables)
    card.update({"a_tag": a_tag, "k_tag": k_tag, "plus": plus})

    status = get_status(status_table, multiplier)
    card["red"] = status[0]
    card["blue"] = status[1]
    card["green"] = status[2]
    card["yellow"] = status[3]
    card["aqua"] = status[4]
    card["violet"] = status[5]

    return card

def get_series(name):
    match = re.search(r'(【.*?】)', name)
    if "モフモフ" in match.group(1):
        return "【モフモフ】"
    if "ジューン" in match.group(1):
        return "【ジューンブライド】"
    if "耳かき" in match.group(1):
        return "【ASMR】"
    if "ズボラ" in match.group(1):
        return "【年はじめ】"
    if "クリスマス" in match.group(1):
        return "【クリスマス】"
    if "恐怖" in match.group(1):
        return "【ハロウィン】"
    if "パジャマ" in match.group(1):
        return "【パジャマパーティー】"
    return match.group(1)

def get_skill_type(s_name):
    if "クリエイト" in s_name:
        return "クリエイト"
    if "ファスト" in s_name:
        return "ファスト"
    if "セレクト" in s_name:
        return "セレクト"
    if "ピースチェンジ" == s_name:
        return "ピースチェンジ"
    if "ブレイク" in s_name:
        return "ピースブレイク"
    if "遠隔" in s_name:
        return "遠隔ピースチェンジ"
    if "シャッフル" in s_name:
        return "ピースシャッフル"
    if "カラーチェンジ" in s_name:
        return "カラーチェンジ"
    if "アップ" in s_name:
        return "スキルゲージアップ"
    if "ダウン" in s_name:
        return "スキルクールダウン1"

def get_skill_tag(s_name):
    s_tag = []
    if "ロケット" in s_name:
        s_tag.append("ロケット")
    if "ミサイル" in s_name:
        s_tag.append("ミサイル")
    if "ボム" in s_name:
        s_tag.append("ボム")
    if "スペシャル" in s_name:
        s_tag.append("スペシャル")
    if "ミックス" in s_name:
        s_tag.append("ミックス")
    if "WAY" in s_name:
        s_tag.append("ミックス")
    return s_tag

def add_soon_flag(name):
    target = [
      "【D.C.4コラボ】有里咲",
      "【夢見るバニータイム】ひまり子",
      "【とろけるバスタイム】ひまり子",
      "【夢見るバニータイム】スカーレット",
      "【夢見るバニータイム】凪",
      "【夢見るバニータイム】紬",
      "【夢見るバニータイム】彩葉",
      "【白衣の天使と白昼夢】花音",
      "【白衣の天使と白昼夢】凪",
      "【お家神社で新春初詣】紬",
      "【白衣の天使と白昼夢】紬",
      "【二人きりのささやき耳かき】紬",
      "【モフモフさん、いらっしゃい！】彩葉",
      "【恐怖のHorrorween Party】彩葉",
      "【チョコパラダイス】彩葉",
      "【満開！夜桜大宴会】花音",
      "【OFFの顔】彩葉",
      "【春の駅弁祭り】彩葉",
      "【満開！夜桜大宴会】紬",
      "【夢見るバニータイム】花音",
      "【二人きりのささやき耳かき】スカーレット",
      "【夢見る乙女のパジャマパーティー】花音",
    ]
    return name in target

def get_ct(anchors, name):
    ret = [x.text for x in anchors if "最小クールタイム" in x.text]
    if len(ret) == 0:
        print("Not exist ct tag:", name)
        return 3
    else:
        return int(ret[0][-1])

def get_status(table, multiplier):
    rows = table.find_all("tr")
    status_list = []
    for x in rows[2:]:
        cols = x.find_all("td")
        status_list.append(int(cols[2].get_text(strip=True).replace(",","")))
    max_value = max(status_list)
    return [int(x*multiplier) if x == max_value else x for x in status_list]

def parse_ability(ability_tables):
    killer_target = ["キラー","サポート","なつき"]

    multiple = int()
    a_tag = list()
    p_tag = list()
    k_tag = list()
    for a_table in ability_tables:
        ability = a_table.find_all("th")[1].text
        if "デッキスコア" in ability: continue
        if ability == "スキルクールタイム1減少": continue
        if re.fullmatch(r"スキルコスト\d+減少", ability): continue

        if "カードスコア" in ability:
            match = re.search(r'(\d+)', ability)
            multiple += int(match.group(1) if match else None)
        elif any(x in ability for x in killer_target):
            k,p= get_killer_tag(ability)
            k_tag.append(k)
            p_tag = p_tag + p
        else:
            a_tag.append(get_ability_tag(ability))

    return a_tag,list(set(k_tag)),list(set(p_tag)),float(multiple/100)+1.02

def get_ability_tag(ability):
    if "初期" in ability:
        if "ペア" in ability:
            return "ペアルック初期スキルゲージ増加"
        elif "シミラー" in ability:
            return "シミラー初期スキルゲージ増加"
        else:
            return "初期スキルゲージ増加"
    if "時スキルゲージ" in ability:
        return "他カードスキル使用時スキルゲージ増加"
    if "時スキルクール" in ability:
        return "他カードスキル使用時スキルクールタイム減少"
    if "アクセントカラー" in ability:
        return "アクセントカラー"
    if "手数" in ability:
        return ability.replace("＋", "+")
    if "リバウンド" in ability:
        return "リバウンドスキルコスト"
    if "ダイエット" in ability:
        return "ダイエットスキルコスト"
    if "リンケージス" in ability:
        return "リンケージスキルコスト減少"
    if "ペア" in ability and "減少" in ability:
        return "ペアルックスキルコスト減少"
    if "シミラー" in ability and "減少" in ability:
        return "シミラースキルコスト減少"
    if "リンケージオ" in ability:
        return "リンケージオールスコアアップ"
    if "貫通" in ability:
        return "ピーナッツ貫通ロケット"

def get_killer_tag(ability):
    plus_tag = list()
    match = re.search(r"(.+?)[＋+](\d+)[（(](.+?)[）)]", ability)
    k_tag = match.group(1)
    plus = match.group(2)
    booster = match.group(3)
    plus_tag.append("+"+plus)
    if booster == "全ブースター":
        plus_tag.append("ロケット+"+plus)
        plus_tag.append("ミサイル+"+plus)
        plus_tag.append("ボム+"+plus)
    else:
        plus_tag.append(booster+"+"+plus)
    return k_tag,plus_tag

if __name__ == "__main__":
    if len(sys.argv) > 1:
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            cards = json.load(f)
        card = get_card_info(sys.argv[1])
        if card["name"] in [x["name"] for x in cards]:
            print(cards[[x["name"] for x in cards].index(card["name"])])
        else:
            cards.append(card)
    else:
        cards = get_cards()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(cards, f, indent=2, ensure_ascii=False)
