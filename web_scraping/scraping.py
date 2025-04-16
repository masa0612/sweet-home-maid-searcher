#!/usr/bin/env python3
import re
import json
import requests
from bs4 import BeautifulSoup

WIKI = "https://sweethomemaid.wikiru.jp/"

def get_cards(filter_=None):
    response = requests.get(WIKI+"?全キャラクター一覧")
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
        card["icon"] = WIKI+row[0].find("img")["data-src"]
        card["character"] = row[0].text
        name = row[1].find("a")
        card["name"] = name.text
        card["url"] = WIKI+name["href"][2:]
        if "コラボ" in name.text or "ロイズ" in name.text:
            if "の特権" not in name.text:
                card["character"] = "その他"
        card["series"] = get_series(card["name"])
        card["rarity"] = int(row[2].get_text(strip=True)[1])
        card["color"] = row[3].text

        skill = row[4].find("img")
        card["s_name"] = skill["title"]
        #card["s_img"] = WIKI+skill["data-src"]
        card["s_type"] = get_skill_type(card["s_name"])
        card["booster_tag"] = get_skill_tag(card["s_name"])
        card["cost"] = row[5].text
        card["ct"] = row[6].text
        status = get_status(card["url"])
        card["red"] = status[0]
        card["blue"] = status[1]
        card["green"] = status[2]
        card["yellow"] = status[3]
        card["aqua"] = status[4]
        card["violet"] = status[5]

        for i in range(7,11):
            ability = row[i].find("img")
            if ability is None: break
            card[f"a{i-6}"] = ability["title"]
            #card[f"a{i-6}_img"] = WIKI+ability["data-src"]
        card["a_tag"] = get_ability_tag(card)
        card["k_tag"], card["plus"]= get_killer_tag(card)

        cards.append(card)

    return cards

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
    return match.group(1)

def get_killer_tag(card):
    k_tag = set()
    k_booster = list()
    for i in range(1,5):
        ability = card.get(f"a{i}")
        if ability is None: break
        target = ["キラー","サポート","なつき"]
        if not any(x in ability for x in target): continue

        match = re.search(r"(.+?)[＋+](\d+)[（(](.+?)[）)]", ability)
        k_tag.add(match.group(1))
        plus = match.group(2)
        booster = match.group(3)
        k_booster.append("+"+plus)
        if booster == "全ブースター":
            k_booster.append("ロケット+"+plus)
            k_booster.append("ミサイル+"+plus)
            k_booster.append("ボム+"+plus)
        else:
            k_booster.append(booster+"+"+plus)
    return list(k_tag),k_booster

def get_ability_tag(card):
    a_tag = []
    for i in range(1,5):
        ability = card.get(f"a{i}")
        if ability is None:
            break

        if "初期" in ability:
            if "ペア" in ability:
                a_tag.append("ペアルック初期スキルゲージ増加")
            elif "シミラー" in ability:
                a_tag.append("シミラー初期スキルゲージ増加")
            else:
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
        if "ペア" in ability and "減少" in ability:
            a_tag.append("ペアルックスキルコスト減少")
        if "シミラー" in ability and "減少" in ability:
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

def get_status(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    content_div = soup.find(id="content_1_1")
    sibling_div = content_div.find_next_sibling("div")
    table = sibling_div.find("table")
    rows = table.find_all("tr")
    status_list = []
    for x in rows[2:]:
        cols = x.find_all("td")
        status_list.append(int(cols[2].get_text(strip=True).replace(",","")))
    max_value = max(status_list)
    multiplier = get_multiplier(soup)
    return [int(x*multiplier) if x == max_value else x for x in status_list]

def get_multiplier(soup):
    div = soup.find(id="content_1_3")
    multiple = int()
    color = str()
    while True:
        div = div.find_next_sibling("div")
        if div is None: break
        if "ie5" not in div["class"]: continue

        table = div.find("table")
        rows = table.find_all("tr")
        for x in range(0,(int(len(rows)/2))):
            ths = rows[x*2].find_all("th")
            ability = ths[1].text
            if "カードスコア" not in ability:
                continue

            match = re.search(r'(\d+)', ability)
            multiple += int(match.group(1) if match else None)

    return float(multiple/100)+1.02
