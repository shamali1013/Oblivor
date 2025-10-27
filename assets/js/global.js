document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", function (e) {
  if (
    e.ctrlKey &&
    (e.key === "u" || e.key === "s" || (e.shiftKey && e.key === "I"))
  ) {
    e.preventDefault();
  }
});