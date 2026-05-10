/* ==========================================
   CONFIGURACIONES INICIALES
========================================== */
const VIP_PASSWORD = "aekg@oaf6549";
let currentImages = [];
let currentIndex = 0;
let vipButton = null;

/* ==========================================
   PARTICULAS
========================================== */
particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#0ea5e9" },
        shape: { type: "circle" },
        opacity: { value: 0.2, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 150, color: "#0ea5e9", opacity: 0.1, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "push" } }
    }
});

/* ==========================================
   FILTROS (BUSCADOR Y CATEGORIAS)
========================================== */
function filterContent() {
    let text = document.getElementById("searchBar").value.toLowerCase();
    document.querySelectorAll(".plan").forEach(card => {
        let name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(text) ? "flex" : "none";
    });
}

function filterCategory(cat, btn) {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".plan").forEach(card => {
        let category = card.dataset.category;
        card.style.display = (cat === "all" || cat === category) ? "flex" : "none";
    });
}

/* ==========================================
   SISTEMA DE GALERIA
========================================== */
function openGallery(images) {
    currentImages = images;
    currentIndex = 0;
    document.getElementById("modalImg").src = currentImages[currentIndex];
    document.getElementById("galleryModal").style.display = "flex";
    document.body.style.overflow = "hidden"; // Evita scroll
}

function closeGallery() {
    document.getElementById("galleryModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function changeImg(step) {
    currentIndex += step;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    document.getElementById("modalImg").src = currentImages[currentIndex];
}

/* ==========================================
   SISTEMA DE DESCARGAS Y VIP
========================================== */
function startDownload(button, event) {
    event.preventDefault();
    const category = button.closest(".plan").dataset.category;

    if (category === "vip") {
        vipButton = button;
        openVipModal();
        return;
    }
    processDownload(button);
}

function processDownload(button) {
    const url = button.getAttribute("href");
    const originalText = button.innerHTML;

    button.classList.add("success");
    button.innerHTML = "<span>¡Iniciando! ✓</span>";

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#0ea5e9', '#10b981', '#ffffff']
    });

    setTimeout(() => {
        window.location.href = url;
    }, 1000);

    setTimeout(() => {
        button.classList.remove("success");
        button.innerHTML = originalText;
    }, 4000);
}

function openVipModal() {
    const modal = document.getElementById("vipModal");
    modal.style.display = "flex";
    document.getElementById("vipPassword").focus();
}

function closeVipModal() {
    document.getElementById("vipModal").style.display = "none";
    document.getElementById("errorVip").innerText = "";
    document.getElementById("vipPassword").value = "";
}

function verifyVipPassword() {
    const pass = document.getElementById("vipPassword").value;
    if (pass === VIP_PASSWORD) {
        closeVipModal();
        processDownload(vipButton);
    } else {
        const error = document.getElementById("errorVip");
        error.innerText = "Contraseña incorrecta ❌";
        error.style.color = "#ef4444";
        // Efecto vibración simple
        document.querySelector(".vip-box").style.animation = "none";
        setTimeout(() => { document.querySelector(".vip-box").style.animation = "shake 0.3s"; }, 10);
    }
}

/* ==========================================
   CONTADORES DINÁMICOS
========================================= */
let ventas = 127;
let clientes = 89;

setInterval(() => {
    ventas += Math.floor(Math.random() * 2);
    clientes += Math.floor(Math.random() * 2);
    document.getElementById("ventasCount").innerText = ventas;
    document.getElementById("clientesCount").innerText = clientes;
}, 15000);

/* CERRAR MODALES CON ESCAPE O CLICK FUERA */
window.addEventListener("click", (e) => {
    if (e.target.classList.contains('modal')) {
        closeGallery();
        closeVipModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeGallery();
        closeVipModal();
    }
    if (e.key === "Enter" && document.getElementById("vipModal").style.display === "flex") {
        verifyVipPassword();
    }
});