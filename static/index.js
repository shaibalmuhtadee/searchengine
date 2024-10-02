document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchInput = document.getElementById("search");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const text = searchInput.value.trim();
    if (text === "") {
      alert("Please enter some text to search.");
      return;
    }

    const wordCountMap = getWordCountMap(text);
    localStorage.setItem("wordCountMap", JSON.stringify(wordCountMap));
    console.log(localStorage.getItem("wordCountMap"));
    location.href = "/result";
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
});