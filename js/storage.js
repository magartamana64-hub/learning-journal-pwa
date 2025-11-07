document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("entry-form");
  const list = document.getElementById("entry-list");
  const clearBtn = document.getElementById("clear-entries");


  loadEntries();


  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("entry-title").value.trim();
    const content = document.getElementById("entry-content").value.trim();
    if (!title || !content) return alert("Please fill out both fields.");

    const newEntry = { title, content, date: new Date().toLocaleString() };
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));
    form.reset();
    loadEntries();
    showNotification("New journal entry saved!");
  });

 
  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    list.innerHTML = "";
    if (entries.length === 0) {
      list.innerHTML = "<p>No journal entries yet.</p>";
      return;
    }
    entries.forEach((entry) => {
      const article = document.createElement("article");
      article.classList.add("journal-entry");
      article.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.content}</p>
        <small>${entry.date}</small>
        <button class="btn copy-btn" data-text="${entry.content}">Copy</button>
      `;
      list.appendChild(article);
    });
  }


  clearBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all journal entries?")) {
      localStorage.removeItem("entries");
      list.innerHTML = "<p>All journal entries have been cleared.</p>";
      showNotification("All journal entries cleared!");
    }
  });
});
