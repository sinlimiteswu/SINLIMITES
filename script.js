// ================= EDITA SOLO ESTA PARTE =================
const WEB = {
  nombre: "Nombre de tu curso",
  frase: "Escribe aquí en una frase qué va a conseguir quien haga el curso.",
  aprenderas: [
    "Primer objetivo concreto del curso",
    "Segundo objetivo concreto del curso",
    "Tercer objetivo concreto del curso"
  ],
  profesor: {
    nombre: "Tu nombre",
    bio: "Cuenta en dos o tres frases quién eres, tu experiencia y por qué puedes enseñar este tema.",
    foto: ""   // opcional: pon "foto.jpg" y sube ese archivo junto a index.html
  },
  contacto: {
    texto: "¿Tienes dudas sobre el curso? Escríbeme y te respondo lo antes posible.",
    whatsapp: "34600000000",       // prefijo del país + número, sin + ni espacios
    email: "tucorreo@ejemplo.com"
  }
};

// id = lo que va después de "v=" en el enlace de YouTube
const lecciones = [
  { id: "ID_VIDEO_1", titulo: "Lección 1: Introducción", duracion: "10 min",
    descripcion: "Qué vamos a ver y cómo aprovechar el curso." },
  { id: "ID_VIDEO_2", titulo: "Lección 2: Primeros pasos", duracion: "15 min",
    descripcion: "Descripción corta de esta lección." },
  { id: "ID_VIDEO_3", titulo: "Lección 3: Práctica", duracion: "20 min",
    descripcion: "Descripción corta de esta lección." }
];
// =========================================================

const $ = id => document.getElementById(id);

document.title = WEB.nombre;
$("marca").textContent = WEB.nombre;
$("nombre-curso").textContent = WEB.nombre;
$("frase").textContent = WEB.frase;
WEB.aprenderas.forEach(t => { const li = document.createElement("li"); li.textContent = t; $("aprenderas").appendChild(li); });

$("prof-nombre").textContent = WEB.profesor.nombre;
$("prof-bio").textContent = WEB.profesor.bio;
if (WEB.profesor.foto) {
  const img = document.createElement("img");
  img.src = WEB.profesor.foto; img.alt = "Foto de " + WEB.profesor.nombre;
  $("foto").appendChild(img);
} else {
  $("foto").textContent = WEB.profesor.nombre.trim().charAt(0).toUpperCase();
}

$("contacto-texto").textContent = WEB.contacto.texto;
$("btn-whatsapp").href = "https://wa.me/" + WEB.contacto.whatsapp +
  "?text=" + encodeURIComponent("Hola, tengo una duda sobre el curso.");
$("btn-email").href = "mailto:" + WEB.contacto.email;
$("pie").textContent = "© " + new Date().getFullYear() + " " + WEB.nombre;

lecciones.forEach((l, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="#leccion-${i + 1}">${l.titulo}<small>${l.duracion}</small></a>`;
  $("lista").appendChild(li);
});

function mostrar() {
  const m = location.hash.match(/^#leccion-(\d+)$/);
  const n = m ? parseInt(m[1], 10) : 1;
  const i = Math.min(Math.max(n, 1), lecciones.length) - 1;
  const l = lecciones[i];
  $("titulo").textContent = l.titulo;
  $("descripcion").textContent = l.descripcion;
  $("video").innerHTML = l.id.startsWith("ID_VIDEO")
    ? '<div class="aviso">Pon aquí el ID de tu vídeo de YouTube en la lista de lecciones.</div>'
    : `<iframe src="https://www.youtube-nocookie.com/embed/${l.id}?rel=0"
         title="${l.titulo}" allow="fullscreen" allowfullscreen></iframe>`;
  $("lista").querySelectorAll("a").forEach((a, j) =>
    a.setAttribute("aria-current", j === i ? "true" : "false"));
  if (m) $("curso").scrollIntoView();
}
window.addEventListener("hashchange", mostrar);
mostrar();