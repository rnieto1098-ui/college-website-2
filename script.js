const colleges = [
  { name: "Pacific Tech University", state: "CA", major: "Computer Science", tuition: 42000, size: "Large" },
  { name: "Lakeside State College", state: "MI", major: "Business", tuition: 24000, size: "Medium" },
  { name: "Blue Ridge University", state: "NC", major: "Nursing", tuition: 28000, size: "Medium" },
  { name: "Metro Arts Institute", state: "NY", major: "Design", tuition: 36000, size: "Small" },
  { name: "Desert Valley University", state: "AZ", major: "Engineering", tuition: 31000, size: "Large" },
  { name: "Prairie Health College", state: "KS", major: "Biology", tuition: 19000, size: "Small" }
];

const topSchools = ["Stanford University", "MIT", "Harvard University", "Princeton University", "UC Berkeley", "University of Michigan", "UCLA", "Georgia Tech", "University of Texas at Austin", "Carnegie Mellon University"];

const fieldMajors = {
  "Engineering": ["Mechanical Engineering","Electrical Engineering","Civil Engineering","Chemical Engineering","Aerospace Engineering","Biomedical Engineering","Industrial Engineering","Materials Engineering","Environmental Engineering","Computer Engineering","Nuclear Engineering","Petroleum Engineering","Systems Engineering","Robotics Engineering","Manufacturing Engineering"],
  "Computer & Data Science": ["Computer Science","Data Science","Software Engineering","Information Systems","Cybersecurity","Artificial Intelligence","Machine Learning","Human-Computer Interaction","Computer Networks","Cloud Computing","Database Systems","Game Development","Bioinformatics","Computational Mathematics","IT Management"],
  "Business": ["Finance","Accounting","Marketing","Management","Entrepreneurship","Business Analytics","Supply Chain Management","International Business","Human Resource Management","Real Estate","Economics","Operations Management","Hospitality Management","Risk Management","Actuarial Science"],
  "Health Sciences": ["Nursing","Public Health","Pre-Med Biology","Health Administration","Pharmacy","Physical Therapy","Occupational Therapy","Nutrition","Radiologic Sciences","Health Informatics","Dental Hygiene","Speech Pathology","Kinesiology","Medical Laboratory Science","Respiratory Therapy"],
  "Natural Sciences": ["Biology","Chemistry","Physics","Geology","Environmental Science","Astronomy","Biochemistry","Marine Science","Neuroscience","Microbiology","Ecology","Genetics","Earth Science","Forensic Science","Zoology"],
  "Social Sciences": ["Psychology","Sociology","Political Science","Anthropology","Criminology","International Relations","Geography","Economics (BA)","Public Policy","Urban Studies","Social Work","Gender Studies","Cognitive Science","Demography","Linguistics"],
  "Humanities": ["English","History","Philosophy","Classics","Religious Studies","Comparative Literature","Art History","Ethics","Rhetoric","Archaeology","Language Studies","Creative Writing","Cultural Studies","Theology","Medieval Studies"],
  "Education": ["Elementary Education","Secondary Education","Special Education","Early Childhood Education","Curriculum & Instruction","Educational Leadership","STEM Education","TESOL","Counselor Education","Physical Education","Educational Psychology","Literacy Education","Music Education","Art Education","Higher Education"],
  "Arts & Design": ["Graphic Design","Industrial Design","Animation","Interior Design","Fashion Design","Fine Arts","Illustration","Photography","Film Production","UI/UX Design","Game Art","Architecture","Digital Media","Theater Design","Art Education"],
  "Communications": ["Journalism","Mass Communication","Public Relations","Advertising","Media Studies","Broadcasting","Strategic Communication","Digital Communications","Sports Communication","Corporate Communication","Communication Studies","Political Communication","Technical Communication","Audio Production","Social Media Management"],
  "Law & Public Service": ["Pre-Law","Legal Studies","Criminal Justice","Public Administration","Emergency Management","Homeland Security","Paralegal Studies","Corrections","Forensic Psychology","Security Studies","Fire Science","Law Enforcement","Public Safety","Nonprofit Management","Civic Leadership"],
  "Agriculture & Environment": ["Agricultural Science","Agribusiness","Animal Science","Plant Science","Food Science","Soil Science","Forestry","Horticulture","Sustainable Agriculture","Wildlife Management","Fisheries Science","Ag Engineering","Viticulture","Rangeland Management","Entomology"],
  "Math & Quantitative": ["Mathematics","Applied Mathematics","Statistics","Actuarial Mathematics","Operations Research","Quantitative Economics","Computational Math","Data Analytics","Financial Mathematics","Biostatistics","Math Education","Discrete Mathematics","Probability","Numerical Analysis","Mathematical Modeling"],
  "Architecture & Built Environment": ["Architecture","Urban Planning","Construction Management","Landscape Architecture","Interior Architecture","Sustainable Design","Regional Planning","Real Estate Development","Building Science","Historic Preservation","Infrastructure Planning","Smart Cities","GIS Planning","Housing Studies","Facilities Management"],
  "Interdisciplinary Studies": ["Liberal Studies","Global Studies","Environmental Policy","Science, Technology & Society","Cognitive Neuroscience","Digital Humanities","International Development","Ethnic Studies","Peace & Conflict Studies","Human-Centered Design","Sustainability Studies","Computational Social Science","Health & Society","Media & Culture","Innovation Studies"]
};

const statePoints = [
  { code: "AL", x: 520, y: 315 }, { code: "AK", x: 120, y: 410 }, { code: "AZ", x: 175, y: 265 },
  { code: "AR", x: 430, y: 285 }, { code: "CA", x: 100, y: 220 }, { code: "CO", x: 250, y: 215 },
  { code: "CT", x: 665, y: 170 }, { code: "DE", x: 610, y: 215 }, { code: "FL", x: 630, y: 355 },
  { code: "GA", x: 560, y: 295 }, { code: "HI", x: 210, y: 425 }, { code: "ID", x: 155, y: 145 },
  { code: "IL", x: 430, y: 205 }, { code: "IN", x: 465, y: 215 }, { code: "IA", x: 370, y: 200 },
  { code: "KS", x: 325, y: 225 }, { code: "KY", x: 500, y: 240 }, { code: "LA", x: 420, y: 340 },
  { code: "ME", x: 700, y: 120 }, { code: "MD", x: 600, y: 220 }, { code: "MA", x: 680, y: 155 },
  { code: "MI", x: 500, y: 170 }, { code: "MN", x: 355, y: 155 }, { code: "MS", x: 470, y: 320 },
  { code: "MO", x: 390, y: 240 }, { code: "MT", x: 220, y: 120 }, { code: "NE", x: 315, y: 190 },
  { code: "NV", x: 135, y: 200 }, { code: "NH", x: 690, y: 145 }, { code: "NJ", x: 635, y: 205 },
  { code: "NM", x: 225, y: 270 }, { code: "NY", x: 620, y: 165 }, { code: "NC", x: 575, y: 260 },
  { code: "ND", x: 310, y: 125 }, { code: "OH", x: 525, y: 210 }, { code: "OK", x: 350, y: 270 },
  { code: "OR", x: 100, y: 155 }, { code: "PA", x: 575, y: 190 }, { code: "RI", x: 690, y: 170 },
  { code: "SC", x: 585, y: 285 }, { code: "SD", x: 315, y: 155 }, { code: "TN", x: 500, y: 270 },
  { code: "TX", x: 305, y: 305 }, { code: "UT", x: 180, y: 210 }, { code: "VT", x: 670, y: 145 },
  { code: "VA", x: 560, y: 235 }, { code: "WA", x: 95, y: 110 }, { code: "WV", x: 545, y: 225 },
  { code: "WI", x: 410, y: 170 }, { code: "WY", x: 245, y: 165 }
];
const collegeSearch = document.getElementById("college-search");
const clearSearch = document.getElementById("clear-search");
const collegeResults = document.getElementById("college-results");
const stateMap = document.getElementById("state-map");
const selectedStateText = document.getElementById("selected-state");
const fieldsFolders = document.getElementById("fields-folders");
const prefForm = document.getElementById("preferences-form");
const prefState = document.getElementById("pref-state");
const prefMajor = document.getElementById("pref-major");
const prefBudget = document.getElementById("pref-budget");
const prefSize = document.getElementById("pref-size");
const matchResults = document.getElementById("match-results");
const tabButtons = document.querySelectorAll(".tab-btn");
function renderCollegeList(items, target) { target.innerHTML = ""; if (!items.length) return (target.innerHTML = "<li>No matching colleges found.</li>"); items.forEach((college) => { const li = document.createElement("li"); li.textContent = `${college.name} (${college.state}) — ${college.major}, $${college.tuition.toLocaleString()}/yr, ${college.size}`; target.appendChild(li); }); }
function initTabs() { tabButtons.forEach((button) => { button.addEventListener("click", () => { tabButtons.forEach((btn) => btn.classList.remove("active")); document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active")); button.classList.add("active"); document.getElementById(`tab-${button.dataset.tab}`).classList.add("active"); }); }); }
function initSearch() { renderCollegeList(colleges, collegeResults); collegeSearch.addEventListener("input", (event) => { const q = event.target.value.toLowerCase().trim(); renderCollegeList(colleges.filter((c) => c.name.toLowerCase().includes(q)), collegeResults); }); clearSearch.addEventListener("click", () => { collegeSearch.value = ""; renderCollegeList(colleges, collegeResults); }); }
function initMap() { statePoints.forEach((state) => { const pin = document.createElement("button"); pin.className = "state-pin"; pin.style.left = `${state.x}px`; pin.style.top = `${state.y}px`; pin.type = "button"; pin.textContent = state.code; pin.addEventListener("click", () => { document.querySelectorAll(".state-pin").forEach((btn) => btn.classList.remove("active")); pin.classList.add("active"); prefState.value = state.code; selectedStateText.textContent = `Selected state: ${state.code}`; }); stateMap.appendChild(pin); }); }

function buildRankingsForMajor(major) {
  return topSchools.slice(0, 5).map((school, index) => ({ rank: index + 1, school, score: 99 - index - (major.length % 3) }));
}

function initMajors() {
  Object.entries(fieldMajors).forEach(([field, majors]) => {
    const details = document.createElement("details");
    details.innerHTML = `<summary>${field} (15 majors)</summary>`;
    majors.forEach((major) => {
      const rankings = buildRankingsForMajor(major);
      const majorWrap = document.createElement("div");
      majorWrap.className = "major-folder";
      majorWrap.innerHTML = `<h4>${major}</h4>`;
      const ul = document.createElement("ul");
      ul.className = "ranking-list";
      rankings.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `#${item.rank} ${item.school} (Score: ${item.score})`;
        ul.appendChild(li);
      });
      majorWrap.appendChild(ul);
      details.appendChild(majorWrap);
    });
    fieldsFolders.appendChild(details);
  });
}
function initPreferenceOptions() { statePoints.forEach(({ code }) => prefState.insertAdjacentHTML("beforeend", `<option value="${code}">${code}</option>`)); [...new Set(colleges.map((c) => c.major))].forEach((major) => prefMajor.insertAdjacentHTML("beforeend", `<option value="${major}">${major}</option>`)); }
function initPreferencesForm() { prefForm.addEventListener("submit", (event) => { event.preventDefault(); const matches = colleges.filter((college) => { const stateMatch = !prefState.value || college.state === prefState.value; const majorMatch = !prefMajor.value || college.major === prefMajor.value; const budgetMatch = !prefBudget.value || college.tuition <= Number(prefBudget.value); const sizeMatch = !prefSize.value || college.size === prefSize.value; return stateMatch && majorMatch && budgetMatch && sizeMatch; }); renderCollegeList(matches, matchResults); }); }
initTabs(); initSearch(); initMap(); initMajors(); initPreferenceOptions(); initPreferencesForm();
