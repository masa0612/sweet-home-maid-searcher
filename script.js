//スコア間違い、シリーズ

const wikiUrl = "https://sweethomemaid.wikiru.jp/attach2/"
let characters = []; // キャラクターデータを格納
const characterContainer = document.getElementById("characterContainer");
const filters = {
    character: new Set(),
    rarity: new Set(),
    color: new Set(),
    ct: new Set(),
    skillType: new Set(),
    skillTag: new Set(),
    ability: new Set(),
    killer: new Set(),
    killerBooster: new Set(),
    sortAttributes: new Set()
};

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
  { id: "fast", name: "ファスト", imgSrc: wikiUrl+"696D67_736B5F666173745F726B482E706E67.png" },
  { id: "select", name: "セレクト", imgSrc: wikiUrl+"696D67_736B5F73656C6563745F52522E706E67.png" },
  { id: "p_change", name: "ピースチェンジ", imgSrc: wikiUrl+"696D67_736B5F706368616E67652E706E67.png" },
  { id: "rp_change", name: "遠隔ピースチェンジ", imgSrc: wikiUrl+"696D67_736B696C6C5F3033372E706E67.png" },
  { id: "break", name: "ピースブレイク", imgSrc: wikiUrl+"696D67_736B696C6C5F3032392E706E67.png" },
  { id: "change", name: "カラーチェンジ", imgSrc: wikiUrl+"696D67_736B5F43432E706E67.png" },
  { id: "shuffle", name: "ピースシャッフル", imgSrc: wikiUrl+"696D67_736B5F7073687566666C652E706E67.png" },
];
const boosterTagFilter= [
  { id: "special", name: "スペシャル", imgSrc: wikiUrl+"696D67_625F7370652E6A7067.png" },
  { id: "bom", name: "ボム", imgSrc: wikiUrl+"696D67_625F626F6D2E6A7067.png" },
  { id: "rocket", name: "ロケット", imgSrc: wikiUrl+"696D67_625F726B562E6A7067.png" },
  { id: "missile", name: "ミサイル", imgSrc: wikiUrl+"696D67_625F6D736C2E6A7067.png" },
];

const colorMap = {
  "赤": "696D67_70635F7265642E706E67.png",
  "青": "696D67_70635F626C752E706E67.png",
  "緑": "696D67_70635F67726E2E706E67.png",
  "黄": "696D67_70635F79656C2E706E67.png",
  "水": "696D67_70635F6171612E706E67.png",
  "紫": "696D67_70635F76696F2E706E67.png"
};

// キャラクターデータの読み込み
async function loadCharacters() {
    try {
        const response = await fetch("data/characters.json");
        characters = await response.json();
        renderCharacters(characters);
        createKillerBoosterFilters();
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
function applyFilters() {
  let filtered = characters.filter(char => {
    const matchesSkillType = filters.skillType.size === 0 ||
       [...filters.skillType].every(tag => char.s_type.includes(tag));
    const matchesSkillTag = filters.skillTag.size === 0 ||
       [...filters.skillTag].every(tag => char.booster_tag.includes(tag));
    const matchesAbilityTag = filters.ability.size === 0 ||
       [...filters.ability].every(tag => char.a_tag.includes(tag));
    const matchesKillerTag = filters.killer.size === 0 ||
       [...filters.killer].every(tag => char.k_tag.includes(tag));
    const matchesKillerBooster = filters.killerBooster.size === 0 ||
       [...filters.killerBooster].every(tag => char.k_booster.includes(tag));

    return (filters.character.size === 0 || filters.character.has(char.character)) &&
      (filters.rarity.size === 0 || filters.rarity.has(char.rarity.toString())) &&
      (filters.color.size === 0 || filters.color.has(char.color)) &&
      (filters.ct.size === 0 || filters.ct.has(char.ct.toString())) &&
      matchesSkillTag && matchesAbilityTag && matchesKillerTag &&
      matchesKillerBooster && matchesSkillType;
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

    document.querySelectorAll(".ctCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("ct", e.target.value);
        });
    });

    document.querySelectorAll(".skillTypeCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("skillType", e.target.value);
        });
    });

    document.querySelectorAll(".skillTagCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("skillTag", e.target.value);
        });
    });

    document.querySelectorAll(".abilityCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("ability", e.target.value);
        });
    });

    document.querySelectorAll(".killerCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("killer", e.target.value);
        });
    });

    document.querySelectorAll(".killerBoosterCB").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            toggleFilter("killerBooster", e.target.value);
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

  cbClass = "charCB";
  parentFilterElem = document.getElementById("charFilter1");
  characters1.forEach(renderCard);
  parentFilterElem = document.getElementById("charFilter2");
  characters2.forEach(renderCard);
  parentFilterElem = document.getElementById("charFilter3");
  characters3.forEach(renderCard);

  cbClass = "colorFilterCB";
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

  cbClass = "boosterTagCB";
  parentFilterElem = document.getElementById("boosterTagFilter");
  boosterTagFilter.forEach(renderCard);

  cbClass = "killerCB";
  parentFilterElem = document.getElementById("killerFilter1");
  killerFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("killerFilter2");
  killerFilter2.forEach(renderCard);

  cbClass = "abilityCB";
  parentFilterElem = document.getElementById("abilityFilter1");
  abilityFilter1.forEach(renderCard);
  parentFilterElem = document.getElementById("abilityFilter2");
  abilityFilter2.forEach(renderCard);

}

function createKillerBoosterFilters() {
    const allTags = new Set();
    characters.forEach(char => {
      char.k_booster.forEach(tag => allTags.add(tag));
    });
    const sortedTags = Array.from(allTags).sort();
    // フィルター項目を作成
    const container = document.getElementById('killerBoosterFilter');
    sortedTags.forEach(tag => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('killerBoosterCB');
        checkbox.value = tag;
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
