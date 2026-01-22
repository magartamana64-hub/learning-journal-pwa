async function fetchReflections() {
  const res = await fetch("/api/reflections");
  return await res.json();
}

function processWords(entries) {
  const stopWords = ["the", "and", "to", "of", "i", "a", "was", "is", "it", "in", "for"];
  const wordCount = {};

  entries.forEach(entry => {
    const words = entry.reflection
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ");

    words.forEach(word => {
      if (word.length > 3 && !stopWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
  });

  return wordCount;
}

function renderChart(wordData) {
  const sorted = Object.entries(wordData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  new Chart(document.getElementById("wordChart"), {
    type: "bar",
    data: {
      labels: sorted.map(w => w[0]),
      datasets: [{
        label: "Word Frequency",
        data: sorted.map(w => w[1])
      }]
    }
  });
}


function drawWordCloud(wordData) {
  const canvas = document.getElementById("wordCloud");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let x = 50;
  let y = 60;

  Object.entries(wordData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([word, count]) => {
      ctx.font = `${10 + count * 3}px Arial`;
      ctx.fillText(word, x, y);
      y += 40;
      if (y > 350) {
        y = 60;
        x += 150;
      }
    });
}

(async function initDashboard() {
  const entries = await fetchReflections();
  const wordData = processWords(entries);
  renderChart(wordData);
  drawWordCloud(wordData);
})();
