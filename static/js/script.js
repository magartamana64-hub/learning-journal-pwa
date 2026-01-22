document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  if (header) {
    header.innerHTML = `
      <nav>
        <h1 class="logo">Learning Journal</h1>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/reflections">Journal</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
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


if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("Service worker registered"))
            .catch(err => console.log("SW registration failed:", err));
    });
}

window.addEventListener("offline", () => {
    document.getElementById("offline-banner").style.display = "block";
});

window.addEventListener("online", () => {
    document.getElementById("offline-banner").style.display = "none";
});

