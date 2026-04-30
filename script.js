const colleges = [
  { name: "Pacific Tech University", state: "CA", major: "Computer Science", tuition: 42000, size: "Large" },
  { name: "Lakeside State College", state: "MI", major: "Business", tuition: 24000, size: "Medium" },
  { name: "Blue Ridge University", state: "NC", major: "Nursing", tuition: 28000, size: "Medium" },
  { name: "Metro Arts Institute", state: "NY", major: "Design", tuition: 36000, size: "Small" },
  { name: "Desert Valley University", state: "AZ", major: "Engineering", tuition: 31000, size: "Large" },
  { name: "Prairie Health College", state: "KS", major: "Biology", tuition: 19000, size: "Small" }
];

const topMajors = [
  { major: "Computer Science", rank: 1, trend: "High demand" },
  { major: "Nursing", rank: 2, trend: "Strong job growth" },
  { major: "Business", rank: 3, trend: "Versatile career paths" },
  { major: "Engineering", rank: 4, trend: "Consistent salaries" }
];

const statePoints = [
  { code: "WA", x: 95, y: 110 }, { code: "CA", x: 100, y: 220 }, { code: "AZ", x: 175, y: 265 },
  { code: "CO", x: 250, y: 215 }, { code: "TX", x: 305, y: 305 }, { code: "KS", x: 325, y: 225 },
  { code: "IL", x: 430, y: 205 }, { code: "MI", x: 500, y: 170 }, { code: "OH", x: 525, y: 210 },
  { code: "NC", x: 575, y: 260 }, { code: "GA", x: 560, y: 295 }, { code: "FL", x: 630, y: 355 },
  { code: "PA", x: 570, y: 190 }, { code: "NY", x: 610, y: 160 }, { code: "MA", x: 655, y: 150 },
  { code: "AL", x: 515, y: 315 }
];

const collegeSearch = document.getElementById("college-search");
const clearSearch = document.getElementById("clear-search");
const collegeResults = document.getElementById("college-results");
const stateMap = document.getElementById("state-map");
const selectedStateText = document.getElementById("selected-state");
const majorsGrid = document.getElementById("majors-grid");
const prefForm = document.getElementById("preferences-form");
const prefState = document.getElementById("pref-state");
const prefMajor = document.getElementById("pref-major");
const prefBudget = document.getElementById("pref-budget");
const prefSize = document.getElementById("pref-size");
const matchResults = document.getElementById("match-results");
const tabButtons = document.querySelectorAll(".tab-btn");

function renderCollegeList(items, target) {
  target.innerHTML = "";
  if (!items.length) return (target.innerHTML = "<li>No matching colleges found.</li>");
  items.forEach((college) => {
    const li = document.createElement("li");
    li.textContent = `${college.name} (${college.state}) — ${college.major}, $${college.tuition.toLocaleString()}/yr, ${college.size}`;
    target.appendChild(li);
  });
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(`tab-${button.dataset.tab}`).classList.add("active");
    });
  });
}

function initSearch() {
  renderCollegeList(colleges, collegeResults);
  collegeSearch.addEventListener("input", (event) => {
    const q = event.target.value.toLowerCase().trim();
    renderCollegeList(colleges.filter((c) => c.name.toLowerCase().includes(q)), collegeResults);
  });
  clearSearch.addEventListener("click", () => {
    collegeSearch.value = "";
    renderCollegeList(colleges, collegeResults);
  });
}

function initMap() {
  statePoints.forEach((state) => {
    const pin = document.createElement("button");
    pin.className = "state-pin";
    pin.style.left = `${state.x}px`;
    pin.style.top = `${state.y}px`;
    pin.type = "button";
    pin.textContent = state.code;
    pin.addEventListener("click", () => {
      document.querySelectorAll(".state-pin").forEach((btn) => btn.classList.remove("active"));
      pin.classList.add("active");
      prefState.value = state.code;
      selectedStateText.textContent = `Selected state: ${state.code}`;
    });
    stateMap.appendChild(pin);
  });
}

function initMajors() {
  topMajors.forEach((item) => {
    const card = document.createElement("article");
    card.className = "major-card";
    card.innerHTML = `<h3>${item.major}</h3><p>Rank #${item.rank}</p><p>${item.trend}</p>`;
    majorsGrid.appendChild(card);
  });
}

function initPreferenceOptions() {
  statePoints.forEach(({ code }) => prefState.insertAdjacentHTML("beforeend", `<option value="${code}">${code}</option>`));
  [...new Set(colleges.map((c) => c.major))].forEach((major) => prefMajor.insertAdjacentHTML("beforeend", `<option value="${major}">${major}</option>`));
}

function initPreferencesForm() {
  prefForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const matches = colleges.filter((college) => {
      const stateMatch = !prefState.value || college.state === prefState.value;
      const majorMatch = !prefMajor.value || college.major === prefMajor.value;
      const budgetMatch = !prefBudget.value || college.tuition <= Number(prefBudget.value);
      const sizeMatch = !prefSize.value || college.size === prefSize.value;
      return stateMatch && majorMatch && budgetMatch && sizeMatch;
    });
    renderCollegeList(matches, matchResults);
  });
}

initTabs();
initSearch();
initMap();
initMajors();
initPreferenceOptions();
initPreferencesForm();
