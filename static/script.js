document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchInput = document.getElementById("search");
  const resultsTable = document.getElementById("results-table");
  const resultsTableBody = resultsTable.querySelector("tbody");
  const popularTable = document.getElementById("popular-keywords-table");
  const popularTableBody = popularTable.querySelector("tbody");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const keywords = searchInput.value.trim();
    if (keywords === "") {
      alert("Please enter some text to search.");
      return;
    }

    fetch(`/search?keywords=${encodeURIComponent(keywords)}`)
      .then((response) => response.json())
      .then((data) => {
        displayResults(getWordCountMap(keywords));
        displayPopularWords(data);
      });
  });

  function getWordCountMap(text) {
    const words = text.split(/\s+/);
    const wordCountMap = {};
    words.forEach((word) => {
      word = word.toLowerCase();
      if (wordCountMap[word]) {
        wordCountMap[word]++;
      } else {
        wordCountMap[word] = 1;
      }
    });
    return wordCountMap;
  }

  function displayResults(wordCountMap) {
    resultsTableBody.innerHTML = ""; // Clear previous results
    for (const [word, count] of Object.entries(wordCountMap)) {
      const row = document.createElement("tr");
      const wordCell = document.createElement("td");
      const countCell = document.createElement("td");
      wordCell.textContent = word;
      countCell.textContent = count;
      row.appendChild(wordCell);
      row.appendChild(countCell);
      resultsTableBody.appendChild(row);
    }
    resultsTable.style.display = "table";
  }

  function displayPopularWords(popularWords) {
    console.log("Top 20 Keywords:", popularWords); // Log the popularWords data structure
    popularTableBody.innerHTML = ""; // Clear previous results
    for (const [word, count] of Object.entries(popularWords)) {
      const row = document.createElement("tr");
      const wordCell = document.createElement("td");
      const countCell = document.createElement("td");
      wordCell.textContent = word;
      countCell.textContent = count;
      row.appendChild(wordCell);
      row.appendChild(countCell);
      popularTableBody.appendChild(row);
    }
    popularTable.style.display = "table";
  }
});
