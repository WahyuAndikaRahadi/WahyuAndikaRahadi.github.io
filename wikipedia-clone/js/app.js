const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Theme toggler elements
const themeToggler = document.getElementById("theme-toggler");
const body = document.body;

async function searchWikipeida(query) {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `https://id.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;

  const reponse = await fetch(endpoint);

  if (!reponse.ok) {
    throw new Error("Jaringan Bermasalah Tidak Dapat Tersambung Dengan Server Coba Lah Lagi Lain Kali");
  }

  const json = await reponse.json();
  return json;
}

function displayResults(results) {
  // Remove the loading spinner
  searchResults.innerHTML = "";

  results.forEach((result) => {
    const url = `https://id.wikipedia.org/?curid=${result.pageid}`;
    const titleLink = `<a href="${url}" target="_blank" rel="noopener">${result.title} </a>`;
    const urlLink = `<a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>`;

    const resultItme = document.createElement("div");
    resultItme.className = "result-item";
    resultItme.innerHTML = `
        <h3 class="result-title">${titleLink}</h3>
        ${urlLink}
        <p class="result-snippet">${result.snippet}</p>
        `;

    searchResults.appendChild(resultItme);
  });
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    searchResults.innerHTML = "<p>Tolong Masukan Pencarian apa yang ingin anda cari </p>";
    return;
  }

  searchResults.innerHTML = "<div class='spinner'>Tunggu Sebentar... </div>";

  try {
    const results = await searchWikipeida(query);

    if (results.query.searchinfo.totalhits === 0) {
      searchResults.innerHTML = "<p>Data Tidak ditemukan </p>";
    } else {
      displayResults(results.query.search);
    }
  } catch (error) {
    console.error(error);
    searchResults.innerHTML = `<p>ada masalah error saat pencarian cobalah lagi lain kali </p>`;
  }
});

// Event listener for the theme toggler
themeToggler.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  if (body.classList.contains("dark-theme")) {
    themeToggler.textContent = "Gelap";
    themeToggler.style.background = "#fff";
    themeToggler.style.color = "#333";
  } else {
    themeToggler.textContent = "Terang";
    themeToggler.style.border = "2px solid #ccc";
    themeToggler.style.color = "#333";
  }
});