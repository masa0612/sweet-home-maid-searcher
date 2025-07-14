let characters = [];
const container = document.getElementById('panelContainer');
const charPanel = document.getElementById("charPanel");
const howToUse = charPanel.innerHTML;
const resizer = document.getElementById('resizer');
const filterPanel = document.getElementById('filterPanel');
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
    const response = await fetch("assets/cards.json");
    characters = await response.json();
    setupResizer();
  } catch (error) {
      console.error("Can not loading character data: ", error);
  }
}

function renderCharacters(filtered_characters) {
  charPanel.innerHTML = "";
  charPanel.style.display = "grid";

  filtered_characters.forEach(character => {
    const charCard = document.createElement("div");
    charCard.classList.add("charCard");

    const whiteCircle = document.createElement("div");
    whiteCircle .classList.add("whiteCircle");
    charCard.appendChild(whiteCircle);

    const colorImage = document.createElement("img");
    colorImage.src = `${atcUrl}${colorMap[character.color]}`;
    colorImage.alt = character.color;
    colorImage.classList.add("colorImage");
    charCard.appendChild(colorImage);

    const charLink = document.createElement("a");
    charLink.href = wikiUrl + "?" + character.name;
    charLink.target = "_blank";
    const charImage = document.createElement("img");
    charImage.src = wikiUrl+"?plugin=ref&page=img&src="+character.name+"_icon.png";
    charImage.alt = character.name;
    charImage.classList.add("charIcon");
    charLink.appendChild(charImage);
    charCard.appendChild(charLink);


    if (filters.sortAttributes.size > 0) {
      const totalScore = document.createElement("p");
      let sortValue = Array.from(filters.sortAttributes).reduce(
        (sum, attr) => sum + (character[attr] || 0), 0
      );
      totalScore.textContent = "合計スコア:" + sortValue;
      totalScore.style.fontSize = "9px";
      charCard.appendChild(totalScore);
      charPanel.style.gridTemplateRows = 'repeat(auto-fit, 120px)';
    } else {
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
      charCard.appendChild(button);
      charPanel.style.gridTemplateRows = 'repeat(auto-fit, 120px)';
    }

    charPanel.appendChild(charCard);
  });
  const cs = window.getComputedStyle(charPanel);
  const numColumns = cs.getPropertyValue("grid-template-columns").split(' ').length;
  const numRows = Math.ceil( filtered_characters.length / numColumns );
  const pixelValue = parseInt(charPanel.style.gridTemplateRows.match(/(\d+)px/)[1]);
  if (numRows*pixelValue > charPanel.clientHeight) {
    charPanel.style.alignContent = "start";
  } else {
    charPanel.style.alignContent = "center";
  }
}

function applyFilters() {
  let filtered = characters.filter(char => {
    const matchesCharacter = filters.character.size === 0 ||
       [...filters.character].some(tag => char.character === tag);
    const matchesSkillType = filters.skillType.size === 0 ||
       [...filters.skillType].some(tag => char.s_type === tag);
    const matchesBoosterTag = filters.booster.size === 0 ||
       [...filters.booster].some(tag => char.b_tag.includes(tag));
    const matchesAbilityTag = filters.ability.size === 0 ||
       [...filters.ability].some(tag => char.a_tag.includes(tag));
    const matchesKillerTag = filters.killer.size === 0 ||
       [...filters.killer].some(tag => char.k_tag.includes(tag));
    const matchesKillerBooster = filters.plus.size === 0 ||
       [...filters.plus].some(tag => char.p_tag.includes(tag));
    const matchesRarity = filters.rarity.size === 0 ||
       [...filters.rarity].some(tag => char.rarity.toString() ===tag);
    const matchesColor = filters.color.size === 0 ||
       [...filters.color].some(tag => char.color === tag);
    const matchesCt = filters.ct.size === 0 ||
       [...filters.ct].some(tag => char.ct.toString() === tag);
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
  if (isInitialState()) {
    renderHowToUse();
  } else {
    renderCharacters(filtered);
  }
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
    "skillType",
    "booster",
    "ability",
    "killer",
    "rarity",
    "color",
    "plus",
    "ct",
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
    applyFilters();
  });

  // ソート
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

  document.addEventListener("keydown", function(event) {
    switch (event.key) {
      case "r":
        resetFilters();
    }
  });
  window.addEventListener('resize', ()=> {
    applyFilters();
    layoutBtn();
  });
}

function resetFilters() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  filters.character.clear();
  filters.rarity.clear();
  filters.color.clear();
  filters.ct.clear();
  filters.skillType.clear();
  filters.booster.clear();
  filters.ability.clear();
  filters.killer.clear();
  filters.plus.clear();
  filters.sortAttributes.clear();
  filters.soon = false;
  applyFilters();
}

function isInitialState() {
  return filters.character.size === 0 &&
    filters.rarity.size === 0 &&
    filters.color.size === 0 &&
    filters.ct.size === 0 &&
    filters.skillType.size === 0 &&
    filters.booster.size === 0 &&
    filters.ability.size === 0 &&
    filters.killer.size === 0 &&
    filters.plus.size === 0 &&
    filters.soon === false &&
    filters.sortAttributes.size === 0;
}

function renderHowToUse() {
  charPanel.style.display = "";
  charPanel.style.alignContent = "center";
  charPanel.innerHTML = howToUse;
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

    const label = document.createElement("label");
    label.htmlFor = ele.id;

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

function setupResizer() {
  if (window.innerWidth > window.innerHeight) return;

  let isResizing = false;
  resizer.style.top = getComputedStyle(charPanel).height;

  resizer.addEventListener('mousedown', function(e) {
    isResizing = true;
    resizer.classList.add('active');
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;
    handleMove(e.clientX, e.clientY);
  });
  document.addEventListener('mouseup', function() {
    if (!isResizing) return;
    isResizing = false;
    resizer.classList.remove('active');
  });

  resizer.addEventListener('touchstart', function(e) {
    isResizing = true;
    resizer.classList.add('active');
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('touchmove', function(e) {
    if (!isResizing) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('touchend', function() {
    if (!isResizing) return;
    isResizing = false;
    resizer.classList.remove('active');
  });
  document.addEventListener('touchcancel', function() {
    if (!isResizing) return;
    isResizing = false;
    resizer.classList.remove('active');
  });
}

function handleMove(clientX, clientY) {
  const containerRect = container.getBoundingClientRect();

  const containerHeight = containerRect.height;
  const mouseY = clientY - containerRect.top;
  const newHeightA = mouseY;
  const newHeightB = containerHeight - newHeightA;

  // 最小サイズ20%
  if (newHeightA / containerHeight < 0.20 || newHeightB / containerHeight < 0.20) return;

  const aPercentage = (newHeightA / containerHeight * 100).toFixed(1);
  const bPercentage = (100 - aPercentage).toFixed(1);
  charPanel.style.height = `${aPercentage}%`;
  filterPanel.style.height = `${bPercentage}%`;

  resizer.style.top = `${aPercentage}%`;
  applyFilters();
}

function layoutBtn() {
  const donationBtn = document.getElementById("donationBtn");
  const rectCharPanel = charPanel.getBoundingClientRect();
  donationBtn.style.top = (rectCharPanel.top + 3) + 'px';
  donationBtn.style.left = (rectCharPanel.left + 3) + 'px';

  const resetBtn = document.getElementById("resetBtn");
  const rectFilterPanel = filterPanel.getBoundingClientRect();
  resetBtn.style.top = (rectFilterPanel.bottom - 100) + 'px';
  resetBtn.style.left = (rectFilterPanel.right - 85) + 'px';
}

function setupBtn() {
  layoutBtn();
  document.querySelector("#resetBtn").addEventListener("click", resetFilters);
}

document.addEventListener("DOMContentLoaded", () => {
  loadCharacters();
  setupBtn();
  renderFilter();
  setupEventListeners();
});
