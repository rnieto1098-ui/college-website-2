const colleges = [
  { name: "Pacific Tech University", state: "CA", major: "Computer Science", tuition: 42000, size: "Large", acceptanceRate: "18%", fourYearCost: "$232,000", url: "https://example.edu/pacific-tech" },
  { name: "Lakeside State College", state: "MI", major: "Business", tuition: 24000, size: "Medium", acceptanceRate: "54%", fourYearCost: "$128,000", url: "https://example.edu/lakeside-state" },
  { name: "Blue Ridge University", state: "NC", major: "Nursing", tuition: 28000, size: "Medium", acceptanceRate: "42%", fourYearCost: "$152,000", url: "https://example.edu/blue-ridge" },
  { name: "Metro Arts Institute", state: "NY", major: "Design", tuition: 36000, size: "Small", acceptanceRate: "36%", fourYearCost: "$188,000", url: "https://example.edu/metro-arts" },
  { name: "Desert Valley University", state: "AZ", major: "Engineering", tuition: 31000, size: "Large", acceptanceRate: "47%", fourYearCost: "$168,000", url: "https://example.edu/desert-valley" },
  { name: "Prairie Health College", state: "KS", major: "Biology", tuition: 19000, size: "Small", acceptanceRate: "61%", fourYearCost: "$104,000", url: "https://example.edu/prairie-health" }
];
const stateNames = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};
const fipsToAbbr = {1:"AL",2:"AK",4:"AZ",5:"AR",6:"CA",8:"CO",9:"CT",10:"DE",12:"FL",13:"GA",15:"HI",16:"ID",17:"IL",18:"IN",19:"IA",20:"KS",21:"KY",22:"LA",23:"ME",24:"MD",25:"MA",26:"MI",27:"MN",28:"MS",29:"MO",30:"MT",31:"NE",32:"NV",33:"NH",34:"NJ",35:"NM",36:"NY",37:"NC",38:"ND",39:"OH",40:"OK",41:"OR",42:"PA",44:"RI",45:"SC",46:"SD",47:"TN",48:"TX",49:"UT",50:"VT",51:"VA",53:"WA",54:"WV",55:"WI",56:"WY"};
const fieldsFolders = document.getElementById("fields-folders");
const tabButtons = document.querySelectorAll(".tab-btn");
const collegeSearch = document.getElementById("college-search");
const clearSearch = document.getElementById("clear-search");
const collegeResults = document.getElementById("college-results");
const prefState = document.getElementById("pref-state");
const prefMajor = document.getElementById("pref-major");
const prefBudget = document.getElementById("pref-budget");
const prefSize = document.getElementById("pref-size");
const prefForm = document.getElementById("preferences-form");
const matchResults = document.getElementById("match-results");
const majorsSearch = document.getElementById("majors-search");
const clearMajorsSearch = document.getElementById("clear-majors-search");
const majorsSearchSummary = document.getElementById("majors-search-summary");
const loginGoogle = document.getElementById("login-google");
const loginApple = document.getElementById("login-apple");
const emailLoginForm = document.getElementById("email-login-form");
const loginStatus = document.getElementById("login-status");
const saveProfileBtn = document.getElementById("save-profile");
const recommendationsBtn = document.getElementById("get-recommendations");
const personalizedList = document.getElementById("personalized-list");


function renderCollegeList(items, target) { target.innerHTML=""; if(!items.length){target.innerHTML="<li>No matching colleges found.</li>";return;} items.forEach(c=>{const li=document.createElement("li");li.textContent=`${c.name} (${c.state}) — ${c.major}, $${c.tuition.toLocaleString()}/yr, ${c.size}`;target.appendChild(li);}); }
function renderSearchCards(items){collegeResults.innerHTML="";if(!items.length){collegeResults.innerHTML="<p>No matching colleges found.</p>";return;}items.forEach((c)=>{const a=document.createElement("a");a.className="college-card";a.href=c.url;a.target="_blank";a.rel="noopener noreferrer";a.innerHTML=`<h3>${c.name}</h3><p class="college-meta">State: ${stateNames[c.state] || c.state}</p><p class="college-meta">Acceptance Rate: ${c.acceptanceRate}</p><p class="college-meta">Estimated 4-Year Cost: ${c.fourYearCost}</p><p class="college-link">Visit college page →</p>`;collegeResults.appendChild(a);});}
function initTabs(){tabButtons.forEach(button=>button.addEventListener("click",()=>{tabButtons.forEach(btn=>btn.classList.remove("active"));document.querySelectorAll(".tab-panel").forEach(panel=>panel.classList.remove("active"));button.classList.add("active");document.getElementById(`tab-${button.dataset.tab}`).classList.add("active");}));}
function initSearch(){renderSearchCards(colleges);collegeSearch.addEventListener("input",e=>renderSearchCards(colleges.filter(c=>c.name.toLowerCase().includes(e.target.value.toLowerCase().trim()))));clearSearch.addEventListener("click",()=>{collegeSearch.value="";renderSearchCards(colleges);});}
function initPreferenceOptions(){Object.entries(stateNames).forEach(([code,name])=>prefState.insertAdjacentHTML("beforeend",`<option value="${code}">${name}</option>`));[...new Set(colleges.map(c=>c.major))].forEach(major=>prefMajor.insertAdjacentHTML("beforeend",`<option value="${major}">${major}</option>`));}
function initPreferencesForm(){prefForm.addEventListener("submit",(e)=>{e.preventDefault();const matches=colleges.filter(c=>(!prefState.value||c.state===prefState.value)&&(!prefMajor.value||c.major===prefMajor.value)&&(!prefBudget.value||c.tuition<=Number(prefBudget.value))&&(!prefSize.value||c.size===prefSize.value));renderCollegeList(matches,matchResults);});}
const studyFields = {
  "STEM & Applied Sciences": {
    "Engineering": ["Mechanical Engineering","Electrical Engineering","Civil Engineering","Biomedical Engineering","Chemical Engineering","Aerospace Engineering","Industrial Engineering","Materials Engineering","Environmental Engineering","Petroleum Engineering","Nuclear Engineering","Systems Engineering"],
    "Computer & Data": ["Computer Science","Data Science","Software Engineering","Cybersecurity","Information Systems","Artificial Intelligence","Machine Learning","Computer Engineering","Human-Computer Interaction","Cloud Computing","Database Systems","Bioinformatics"],
    "Math & Physical Sciences": ["Mathematics","Statistics","Physics","Chemistry","Applied Mathematics","Actuarial Science","Computational Mathematics","Biostatistics","Geophysics","Astrophysics","Quantitative Finance","Operations Research"]
  },
  "Health & Life Sciences": {
    "Clinical & Care": ["Nursing","Public Health","Pre-Med Biology","Health Administration","Nutrition","Physical Therapy","Occupational Therapy","Speech Pathology","Dental Hygiene","Respiratory Therapy","Pharmacy","Radiologic Sciences"],
    "Biological Sciences": ["Biology","Neuroscience","Microbiology","Genetics","Biochemistry","Cell Biology","Molecular Biology","Ecology","Marine Biology","Immunology","Zoology","Botany"]
  },
  "Business, Policy & Society": {
    "Business": ["Finance","Accounting","Marketing","Management","Supply Chain Management","Business Analytics","Entrepreneurship","International Business","Human Resources","Operations Management","Real Estate","Hospitality Management"],
    "Social Sciences": ["Psychology","Sociology","Political Science","International Relations","Economics","Anthropology","Criminology","Geography","Public Policy","Urban Studies","Demography","Cognitive Science"],
    "Law & Public Service": ["Criminal Justice","Public Administration","Legal Studies","Public Policy","Emergency Management","Homeland Security","Paralegal Studies","Law Enforcement","Fire Science","Nonprofit Management","Security Studies","Civic Leadership"]
  },
  "Arts, Communication & Humanities": {
    "Arts & Design": ["Graphic Design","Architecture","Fine Arts","Film Production","UI/UX Design","Animation","Photography","Industrial Design","Interior Design","Fashion Design","Illustration","Digital Media"],
    "Communication": ["Journalism","Public Relations","Media Studies","Strategic Communication","Advertising","Broadcasting","Corporate Communication","Digital Communications","Technical Communication","Political Communication","Audio Production","Social Media Management"],
    "Humanities": ["English","History","Philosophy","Creative Writing","Art History","Religious Studies","Classics","Comparative Literature","Ethics","Archaeology","Linguistics","Cultural Studies"]
  },
  "Education, Environment & Interdisciplinary": {
    "Education": ["Elementary Education","Special Education","Curriculum & Instruction","Educational Leadership","TESOL","Secondary Education","Early Childhood Education","STEM Education","Educational Psychology","Literacy Education","Music Education","Higher Education"],
    "Environment & Agriculture": ["Environmental Science","Agricultural Science","Forestry","Wildlife Management","Sustainable Agriculture","Animal Science","Plant Science","Soil Science","Food Science","Fisheries Science","Horticulture","Conservation Biology"],
    "Interdisciplinary": ["Global Studies","Sustainability Studies","Digital Humanities","Innovation Studies","Science, Technology & Society","International Development","Peace & Conflict Studies","Gender Studies","Ethnic Studies","Human-Centered Design","Health & Society","Computational Social Science"]
  }
};

function initMajors(){
  const query = majorsSearch?.value?.toLowerCase().trim() || "";
  fieldsFolders.innerHTML = "";
  let matchCount = 0;

  Object.entries(studyFields).forEach(([umbrella, subfields]) => {
    const umbrellaDetails = document.createElement("details");
    umbrellaDetails.className = "study-umbrella";
    umbrellaDetails.open = query.length > 0;
    umbrellaDetails.innerHTML = `<summary>${umbrella}</summary>`;

    let umbrellaHasMatches = false;

    Object.entries(subfields).forEach(([subfield, majors]) => {
      const filteredMajors = majors.filter((major) => {
        const haystack = `${umbrella} ${subfield} ${major}`.toLowerCase();
        return !query || haystack.includes(query);
      });
      if (!filteredMajors.length) return;

      umbrellaHasMatches = true;
      matchCount += filteredMajors.length;

      const subDetails = document.createElement("details");
      subDetails.className = "study-subfield";
      subDetails.open = query.length > 0;
      subDetails.innerHTML = `<summary>${subfield} (${filteredMajors.length})</summary>`;

      const majorWrap = document.createElement("div");
      majorWrap.className = "major-folder";
      majorWrap.innerHTML = `<h4>Common majors in ${subfield}</h4>`;

      const ul = document.createElement("ul");
      ul.className = "ranking-list";
      filteredMajors.forEach((major) => {
        const li = document.createElement("li");
        li.textContent = major;
        ul.appendChild(li);
      });

      majorWrap.appendChild(ul);
      subDetails.appendChild(majorWrap);
      umbrellaDetails.appendChild(subDetails);
    });

    if (umbrellaHasMatches) fieldsFolders.appendChild(umbrellaDetails);
  });

  majorsSearchSummary.textContent = query
    ? `Showing ${matchCount} matching majors for "${majorsSearch.value}".`
    : "Browse common fields of study and majors used across most universities.";

  if (!fieldsFolders.children.length) {
    fieldsFolders.innerHTML = "<p>No matching majors found. Try a broader term.</p>";
  }
}

function initMajorsSearch(){
  majorsSearch.addEventListener("input", initMajors);
  clearMajorsSearch.addEventListener("click", () => {
    majorsSearch.value = "";
    initMajors();
  });
}

function buildStateTop25(state){
  return Array.from({length:25},(_,i)=>({
    rank:i+1,
    name:`${state} College ${i+1}`,
    description:`A leading ${state} institution known for strong academics, student support, and career outcomes in multiple disciplines.`
  }));
}

async function initGeoMap(){
  const container = document.getElementById("us-map-geo");
  const list = document.getElementById("state-college-list");
  const title = document.getElementById("state-colleges-title");
  const width = 760, height = 470;
  const svg = d3.select(container).append("svg").attr("viewBox",`0 0 ${width} ${height}`);
  const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
  const states = topojson.feature(us, us.objects.states).features;
  const projection = d3.geoAlbersUsa().fitSize([width, height], {type:"FeatureCollection",features:states});
  const path = d3.geoPath(projection);

  function renderStateColleges(abbr){
    title.textContent = `Top 25 Colleges in ${stateNames[abbr] || abbr}`;
    list.innerHTML = "";
    buildStateTop25(abbr).forEach((college)=>{
      const li = document.createElement("li");
      li.innerHTML = `<strong>#${college.rank} ${college.name}</strong><p>${college.description}</p>`;
      list.appendChild(li);
    });
    prefState.value = abbr;
  }

  svg.append("g").selectAll("path").data(states).enter().append("path")
    .attr("d", path)
    .attr("class", "geo-state")
    .on("click", function(event,d){
      d3.selectAll(".geo-state").classed("active",false);
      d3.select(this).classed("active",true);
      const abbr = fipsToAbbr[d.id];
      if (abbr) renderStateColleges(abbr);
    });

  renderStateColleges("CA");
}

function setLoggedIn(provider){
  localStorage.setItem("campusInsiderAuth", provider);
  loginStatus.textContent = `Logged in with ${provider}. You can now save data and get personalized recommendations.`;
}

function initLogin(){
  const existing = localStorage.getItem("campusInsiderAuth");
  if (existing) setLoggedIn(existing);
  loginGoogle.addEventListener("click", () => setLoggedIn("Google"));
  loginApple.addEventListener("click", () => setLoggedIn("Apple"));
  emailLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setLoggedIn("Email");
  });

  saveProfileBtn.addEventListener("click", () => {
    const payload = { state: prefState.value, major: prefMajor.value, budget: prefBudget.value, size: prefSize.value };
    localStorage.setItem("campusInsiderPrefs", JSON.stringify(payload));
    loginStatus.textContent = "Preferences saved to your profile.";
  });

  recommendationsBtn.addEventListener("click", () => {
    personalizedList.innerHTML = "";
    const matches = colleges.filter((c) => (!prefState.value || c.state === prefState.value) && (!prefMajor.value || c.major === prefMajor.value));
    const recs = (matches.length ? matches : colleges).slice(0, 5);
    recs.forEach((college, idx) => {
      const li = document.createElement("li");
      li.textContent = `#${idx + 1} ${college.name} — Best match for your profile in ${stateNames[college.state] || college.state}.`;
      personalizedList.appendChild(li);
    });
  });
}

initTabs(); initSearch(); initPreferenceOptions(); initPreferencesForm(); initMajors(); initMajorsSearch(); initGeoMap(); initLogin();
