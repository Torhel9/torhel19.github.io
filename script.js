const CONTACT_EMAIL = "post@seilforeningsappen.no";
const SUBJECT = "Forespørsel: Demo Seilforeningsappen";

const $ = (s, r = document) => r.querySelector(s);

/* Year */
$("#year").textContent = new Date().getFullYear();

/* Modal */
const modal = $("#demoModal");
const backdrop = $("#modalBackdrop");
const closeBtn = $("#closeModal");
const cancelBtn = $("#cancelModal");

function openModal(){
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("#demoForm input[name='name']")?.focus(), 0);
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

["#openDemoTop","#openDemoHero","#openDemoBottom"].forEach(id => {
  $(id)?.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
});

backdrop?.addEventListener("click", closeModal);
closeBtn?.addEventListener("click", closeModal);
cancelBtn?.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

/* Mailto */
function mailtoFromForm(fd){
  const lines = [
    `Navn: ${fd.get("name")}`,
    `E-post: ${fd.get("email")}`,
    `Forening: ${fd.get("club")}`,
    `Starter med: ${fd.get("start")}`,
    "",
    "Melding:",
    fd.get("message") || ""
  ];
  const body = encodeURIComponent(lines.join("\n"));
  const subject = encodeURIComponent(SUBJECT);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

$("#demoForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  mailtoFromForm(fd);
  e.currentTarget.reset();
  closeModal();
});
