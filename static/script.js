document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchInput = document.getElementById("search");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting
      const keywords = searchInput.value.trim();
      if (keywords === "") {
        alert("Please enter some text to search.");
        return;
      }

      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `keywords=${encodeURIComponent(keywords)}`,
      })
        .then((response) => response.text())
        .then((html) => {
          document.open();
          document.write(html);
          document.close();
        });
    });
  } else {
    const resultsTable = document.getElementById("results-table");
    const resultsTableBody = resultsTable.querySelector("tbody");
    const popularTable = document.getElementById("popular-keywords-table");
    const popularTableBody = popularTable.querySelector("tbody");
    const currentKeywordsHeader = document.querySelector("h1:nth-of-type(1)");
    const popularKeywordsHeader = document.querySelector("h1:nth-of-type(2)");

    // Show the headers and tables
    currentKeywordsHeader.classList.remove("hidden");
    popularKeywordsHeader.classList.remove("hidden");
    resultsTable.style.display = "table";
    popularTable.style.display = "table";
  }
});
