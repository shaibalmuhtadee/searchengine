document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchInput = document.getElementById("search");
  const resultsTable = document.getElementById("results-table");
  const resultsTableBody = resultsTable.querySelector("tbody");
  const popularTable = document.getElementById("popular-keywords-table");
  const popularTableBody = popularTable.querySelector("tbody");
  const maxPopularWords = 20;
  let popularWordCountPQ = [];

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const text = searchInput.value.trim();
    if (text === "") {
      alert("Please enter some text to search.");
      return;
    }

    const wordCountMap = getWordCountMap(text);
    displayResults(wordCountMap);
    updatePopularWords(wordCountMap);
    displayPopularWords();
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

  function updatePopularWords(wordCountMap) {
    for (const [word, count] of Object.entries(wordCountMap)) {
      const existingWordIndex = popularWordCountPQ.findIndex((entry) => entry.word === word);
      if (existingWordIndex !== -1) {
        popularWordCountPQ[existingWordIndex].count += count;
      } else {
        popularWordCountPQ.push({ word, count });
      }

      popularWordCountPQ.sort((a, b) => b.count - a.count);

      if (popularWordCountPQ.length > maxPopularWords) {
        popularWordCountPQ = popularWordCountPQ.slice(0, maxPopularWords);
      }
    }
  }

  function displayPopularWords() {
    popularTableBody.innerHTML = "";
    popularWordCountPQ.forEach(({ word, count }) => {
      const row = document.createElement("tr");
      const wordCell = document.createElement("td");
      const countCell = document.createElement("td");
      wordCell.textContent = word;
      countCell.textContent = count;
      row.appendChild(wordCell);
      row.appendChild(countCell);
      popularTableBody.appendChild(row);
    });
    popularTable.style.display = "table";
  }
});
