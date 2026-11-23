document.addEventListener("DOMContentLoaded", () => {
  const knoppen = document.querySelectorAll("[data-submenu-toggle]");

  knoppen.forEach((knop) => {
    const item = knop.closest("li");
    const submenu = item ? item.querySelector("[data-submenu]") : null;

    if (!submenu) {
      return;
    }

    function zetOpen(open) {
      knop.setAttribute("aria-expanded", String(open));
      submenu.classList.toggle("hidden", !open);
    }

    knop.addEventListener("click", () => {
      const isOpen = knop.getAttribute("aria-expanded") === "true";
      zetOpen(!isOpen);
    });

    item.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        zetOpen(false);
        knop.focus();
      }
    });
  });
});