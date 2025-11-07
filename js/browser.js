// Copy to clipboard feature
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const text = e.target.getAttribute("data-text");
    navigator.clipboard.writeText(text).then(() => {
      alert("Entry copied to clipboard!");
    });
  }
});

// Notification when saving entry
function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  } else {
    alert(message);
  }
}
