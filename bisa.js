
// Js modal Slide-Up 

const overlay = document.getElementById("overlay");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");

const sheetTitle = document.getElementById("sheetTitle");
const sheetContent = document.getElementById("sheetContent");

function openSheet() {
  document.getElementById("sheet").classList.add("active");
  overlay.classList.add("active");

  document.getElementById("sheetImage").src = image[index];
  document.getElementById("sheetText").textContent = texts[index];

  sidebar.style.left = "-300px";
}

function closeSheet() {
  document.getElementById("sheet").classList.remove("active");
  overlay.classList.remove("active");

  if (sidebar.style.left !== "0px") {
  overlay.classList.remove("active");
  }
}

// image
const image = [
"fotofoto.png",
"bapak.png",
"sutradara.png",
"penulis.png",
"utama.png",
"1tambahan.png",
]

const texts = [
  "Foto-foto semasa latihan Uprak",
  "Produser",
  "Sutradara & Asisten Sutradara",
  "Penulis Naskah",
  "Pemeran Utama",
  "Pemeran Pendamping",
];
let index = 0;

function changeText() {
  const textEl = document.getElementById("sheetText");

  // animasi keluar
  textEl.classList.add("hide");

  setTimeout(() => {
    index = (index + 1) % texts.length;
    textEl.textContent = texts[index];
    // animasi masuk
    textEl.classList.remove("hide");
    textEl.classList.add("show");
  }, 400);
}

function AfterText() {
  const textEl = document.getElementById("sheetText");
  const imgEl = document.getElementById("sheetImage");


  // animasi keluar
  textEl.classList.add("hide");
  

  setTimeout(() => {
    index = (index + 1) % texts.length;
    textEl.textContent = texts[index];
    imgEl.src = image[index];

    // animasi masuk
    textEl.classList.remove("hide");
    textEl.classList.add("show");
  }, 400);
}

function BeforeText() {
  const textEl = document.getElementById("sheetText");
  const imgEl = document.getElementById("sheetImage");

  // animasi keluar
  textEl.classList.add("hide");

  setTimeout(() => {
    index = (index - 1 + texts.length) % texts.length;
    textEl.textContent = texts[index];
    imgEl.src = image[index];

    // animasi masuk
    textEl.classList.remove("hide");
    textEl.classList.add("show");
  }, 400);
}

// sidebar //

menuBtn.addEventListener("click", () => {
  sidebar.style.left = "0";
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.style.left = "-300px";
  overlay.classList.remove("active");

  if (!document.getElementById("sheet").classList.contains("active")) {
    overlay.classList.remove("active")
    }
});

overlay.addEventListener("click", () => {
  sidebar.style.left = "-300px";
  overlay.classList.remove("active");

  document.getElementById("sheet").classList.remove("active");
  overlay.classList.remove("active");
});


if (typeof type !== "undefined" && type === "produser") {
    sheetTitle.textContent = "Produser";
    sheetContent.textContent = "Informasi tentang produser drama.";
  }
