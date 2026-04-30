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

const states = ["AL", "AZ", "CA", "CO", "FL", "GA", "IL", "KS", "MA", "MI", "NC", "NY", "OH", "PA", "TX", "WA"];

const collegeSearch = document.getElementById("college-search");
const clearSearch = document.getElementById("clear-search");
const collegeResults = document.getElementById("college-results");
const stateMap = document.getElementById("state-map");
const majorsGrid = document.getElementById("majors-grid");
const prefForm = document.getElementById("preferences-form");
const prefState = document.getElementById("pref-state");
const prefMajor = document.getElementById("pref-major");
const prefBudget = document.getElementById("pref-budget");
const prefSize = document.getElementById("pref-size");
const matchResults = document.getElementById("match-results");

function renderCollegeList(items, target) {
  target.innerHTML = "";
  if (!items.length) {
    target.innerHTML = "<li>No matching colleges found.</li>";
    return;
  }
  items.forEach((college) => {
    const li = document.createElement("li");
    li.textContent = `${college.name} (${college.state}) — ${college.major}, $${college.tuition.toLocaleString()}/yr, ${college.size}`;
    target.appendChild(li);
  });
}

function initSearch() {
  renderCollegeList(colleges, collegeResults);
  collegeSearch.addEventListener("input", (event) => {
    const q = event.target.value.toLowerCase().trim();
    const filtered = colleges.filter((c) => c.name.toLowerCase().includes(q));
    renderCollegeList(filtered, collegeResults);
  });

  clearSearch.addEventListener("click", () => {
    collegeSearch.value = "";
    renderCollegeList(colleges, collegeResults);
  });
}

function initStateMap() {
  states.forEach((state) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "state-btn";
    button.textContent = state;
    button.addEventListener("click", () => {
      document.querySelectorAll(".state-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      prefState.value = state;
    });
    stateMap.appendChild(button);
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
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    prefState.appendChild(option);
  });

  [...new Set(colleges.map((c) => c.major))].forEach((major) => {
    const option = document.createElement("option");
    option.value = major;
    option.textContent = major;
    prefMajor.appendChild(option);
  });
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

initSearch();
initStateMap();
initMajors();
initPreferenceOptions();
initPreferencesForm();
