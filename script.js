/* =========================================================
   MAVÉ – Landing page
   ========================================================= */

// 1) CAMBIA AQUÍ TU NÚMERO DE WHATSAPP
//    Código de país + número, sin "+", espacios ni guiones.
//    Ejemplo Bolivia: "59171234567"
const WHATSAPP_NUMBER = "";

document.documentElement.classList.remove("no-js");

// ---------- Enlaces de WhatsApp ----------
// Cada enlace con data-wa="mensaje" abre WhatsApp con ese mensaje ya escrito.
(function setupWhatsApp() {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const base = "https://wa.me/" + number;

  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = base + "?text=" + encodeURIComponent(link.dataset.wa);
    link.target = "_blank";
    link.rel = "noopener";
  });

  document.querySelectorAll(".js-wa-number").forEach((el) => {
    el.textContent = number ? "+" + number : "[TU NÚMERO]";
  });
})();

// ---------- Menú móvil ----------
(function setupMenu() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

// ---------- Pestañas de paquetes ----------
(function setupTabs() {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  const select = (tab) => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !active;
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    // Navegación con flechas del teclado
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); select(next); next.focus(); }
    });
  });
})();

// ---------- Visor de fotos (galería) ----------
(function setupLightbox() {
  const dialog = document.querySelector(".lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const big = dialog.querySelector("img");

  document.querySelectorAll(".gallery__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const img = btn.querySelector("img");
      big.src = img.src;
      big.alt = img.alt;
      dialog.showModal();
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  // Cerrar al hacer clic fuera de la foto
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
})();

// ---------- Aparición suave al hacer scroll ----------
(function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
})();

// ---------- Año del footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
