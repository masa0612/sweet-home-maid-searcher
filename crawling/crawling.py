#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import re

BASE = "https://sweethomemaid.wikiru.jp/"
ALL = "https://sweethomemaid.wikiru.jp/?全キャラクター一覧"
OUTPUT_FILE = "../data/characters.json"

def get_cards(filter_=None):
    response = requests.get(ALL)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find(id="sortabletable1")
    rows = [x.find_all("td") for x in table.find("tbody").find_all("tr")]

    if filter_:
        for x in rows:
            if filter_ == x[1].find("a").text:
                break
        rows = [x]

    cards = []
    for row in rows:
        card = {}
        card["icon"] = BASE+row[0].find("img")["data-src"]
        card["character"] = row[0].text
        name = row[1].find("a")
        card["name"] = name.text
        card["url"] = BASE+name["href"]
        if "コラボ" in name.text or "ロイズ" in name.text:
            if "の特権" not in name.text:
                card["character"] = "その他"
        card["series"] = get_series(card["name"])
        card["rarity"] = int(row[2].get_text(strip=True)[1])
        card["color"] = row[3].text

        skill = row[4].find("img")
        card["s_name"] = skill["title"]
        card["s_img"] = BASE+skill["data-src"]
        card["s_type"] = get_skill_type(card["s_name"])
        card["booster_tag"] = get_skill_tag(card["s_name"])
        card["cost"] = row[5].text
        card["ct"] = row[6].text
        card["red"] = int(row[11].text)
        card["blue"] = int(row[12].text)
        card["green"] = int(row[13].text)
        card["yellow"] = int(row[14].text)
        card["aqua"] = int(row[15].text)
        card["violet"] = int(row[16].text)

        for i in range(7,11):
            ability = row[i].find("img")
            if ability is None: break
            card[f"a{i-6}"] = ability["title"]
            card[f"a{i-6}_img"] = BASE+ability["data-src"]
        #tags = get_tags(card["url"])
        card["a_tag"] = get_ability_tag(card)
        card["k_tag"], card["k_booster"]= get_killer_tag(card)

        cards.append(card)

    return cards

def get_series(name):
    match = re.search(r'【(.*?)】', name)
    return match.group(1)

def get_killer_tag(card):
    k_tag = set()
    k_booster = list()
    for i in range(1,5):
        ability = card.get(f"a{i}")
        if ability is None: break
        if "手数" in ability: continue

        if "キラー" in ability:
            match = re.search(r"(.+?)キラー[＋+](\d+)[（(](.+?)[）)]", ability)
            k_tag.add(match.group(1))
            if match.group(3) == "全ブースター":
                k_booster.append("ロケット+"+match.group(2))
                k_booster.append("ミサイル+"+match.group(2))
                k_booster.append("ボム+"+match.group(2))
            else:
                k_booster.append(match.group(3)+"+"+match.group(2))

        if "サポート" in ability:
            match = re.search(r"プリティタン人形サポート[＋+](\d+)[（(](.+?)[）)]", ability)
            k_tag.add("プリティタン")
            if match.group(2) == "全ブースター":
                k_booster.append("ロケット+"+match.group(1))
                k_booster.append("ミサイル+"+match.group(1))
                k_booster.append("ボム+"+match.group(1))
            else:
                k_booster.append(match.group(2)+"+"+match.group(1))

        if "なつき" in ability:
            match = re.search(r"箱入り猫なつき度[＋+](\d+)[（(](.+?)[）)]", ability)
            k_tag.add("箱入り猫")
            if match.group(2) == "全ブースター":
                k_booster.append("ロケット+"+match.group(1))
                k_booster.append("ミサイル+"+match.group(1))
                k_booster.append("ボム+"+match.group(1))
            else:
                k_booster.append(match.group(2)+"+"+match.group(1))


    return list(k_tag),k_booster


def get_ability_tag(card):
    a_tag = []
    for i in range(1,5):
        ability = card.get(f"a{i}")
        if ability is None:
            break

        if "初期" in ability:
            a_tag.append("初期スキルゲージ増加")
        if "時スキルゲージ" in ability:
            a_tag.append("他カードスキル使用時スキルゲージ増加")
        if "時スキルクール" in ability:
            a_tag.append("他カードスキル使用時スキルクールタイム減少")
        if "アクセントカラー" in ability:
            a_tag.append("アクセントカラー")
            if "全" in ability:
                a_tag.append("アクセントカラー(全)")
            else:
                a_tag.append(ability)
        if "手数" in ability:
            a_tag.append(ability)
        if "リバウンド" in ability:
            a_tag.append("リバウンドスキルコスト")
        if "ダイエット" in ability:
            a_tag.append("ダイエットスキルコスト")
        if "リンケージス" in ability:
            a_tag.append("リンケージスキルコスト減少")
        if "ペア" in ability:
            if "初期" in ability:
                a_tag.append("ペアルック初期スキルゲージ増加")
            else:
                a_tag.append("ペアルックスキルコスト減少")
        if "シミラー" in ability:
            if "初期" in ability:
                a_tag.append("シミラー初期スキルゲージ増加")
            else:
                a_tag.append("シミラースキルコスト減少")
        if "リンケージオ" in ability:
            a_tag.append("リンケージオールスコアアップ")
        if "貫通" in ability:
            a_tag.append("ピーナッツ貫通ロケット")
    return a_tag

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
    return s_tag

#print(get_cards("【朝一の悦び】彩葉"))
#exit()
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(get_cards(), f, indent=2, ensure_ascii=False)

def get_tags(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    span = soup.find("span", class_="tag")

    return [
      x.get_text(strip=True) for x in span.find_all("a")
    ]
