document.addEventListener("DOMContentLoaded", () => {
  const lijstEl = document.querySelector("#projecten-lijst");
  const templateEl = document.querySelector("#project-template");
  const ladenEl = document.querySelector("#status-laden");
  const leegEl = document.querySelector("#status-leeg");
  const foutEl = document.querySelector("#status-fout");

  if (!lijstEl || !templateEl || !ladenEl || !leegEl || !foutEl) {
    return;
  }

  function toonToestand(toestand) {
    ladenEl.classList.toggle("hidden", toestand !== "laden");
    leegEl.classList.toggle("hidden", toestand !== "leeg");
    foutEl.classList.toggle("hidden", toestand !== "fout");
  }

  toonToestand("laden");

  fetch("json/projecten.js")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP-fout: ${response.status}`);
      }
      return response.json();
    })
    .then((projecten) => {
      lijstEl.textContent = "";

      if (!Array.isArray(projecten) || projecten.length === 0) {
        toonToestand("leeg");
        return;
      }

      const fragment = document.createDocumentFragment();

      projecten.forEach((project) => {
        const kloon = templateEl.content.cloneNode(true);
        const img = kloon.querySelector("img");
        const titel = kloon.querySelector("h2");
        const samenvatting = kloon.querySelector("p");
        const link = kloon.querySelector("a");

        if (img) {
          img.src = project.afbeelding || "";
          img.alt = project.alt || "";
        }
        if (titel) {
          titel.textContent = project.titel || "";
        }
        if (samenvatting) {
          samenvatting.textContent = project.samenvatting || "";
        }
        if (link) {
          link.href = project.link || "#";
        }

        fragment.appendChild(kloon);
      });

      lijstEl.appendChild(fragment);
      toonToestand("klaar");
    })
    .catch(() => {
      toonToestand("fout");
    });
});