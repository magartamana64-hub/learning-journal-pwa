document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  if (header) {
    header.innerHTML = `
      <nav>
        <h1 class="logo">Learning Journal</h1>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="journal.html">Journal</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </nav>
    `;
  }

  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

//live datetime

function updateDateTime() {
  const dateTimeElement = document.getElementById("date-time");
  if (dateTimeElement) {
    const now = new Date();
    dateTimeElement.textContent = `Today is ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }
}
setInterval(updateDateTime, 1000);

//theme switcher script

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

   
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
});



