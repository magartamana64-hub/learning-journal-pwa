
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("video-container");
  if (!container) return;


  const video = document.createElement("iframe");
  video.width = "560";
  video.height = "315";
  video.src = "https://www.youtube.com/embed/CZTCciHE72I"; 
  video.title = "YouTube video player";
  video.frameBorder = "0";
  video.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  video.allowFullscreen = true;

  container.appendChild(video);
});
