const colleges = [
  { name: "Pacific Tech University", state: "CA", major: "Computer Science", tuition: 42000, size: "Large" },
  { name: "Lakeside State College", state: "MI", major: "Business", tuition: 24000, size: "Medium" },
  { name: "Blue Ridge University", state: "NC", major: "Nursing", tuition: 28000, size: "Medium" },
  { name: "Metro Arts Institute", state: "NY", major: "Design", tuition: 36000, size: "Small" },
  { name: "Desert Valley University", state: "AZ", major: "Engineering", tuition: 31000, size: "Large" },
  { name: "Prairie Health College", state: "KS", major: "Biology", tuition: 19000, size: "Small" }
];
const stateAbbrs = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
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

function renderCollegeList(items, target) { target.innerHTML=""; if(!items.length){target.innerHTML="<li>No matching colleges found.</li>";return;} items.forEach(c=>{const li=document.createElement("li");li.textContent=`${c.name} (${c.state}) — ${c.major}, $${c.tuition.toLocaleString()}/yr, ${c.size}`;target.appendChild(li);}); }
function initTabs(){tabButtons.forEach(button=>button.addEventListener("click",()=>{tabButtons.forEach(btn=>btn.classList.remove("active"));document.querySelectorAll(".tab-panel").forEach(panel=>panel.classList.remove("active"));button.classList.add("active");document.getElementById(`tab-${button.dataset.tab}`).classList.add("active");}));}
function initSearch(){renderCollegeList(colleges,collegeResults);collegeSearch.addEventListener("input",e=>renderCollegeList(colleges.filter(c=>c.name.toLowerCase().includes(e.target.value.toLowerCase().trim())),collegeResults));clearSearch.addEventListener("click",()=>{collegeSearch.value="";renderCollegeList(colleges,collegeResults);});}
function initPreferenceOptions(){stateAbbrs.forEach(code=>prefState.insertAdjacentHTML("beforeend",`<option value='${code}'>${code}</option>`));[...new Set(colleges.map(c=>c.major))].forEach(major=>prefMajor.insertAdjacentHTML("beforeend",`<option value='${major}'>${major}</option>`));}
function initPreferencesForm(){prefForm.addEventListener("submit",(e)=>{e.preventDefault();const matches=colleges.filter(c=>(!prefState.value||c.state===prefState.value)&&(!prefMajor.value||c.major===prefMajor.value)&&(!prefBudget.value||c.tuition<=Number(prefBudget.value))&&(!prefSize.value||c.size===prefSize.value));renderCollegeList(matches,matchResults);});}
function initMajors(){fieldsFolders.innerHTML='<details open><summary>Preview</summary><div class="major-folder"><h4>Majors content available in this prototype.</h4></div></details>';}

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
    title.textContent = `Top 25 Colleges in ${abbr}`;
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

initTabs(); initSearch(); initPreferenceOptions(); initPreferencesForm(); initMajors(); initGeoMap();
