import requests
from bs4 import BeautifulSoup

url = "https://sweethomemaid.wikiru.jp/?%E3%80%90%E6%9C%9D%E4%B8%80%E3%81%AE%E6%82%A6%E3%81%B3%E3%80%91%E5%BD%A9%E8%91%89"
url = "https://sweethomemaid.wikiru.jp/?全キャラクター一覧"
response = requests.get(url)
response.raise_for_status()
soup = BeautifulSoup(response.text, 'html.parser')

def get_cards(soup):
    table = soup.find(id="sortabletable1")
    rows = table.find("tbody").find_all("tr")
    card = {}
    for x in rows:
        row = x.find_all("td")
        card["icon"] = get_icon()

        print(x[0])

def get_icon(row):
    return row[0].find("img")["data-src"]

def get_rarity(row):
    content_div = soup.find(id="content_1_0")
    sibling_div = content_div.find_next_sibling("div")
    table = sibling_div.find("table")
    rows = table.find_all("tr")
    cols = rows[1].find_all("td")
    return cols[1].get_text(strip=True)[1]

def get_color(row):
    content_div = soup.find(id="content_1_0")
    sibling_div = content_div.find_next_sibling("div")
    table = sibling_div.find("table")
    rows = table.find_all("tr")
    cols = rows[1].find_all("td")
    return cols[3].find("img")["title"][3:6]

def get_status(row):
    content_div = soup.find(id="content_1_1")
    sibling_div = content_div.find_next_sibling("div")
    table = sibling_div.find("table")
    rows = table.find_all("tr")
    status_list = []
    for x in rows[2:]:
        cols = x.find_all("td")
        status_list.append(int(cols[2].get_text(strip=True).replace(",","")))
    return status_list

###################### each pages
def get_tags(soup):
    span_element = soup.find("span", class_="tag")
    links = span_element.find_all("a")
    return {
        a.get_text(strip=True): a["href"]
        for a in links
        if not(len(a.get_text()) == 1 or "★" in a.get_text())
    }
def get_skill(soup):
    content_div = soup.find(id="content_1_2")
    sibling_div = content_div.find_next_sibling("div").find_next_sibling("div")
    table = sibling_div.find("table")
    rows = table.find_all("tr")
    skill_dict = {}
    one = rows[0].find_all("th")
    skill_dict["img"] = one[0].find("img")["data-src"]
    skill_dict["name"] = one[1].find("strong").text
    two = rows[1].find_all("th")
    skill_dict["text"] = two[1].find("span").text
    sibling_div = sibling_div.find_next_sibling("div")
    table = sibling_div.find("table")
    rows = table.find_all("tr")
    skill_dict["cost"] = int(rows[0].find_all("th")[1].find("span").text)
    return skill_dict

def get_ability(soup):
    div = soup.find(id="content_1_3")
    ability_list = []
    while True:
        line = div.find_next_sibling("div", class_="includex")
        if line is None: break
        div = line.find_next_sibling("div")

        table = div.find("table")
        rows = table.find_all("tr")
        for x in range(0,(int(len(rows)/2))):
            ability_dict = {}
            one = rows[x*2].find_all("th")
            ability_dict["img"] = one[0].find("img")["data-src"]
            ability_dict["name"] = one[1].text
            two = rows[x*2+1].find_all("th")
            ability_dict["text"] = two[0].find("span").text
            ability_list.append(ability_dict)

    print(len(ability_list))
    return ability_list

print(get_icons(soup))
