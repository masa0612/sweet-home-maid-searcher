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
    soon: false,
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

  const toggleButton = document.querySelector("#filterTglBtn");
  toggleButton.addEventListener('click', () => {
    const filterContainer = document.querySelector("#filterContainer")
    const characterContainer = document.querySelector("#characterContainer")
    filterContainer.classList.toggle('active');
    if (filterContainer.classList.contains('active')) {
      toggleButton.innerHTML = "フィルター<br>非表示";
      toggleButton.style.backgroundColor = "#FF6B6B";
      console.log(filterContainer)
      filterContainer.style.height = "65%";
      characterContainer.style.height = "35%";
    } else {
      toggleButton.innerHTML = "フィルター<br>表示";
      toggleButton.style.backgroundColor = "#4ECDC4";
      filterContainer.style.height = "0%";
      characterContainer.style.height = "100%";
    }
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
    input.classList.add("overlayCB");
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
  parentFilterElem = document.getElementById("charFilter");
  characterFilter.forEach(renderCard);

  cbClass = "colorCB";
  parentFilterElem = document.getElementById("colorFilter");
  colorFilter.forEach(renderCard);

  cbClass = "colorSortCB";
  parentFilterElem = document.getElementById("colorSort");
  colorSort.forEach(renderCard);

  cbClass = "rarityCB";
  parentFilterElem = document.getElementById("rarityFilter");
  rarityFilter.forEach(renderCard);

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
  parentFilterElem = document.getElementById("killerFilter");
  killerFilter.forEach(renderCard);

  cbClass = "plusCB";
  parentFilterElem = document.getElementById("plusFilter");
  plusFilter.forEach(renderCard);

  cbClass = "abilityCB";
  parentFilterElem = document.getElementById("abilityFilter");
  abilityFilter.forEach(renderCard);
}

function setDonation() {
  a = kofiWidgetOverlay.draw('hugashy', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#00b9fe',
    'floating-chat.donateButton.text-color': '#fff'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setDonation();
  renderFilter();
  loadCharacters();
  const iframe = document.querySelector('iframe');
  const closed = iframe.contentDocument.querySelector('.closed');
  if (Math.random() < 1/3) { closed.click(); }
});
