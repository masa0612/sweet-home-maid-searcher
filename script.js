const wikiUrl = "https://sweethomemaid.wikiru.jp/attach2/"
const characters1 = [
    { id: "irohaFilter", name: "彩葉", imgSrc: "assets/character_filter/iroha.jpg" },
    { id: "tsumugiFilter", name: "紬", imgSrc: "assets/character_filter/tsumugi.jpg" },
    { id: "nagiFilter", name: "凪", imgSrc: "assets/character_filter/nagi.jpg" },
];
const characters2 = [
    { id: "kanonFilter", name: "花音", imgSrc: "assets/character_filter/kanon.jpg" },
    { id: "scarletFilter", name: "スカーレット", imgSrc: "assets/character_filter/scarlet.jpg" },
    { id: "himarikoFilter", name: "ひまり子", imgSrc: "assets/character_filter/himariko.jpg" },
];
const characters3 = [
    { id: "niaFilter", name: "ニア", imgSrc: "assets/character_filter/nia.jpg" },
    { id: "nashwaFilter", name: "ナシュワ", imgSrc: "assets/character_filter/nashwa.jpg" },
    { id: "otherFilter", name: "その他", imgSrc: "assets/character_filter/other.jpg" },
];

const colorFilter1 = [
    { id: "redFilter", name: "赤", imgSrc: "assets/color_filter/red.jpg" },
    { id: "blueFilter", name: "青", imgSrc: "assets/color_filter/blue.jpg" },
    { id: "greenFilter", name: "緑", imgSrc: "assets/color_filter/green.jpg" }
];
const colorFilter2 = [
    { id: "yellowFilter", name: "黄", imgSrc: "assets/color_filter/yellow.jpg" },
    { id: "aquaFilter", name: "水", imgSrc: "assets/color_filter/aqua.jpg" },
    { id: "violetFilter", name: "紫", imgSrc: "assets/color_filter/violet.jpg" }
];

const ctFilter = [
    { id: "ct1Filter", name: "1", imgSrc: "assets/ct_filter/ct1.png" },
    { id: "ct2Filter", name: "2", imgSrc: "assets/ct_filter/ct2.png" },
    { id: "ct3Filter", name: "3", imgSrc: "assets/ct_filter/ct3.png" },
    { id: "ct4Filter", name: "4", imgSrc: "assets/ct_filter/ct4.png" },
    { id: "ct5Filter", name: "5", imgSrc: "assets/ct_filter/ct5.png" },
    { id: "ct6Filter", name: "6", imgSrc: "assets/ct_filter/ct6.png" },
];

const rarityFilter1 = [
    { id: "rare1Filter", name: "1", imgSrc: "assets/rarity_filter/rare1.jpg" },
    { id: "rare2Filter", name: "2", imgSrc: "assets/rarity_filter/rare2.jpg" }
];
const rarityFilter2 = [
    { id: "rare3Filter", name: "3", imgSrc: "assets/rarity_filter/rare3.jpg" },
    { id: "rare4Filter", name: "4", imgSrc: "assets/rarity_filter/rare4.jpg" }
];

const colorSort1 = [
    { id: "redSort", name: "red", imgSrc: "assets/color_filter/red.jpg" },
    { id: "blueSort", name: "blue", imgSrc: "assets/color_filter/blue.jpg" },
    { id: "greenSort", name: "green", imgSrc: "assets/color_filter/green.jpg" }
];
const colorSort2 = [
    { id: "yellowSort", name: "yellow", imgSrc: "assets/color_filter/yellow.jpg" },
    { id: "aquaSort", name: "aqua", imgSrc: "assets/color_filter/aqua.jpg" },
    { id: "violetSort", name: "violet", imgSrc: "assets/color_filter/violet.jpg" }
];

const killerFilter1 = [
    { id: "baloon", name: "風船", imgSrc: "assets/killer_filter/baloon.jpg" },
    { id: "box", name: "ダンボール", imgSrc: "assets/killer_filter/box.jpg" },
    { id: "button", name: "ボタン", imgSrc: "assets/killer_filter/button.jpg" },
    { id: "cat", name: "箱入り猫", imgSrc: "assets/killer_filter/cat.jpg" },
    { id: "chain", name: "鎖", imgSrc: "assets/killer_filter/chain.jpg" },
    { id: "egg", name: "たまご", imgSrc: "assets/killer_filter/egg.jpg" },
    { id: "form", name: "泡", imgSrc: "assets/killer_filter/form.jpg" },
    { id: "ice", name: "氷", imgSrc: "assets/killer_filter/ice.jpg" },
    { id: "jelly", name: "ゼリー", imgSrc: "assets/killer_filter/jelly.jpg" },
    { id: "mouse", name: "ネズミ", imgSrc: "assets/killer_filter/mouse.jpg" },
];
const killerFilter2 = [
    { id: "orange", name: "みかん", imgSrc: "assets/killer_filter/orange.jpg" },
    { id: "peanuts", name: "ピーナッツ", imgSrc: "assets/killer_filter/peanuts.jpg" },
    { id: "present", name: "プレゼント箱", imgSrc: "assets/killer_filter/present.jpg" },
    { id: "pretty", name: "プリティタン", imgSrc: "assets/killer_filter/pretty.jpg" },
    { id: "printer", name: "3Dプリンター", imgSrc: "assets/killer_filter/printer.jpg" },
    { id: "shell", name: "貝", imgSrc: "assets/killer_filter/shell.jpg" },
    { id: "spider", name: "蜘蛛の巣", imgSrc: "assets/killer_filter/spider.jpg" },
    { id: "tree", name: "薪", imgSrc: "assets/killer_filter/tree.jpg" },
    { id: "yoyo", name: "水ヨーヨー", imgSrc: "assets/killer_filter/yoyo.jpg" },
];
const abilityFilter1 = [
    { id: "first", name: "初期スキルゲージ増加", imgSrc: wikiUrl+"696D67_6162696C6974795F3237322E706E67.png" },
    { id: "use_cost_up", name: "他カードスキル使用時スキルゲージ増加", imgSrc: wikiUrl+"696D67_6162696C6974795F3330312E706E67.png" },
    { id: "linkage", name: "リンケージスキルコスト減少", imgSrc: wikiUrl+"696D67_6162696C6974795F3237332E706E67.png" },
    { id: "diet", name: "ダイエットスキルコスト", imgSrc: wikiUrl+"696D67_6162696C6974795F3237352E706E67.png" },
    { id: "rebound", name: "リバウンドスキルコスト", imgSrc: wikiUrl+"696D67_6162696C6974795F3237342E706E67.png" },
    { id: "similar_up", name: "シミラー初期スキルゲージ増加", imgSrc: wikiUrl+"696D67_6162696C6974795F3237372E706E67.png" },
    { id: "similar_down", name: "シミラースキルコスト減少", imgSrc: wikiUrl+"696D67_6162696C6974795F3237362E706E67.png" },
    { id: "pair_up", name: "ペアルック初期スキルゲージ増加", imgSrc: wikiUrl+"696D67_6162696C6974795F3237392E706E67.png" },
    { id: "pair_down", name: "ペアルックスキルコスト減少", imgSrc: wikiUrl+"696D67_6162696C6974795F3237382E706E67.png" },
];
const abilityFilter2 = [
    { id: "use_ct_down", name: "他カードスキル使用時スキルクールタイム減少", imgSrc: wikiUrl+"696D67_6162696C6974795F3330332E706E67.png" },
    { id: "hand1", name: "手数1アップ", imgSrc: wikiUrl+"696D67_6162696C6974795F3239302E706E67.png" },
    { id: "hand2", name: "手数2アップ", imgSrc: wikiUrl+"696D67_6162696C6974795F3239612E706E67.png" },
    { id: "wave1", name: "Wave手数回復+1", imgSrc: wikiUrl+"696D67_6162696C6974795F3239312E706E67.png" },
    { id: "wave2", name: "Wave手数回復+2", imgSrc: wikiUrl+"696D67_6162696C6974795F3239622E706E67.png" },
    { id: "ac_all", name: "アクセントカラー(全)", imgSrc: wikiUrl+"696D67_6162696C6974795F4143616C6C38302E706E67.png" },
    { id: "score_all", name: "リンケージオールスコアアップ", imgSrc: wikiUrl+"696D67_6162696C6974795F3236332E706E67.png" },
    { id: "rocket_peanuts", name: "ピーナッツ貫通ロケット", imgSrc: wikiUrl+"696D67_6162696C6974795F3136342E706E67.png" },
];
const skillTypeFilter = [
  { id: "create", name: "クリエイト", imgSrc: wikiUrl+"696D67_736B696C6C5F3032342E706E67.png" },
  { id: "fast", name: "ファスト", imgSrc: wikiUrl+"696D67_736B696C6C5F3030352E706E67.png" },
  { id: "select", name: "セレクト", imgSrc: wikiUrl+"696D67_736B5F73656C6563745F52522E706E67.png" },
  { id: "p_change", name: "ピースチェンジ", imgSrc: wikiUrl+"696D67_736B5F706368616E67652E706E67.png" },
  { id: "rp_change", name: "遠隔ピースチェンジ", imgSrc: wikiUrl+"696D67_736B696C6C5F3033372E706E67.png" },
  { id: "break", name: "ピースブレイク", imgSrc: wikiUrl+"696D67_736B696C6C5F3032392E706E67.png" },
  { id: "change", name: "カラーチェンジ", imgSrc: wikiUrl+"696D67_736B5F43432E706E67.png" },
  { id: "shuffle", name: "ピースシャッフル", imgSrc: wikiUrl+"696D67_736B5F7073687566666C652E706E67.png" },
  { id: "gage_up", name: "スキルゲージアップ", imgSrc: wikiUrl+"696D67_736B696C6C5F3033302E706E67.png" },
  { id: "ct_cool_down", name: "スキルクールダウン1", imgSrc: wikiUrl+"696D67_736B5F43442E706E67.png" },
];
const boosterFilter = [
  { id: "special", name: "スペシャル", imgSrc: wikiUrl+"696D67_625F7370652E706E67.png" },
  { id: "bom", name: "ボム", imgSrc: wikiUrl+"696D67_625F626F6D2E706E67.png" },
  { id: "rocket", name: "ロケット", imgSrc: wikiUrl+"696D67_625F726B562E706E67.png" },
  { id: "missile", name: "ミサイル", imgSrc: "assets/other/msl.png" },
];
const plusFilter = [
  { id: "bom1", name: "ボム+1", imgSrc: "assets/plus_filter/bom_plus1.jpg" },
  { id: "bom2", name: "ボム+2", imgSrc: "assets/plus_filter/bom_plus2.jpg" },
  { id: "msl1", name: "ミサイル+1", imgSrc: "assets/plus_filter/msl_plus1.jpg" },
  { id: "msl2", name: "ミサイル+2", imgSrc: "assets/plus_filter/msl_plus2.jpg" },
  { id: "rocket1", name: "ロケット+1", imgSrc: "assets/plus_filter/rocket_plus1.jpg" },
  { id: "rocket2", name: "ロケット+2", imgSrc: "assets/plus_filter/rocket_plus2.jpg" },
];

//スコア間違、シリーズ
const colorMap = {
  "赤": "696D67_70635F7265642E706E67.png",
  "青": "696D67_70635F626C752E706E67.png",
  "緑": "696D67_70635F67726E2E706E67.png",
  "黄": "696D67_70635F79656C2E706E67.png",
  "水": "696D67_70635F6171612E706E67.png",
  "紫": "696D67_70635F76696F2E706E67.png"
};

let characters = [];
const characterContainer = document.getElementById("characterContainer");
const filters = {
    character: new Set(),
    rarity: new Set(),
    color: new Set(),
    ct: new Set(),
    skillType: new Set(),
    booster: new Set(),
    ability: new Set(),
    killer: new Set(),
    plus: new Set(),
    soon: new Boolean(),
    sortAttributes: new Set()
};

async function loadCharacters() {
    try {
        const response = await fetch("data/characters.json");
        characters = await response.json();
        renderCharacters(characters);
        setupEventListeners();
    } catch (error) {
        console.error("Can not loading character data: ", error);
    }
}

function renderCharacters(filtered_characters) {
    characterContainer.innerHTML = "";

    filtered_characters.forEach(character => {
        const charCard = document.createElement("div");
        charCard.classList.add("charCard");

        const white = document.createElement("div");
        white.classList.add("white");

        const colorImage = document.createElement("img");
        colorImage.src = `${wikiUrl}${colorMap[character.color]}`;
        colorImage.alt = character.color;
        colorImage.classList.add("colorImage");

        const charLink = document.createElement("a");
        charLink.href = character.url;
        charLink.target = "_blank";
        const charImage = document.createElement("img");
        charImage.src = character.icon;
        charImage.alt = character.name;
        charImage.classList.add("charIcon");
        charLink.appendChild(charImage);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "seriesFilter";
        button.textContent = character.series;
        button.style.cursor = "pointer";
        button.addEventListener("click", () => {
          let filtered = characters.filter(char => {
            return char.series === character.series
          });
          renderCharacters(filtered);
        });

        const totalScore = document.createElement("p");
        let sortValue = Array.from(filters.sortAttributes).reduce(
          (sum, attr) => sum + (character[attr] || 0), 0
        );
        totalScore.textContent = "スコア合計:" + sortValue;

        charCard.appendChild(charLink);
        charCard.appendChild(button);
        charCard.appendChild(colorImage);
        charCard.appendChild(white);
        if (filters.sortAttributes.size > 0) {
          charCard.appendChild(totalScore);
        }

        characterContainer.appendChild(charCard);
    });
}

function applyFilters() {
  let filtered = characters.filter(char => {
    const matchesCharacter = filters.character.size === 0 ||
       [...filters.character].some(tag => char.character.includes(tag));
    const matchesSkillType = filters.skillType.size === 0 ||
       [...filters.skillType].some(tag => char.s_type.includes(tag));
    const matchesBoosterTag = filters.booster.size === 0 ||
       [...filters.booster].some(tag => char.booster_tag.includes(tag));
    const matchesAbilityTag = filters.ability.size === 0 ||
       [...filters.ability].some(tag => char.a_tag.includes(tag));
    const matchesKillerTag = filters.killer.size === 0 ||
       [...filters.killer].some(tag => char.k_tag.includes(tag));
    const matchesKillerBooster = filters.plus.size === 0 ||
       [...filters.plus].some(tag => char.plus.includes(tag));
    const matchesRarity = filters.rarity.size === 0 ||
       [...filters.rarity].some(tag => char.rarity.toString().includes(tag));
    const matchesColor = filters.color.size === 0 ||
       [...filters.color].some(tag => char.color.includes(tag));
    const matchesCt = filters.ct.size === 0 ||
       [...filters.ct].some(tag => char.ct.includes(tag));
    const matchesSoon = !filters.soon || char.soon_flag;

    return matchesCharacter && matchesColor && matchesCt && matchesSoon &&
      matchesRarity && matchesBoosterTag && matchesAbilityTag &&
      matchesKillerTag && matchesKillerBooster && matchesSkillType;
  });

  if (filters.sortAttributes.size > 0) {
      filtered.sort((a, b) => {
          const sum = (char) => Array.from(filters.sortAttributes)
              .reduce((sum, attr) => sum + (char[attr] || 0), 0);

          return sum(b) - sum(a);
      });
  }
  renderCharacters(filtered);
}

function toggleFilter(category, value) {
    if (filters[category].has(value)) {
        filters[category].delete(value);
    } else {
        filters[category].add(value);
    }
    applyFilters();
}

function setupEventListeners() {
  const target = [
    "character",
    "rarity",
    "color",
    "ct",
    "booster",
    "skillType",
    "ability",
    "killer",
    "plus",
  ];
  target.forEach(filter_target => {
    document.querySelectorAll("."+filter_target+"CB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter(filter_target, e.target.value);
        });
    });
  });

  document.querySelector("#soonCB").addEventListener("change", (e) => {
    filters["soon"] = e.target.checked;
    console.log(filters["soon"])
    applyFilters();
  });

  // ソートフィルター
  document.querySelectorAll(".colorSortCB").forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
          filters.sortAttributes.add(e.target.value);
      } else {
          filters.sortAttributes.delete(e.target.value);
      }
      applyFilters();
    });
  });
}

function renderFilter() {
  let parentFilterElem;
  let cbClass;
  function renderCard(ele) {
    const filterCard = document.createElement("div");
    filterCard.classList.add("filterCard");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = ele.id;
    input.classList.add(cbClass);
    input.classList.add("filterCB");
    input.value = ele.name;

    // <label for="...">
    const label = document.createElement("label");
    label.htmlFor = ele.id;

    // <img src="..." alt="...">
    const img = document.createElement("img");
    img.src = ele.imgSrc;
    img.alt = ele.name;
    img.classList.add("filterImg");

    label.appendChild(img);
    filterCard.appendChild(input);
    filterCard.appendChild(label);
    parentFilterElem.appendChild(filterCard);
  }

  cbClass = "characterCB";
  parentFilterElem = document.getElementById("charFilter1");
  characters1.forEach(renderCard);
  parentFilterElem = document.getElementById("charFilter2");
  characters2.forEach(renderCard);
  parentFilterElem = document.getElementById("charFilter3");
  characters3.forEach(renderCard);

  cbClass = "colorCB";
  parentFilterElem = document.getElementById("colorFilter1");
  colorFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("colorFilter2");
  colorFilter2.forEach(renderCard);

  cbClass = "colorSortCB";
  parentFilterElem = document.getElementById("colorSort1");
  colorSort1.forEach(renderCard);
  parentFilterElem = document.getElementById("colorSort2");
  colorSort2.forEach(renderCard);

  cbClass = "rarityCB";
  parentFilterElem = document.getElementById("rarityFilter1");
  rarityFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("rarityFilter2");
  rarityFilter2.forEach(renderCard);

  cbClass = "ctCB";
  parentFilterElem = document.getElementById("ctFilter");
  ctFilter.forEach(renderCard);

  cbClass = "skillTypeCB";
  parentFilterElem = document.getElementById("skillTypeFilter");
  skillTypeFilter.forEach(renderCard);

  cbClass = "boosterCB";
  parentFilterElem = document.getElementById("boosterFilter");
  boosterFilter.forEach(renderCard);

  cbClass = "killerCB";
  parentFilterElem = document.getElementById("killerFilter1");
  killerFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("killerFilter2");
  killerFilter2.forEach(renderCard);

  cbClass = "plusCB";
  parentFilterElem = document.getElementById("plusFilter");
  plusFilter.forEach(renderCard);

  cbClass = "abilityCB";
  parentFilterElem = document.getElementById("abilityFilter1");
  abilityFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("abilityFilter2");
  abilityFilter2.forEach(renderCard);
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilter();
  loadCharacters();
});
