document.addEventListener("DOMContentLoaded", function () {
  const resultsTable = document.getElementById("results");
  const resultsTableBody = resultsTable.querySelector("tbody");

  const wordCountMap = JSON.parse(localStorage.getItem("wordCountMap"));
  console.log(localStorage.getItem("wordCountMap"));
  if (wordCountMap) {
    displayResults(wordCountMap);
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
});