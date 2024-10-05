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
  }

  const popularTable = document.getElementById("popular-keywords-table");
  const popularKeywordsHeader = document.querySelector("h1.hidden");

  if (popularTable) {
    // Show the history table on the query page if it has entries
    const popularTableBody = popularTable.querySelector("tbody");
    if (popularTableBody && popularTableBody.children.length > 0) {
      popularKeywordsHeader.classList.remove("hidden");
      popularTable.style.display = "table";
    }
  }
});
