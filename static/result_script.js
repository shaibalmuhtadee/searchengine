document.addEventListener("DOMContentLoaded", function () {
  const resultsTable = document.getElementById("results-table");
  const popularTable = document.getElementById("popular-keywords-table");
  const currentKeywordsHeader = document.querySelector("h1:nth-of-type(1)");
  const popularKeywordsHeader = document.querySelector("h1:nth-of-type(2)");

  if (resultsTable && popularTable) {
    // Show the headers and tables
    currentKeywordsHeader.classList.remove("hidden");
    popularKeywordsHeader.classList.remove("hidden");
    resultsTable.style.display = "table";
    popularTable.style.display = "table";
  }
});
