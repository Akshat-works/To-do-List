const toggleButton = document.getElementById("theme-toggle");

if (localStorage.getItem("light-mode") === "enabled") {
  document.body.classList.add("light-mode");
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("light-mode", "enabled");
  } else {
    localStorage.setItem("light-mode", "disabled");
  }
});
