// Navbar
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("nav ul");
const links = document.querySelectorAll("nav ul li");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
  links.forEach(function (link) {
    link.classList.toggle("fade");
  });
});

// Menampilkan Data COVID-19 Indonesia di Home
fetch("https://indonesia-covid-19.mathdro.id/api/?")
  .then((response) => response.json())
  .then((response) => {
    const covid = response;
    const covidSection = document.querySelector(".covid");
    covidSection.innerHTML = showCovidData(covid);
  })
  .catch(e => {
    console.log(e);
  });

function showCovidData(covid) {
  return `<div class="total-case">
            <h2>${covid.jumlahKasus}</h2>
            <h4>Total Case</h4>
          </div>
          <div class="positive">
            <h2>${covid.perawatan}</h2>
            <h4>Positive</h4>
          </div>
          <div class="recovered">
            <h2>${covid.sembuh}</h2>
            <h4>Recovered</h4>
          </div>
          <div class="death">
            <h2>${covid.meninggal}</h2>
            <h4>Death</h4>
          </div>`;
}

// Loading ketika page di load

// Province

// Live Search
const searchButton = document.querySelector(".cari");
const search = document.getElementById("search");
const main = document.querySelector(".main");

search.addEventListener("keyup", function (e) {
  // Fetch
  fetch("https://indonesia-covid-19.mathdro.id/api/provinsi")
    .then((response) => response.json())
    .then((response) => {
      const keyword = e.target.value.toLowerCase();
      const covid = response.data;
      covid.filter(response => {
        if (response.provinsi.toLowerCase().includes(keyword)) {
          // console.log(showCovidProvinceData(response));
          main.innerHTML += showCovidProvinceData(response);
        }
      })
    })
    .catch(e => {
      console.log(e);
    });
});

// Show province data to html
fetch("https://indonesia-covid-19.mathdro.id/api/provinsi")
  .then((response) => response.json())
  .then((response) => {
    const covid = response.data;
    let covidData = "";
    covid.forEach((c) => (covidData += showCovidProvinceData(c)));
    main.innerHTML = covidData;
  });

function showCovidProvinceData(c) {
  return `<div class="card">
            <div class="kota">
              <h3>#${c.fid}</h3>
              <div class="space"></div>
              <h3>${c.provinsi}</h3>
            </div>
            <div class="positive">
              <p>Positive</p>
              <div class="space"></div>
              <p>${c.kasusPosi}</p>
            </div>
            <hr />
            <div class="recovered">
              <p>Recovered</p>
              <div class="space"></div>
              <p>${c.kasusSemb}</p>
            </div>
            <hr />
            <div class="death">
              <p>Death</p>
              <div class="space"></div>
              <p>${c.kasusMeni}</p>
            </div>
          </div> `;
}
