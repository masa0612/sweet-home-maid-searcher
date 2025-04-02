//スコア間違い、色間違い、スキル、キラー、アビリティ

let characters = []; // キャラクターデータを格納
const characterContainer = document.getElementById("characterContainer");
const filters = {
    character: new Set(),
    rarity: new Set(),
    color: new Set(),
    ct: new Set(),
    sType: "all",
    skillTag: new Set(),
    sortAttributes: new Set()
};

const characters1 = [
    { id: "irohaFilter", name: "彩葉", imgSrc: "assets/iroha_filter.png" },
    { id: "tsumugiFilter", name: "紬", imgSrc: "assets/tsumugi_filter.png" },
    { id: "nagiFilter", name: "凪", imgSrc: "assets/nagi_filter.png" },
    { id: "kanonFilter", name: "花音", imgSrc: "assets/kanon_filter.png" },
    { id: "otherFilter", name: "その他", imgSrc: "assets/other_filter.png" }
];
const characters2 = [
    { id: "scarletFilter", name: "スカーレット", imgSrc: "assets/scarlet_filter.png" },
    { id: "himarikoFilter", name: "ひまり子", imgSrc: "assets/himariko_filter.png" },
    { id: "niaFilter", name: "ニア", imgSrc: "assets/nia_filter.png" },
    { id: "nashwaFilter", name: "ナシュワ", imgSrc: "assets/nashwa_filter.png" }
];

const colorFilter1 = [
    { id: "redFilter", name: "赤", imgSrc: "assets/red_filter.png" },
    { id: "blueFilter", name: "青", imgSrc: "assets/blue_filter.png" },
    { id: "greenFilter", name: "緑", imgSrc: "assets/green_filter.png" }
];
const colorFilter2 = [
    { id: "yellowFilter", name: "黃", imgSrc: "assets/yellow_filter.png" },
    { id: "aquaFilter", name: "水", imgSrc: "assets/aqua_filter.png" },
    { id: "violetFilter", name: "紫", imgSrc: "assets/violet_filter.png" }
];

const rarityFilter = [
    { id: "rare1Filter", name: "1", imgSrc: "assets/rare1.png" },
    { id: "rare2Filter", name: "2", imgSrc: "assets/rare2.png" },
    { id: "rare3Filter", name: "3", imgSrc: "assets/rare3.png" },
    { id: "rare4Filter", name: "4", imgSrc: "assets/rare4.png" }
];

const colorSort1 = [
    { id: "redSort", name: "red", imgSrc: "assets/red_filter.png" },
    { id: "blueSort", name: "blue", imgSrc: "assets/blue_filter.png" },
    { id: "greenSort", name: "green", imgSrc: "assets/green_filter.png" }
];
const colorSort2 = [
    { id: "yellowSort", name: "yellow", imgSrc: "assets/yellow_filter.png" },
    { id: "aquaSort", name: "aqua", imgSrc: "assets/aqua_filter.png" },
    { id: "violetSort", name: "violet", imgSrc: "assets/violet_filter.png" }
];

const colorMap = {
    "赤": "red.png", "青": "blue.png", "緑": "green.png",
    "黄": "yellow.png", "水": "aqua.png", "紫": "violet.png"
};

// キャラクターデータの読み込み
async function loadCharacters() {
    try {
        const response = await fetch("data/characters.json");
        characters = await response.json();
        renderCharacters(characters);
        createSkillTagFilters();
        setupEventListeners();
    } catch (error) {
        console.error("キャラクターデータの読み込みに失敗しました:", error);
    }
}

function renderCharacters(characters) {
    characterContainer.innerHTML = "";

    characters.forEach(character => {
        const charCard = document.createElement("div");
        charCard.classList.add("charCard");

        const white = document.createElement("div");
        white.classList.add("white");

        const colorImage = document.createElement("img");
        colorImage.src = `assets/${colorMap[character.color]}`;
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

        const nameElement = document.createElement("p");
        const match = character.name.match(/【[^】]+】/);
        nameElement.textContent = match[0];

        const totalScore = document.createElement("p");
        let sortValue = Array.from(filters.sortAttributes).reduce(
          (sum, attr) => sum + (character[attr] || 0), 0
        );
        totalScore.textContent = "スコア合計:" + sortValue;

        charCard.appendChild(charLink);
        charCard.appendChild(nameElement);
        charCard.appendChild(colorImage);
        charCard.appendChild(white);
        if (filters.sortAttributes.size > 0) {
          charCard.appendChild(totalScore);
        }

        characterContainer.appendChild(charCard);
    });
}
// フィルターの適用
function applyFilters() {
  let filtered = characters.filter(char => {
    const matchesSkillTag = filters.skillTag.size === 0 ||
       [...filters.skillTag].every(tag => char.s_tag.includes(tag));
    console.log(filters.skillTag)

    return (filters.character.size === 0 || filters.character.has(char.character)) &&
      (filters.rarity.size === 0 || filters.rarity.has(char.rarity.toString())) &&
      (filters.color.size === 0 || filters.color.has(char.color)) &&
      (filters.ct.size === 0 || filters.ct.has(char.ct.toString())) &&
      matchesSkillTag;
  });

  if (filters.sortAttributes.size > 0) {
      filtered.sort((a, b) => {
          const sum = (char) => Array.from(filters.sortAttributes)
              .reduce((sum, attr) => sum + (char[attr] || 0), 0);

          return sum(b) - sum(a);
      });
      //filtered.sort((a, b) => {
      //    let sumA = Array.from(filters.sortAttributes).
    //    reduce((sum, attr) => sum + (a[attr] || 0), 0);
      //    let sumB = Array.from(filters.sortAttributes).
    //    reduce((sum, attr) => sum + (b[attr] || 0), 0);
      //    return sumB - sumA;
      //});
  }
  renderCharacters(filtered);
}

// チェックボックスの状態をトグルしてフィルターを適用
function toggleFilter(category, value) {
    if (filters[category].has(value)) {
        filters[category].delete(value);
    } else {
        filters[category].add(value);
    }
    applyFilters();
}

// フィルター項目にイベントリスナーを設定
function setupEventListeners() {
    // キャラクターフィルター
    document.querySelectorAll(".charCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("character", e.target.value);
        });
    });

    // レアリティフィルター
    document.querySelectorAll(".rarityCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("rarity", e.target.value);
        });
    });

    // 属性フィルター
    document.querySelectorAll(".colorFilterCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("color", e.target.value);
        });
    });

    // クールタイムフィルター
    document.querySelectorAll(".ctFilterCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("ct", e.target.value);
        });
    });

    document.querySelectorAll(".skillTagCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("skillTag", e.target.value);
        });
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

function renderStaticFilter() {
  // フィルターを追加する要素
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

    // 要素を組み立てる
    label.appendChild(img);
    filterCard.appendChild(input);
    filterCard.appendChild(label);
    parentFilterElem.appendChild(filterCard);
  }

  parentFilterElem = document.getElementById("charFilter1");
  cbClass = "charCB";
  characters1.forEach(renderCard);
  parentFilterElem = document.getElementById("charFilter2");
  characters2.forEach(renderCard);

  parentFilterElem = document.getElementById("colorFilter1");
  cbClass = "colorFilterCB";
  colorFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("colorFilter2");
  colorFilter2.forEach(renderCard);

  parentFilterElem = document.getElementById("colorSort1");
  cbClass = "colorSortCB";
  colorSort1.forEach(renderCard);
  parentFilterElem = document.getElementById("colorSort2");
  colorSort2.forEach(renderCard);

  parentFilterElem = document.getElementById("rarityFilter");
  cbClass = "rarityCB";
  rarityFilter.forEach(renderCard);
}

function createSkillTagFilters() {
    const allTags = new Set();
    characters.forEach(char => {
      char.s_tag.forEach(tag => allTags.add(tag));
    });
    console.log(allTags);
    const sortedTags = Array.from(allTags).sort();
    // フィルター項目を作成
    const container = document.getElementById('skillTagFilter');
    sortedTags.forEach(tag => {
        const label = document.createElement('label');
        //label.classList.add('skill-tag-label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('skillTagCB');
        checkbox.value = tag;
        //checkbox.id = `skill-tag-${tag}`;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${tag}`));
        container.appendChild(label);
    });
}
// 初回ロード
document.addEventListener("DOMContentLoaded", () => {
  renderStaticFilter();
  loadCharacters();
});
