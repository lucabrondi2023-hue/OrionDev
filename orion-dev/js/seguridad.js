/* =========================================
   🔒 PROTECCIÓN FRONTEND
========================================= */

/* BLOQUEAR CLICK DERECHO */
document.addEventListener("contextmenu", e => e.preventDefault());

/* BLOQUEAR SELECCIÓN */
document.addEventListener("selectstart", e => e.preventDefault());

/* BLOQUEAR ARRASTRAR */
document.addEventListener("dragstart", e => e.preventDefault());

/* BLOQUEAR COPIAR */
document.addEventListener("copy", e => e.preventDefault());

/* BLOQUEAR PEGAR */
document.addEventListener("paste", e => e.preventDefault());

/* BLOQUEAR CORTAR */
document.addEventListener("cut", e => e.preventDefault());

/* BLOQUEAR TECLAS DEVTOOLS */
document.addEventListener("keydown", function(e) {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
        return false;
    }

    // CTRL + SHIFT + I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
    }

    // CTRL + SHIFT + J
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
    }

    // CTRL + SHIFT + C
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
    }

    // CTRL + U
    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
    }

    // CTRL + S
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
    }

    // CTRL + P
    if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        return false;
    }

});

/* DETECTAR DEVTOOLS */
(function () {

    function detectDevTools() {

        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {

            document.body.innerHTML = `
                <div style="
                    margin:0;
                    height:100vh;
                    background:#050816;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-direction:column;
                    font-family:Arial;
                    color:white;
                ">
                    <h1 style="font-size:42px;margin-bottom:10px;">
                        ⚠️ Acceso Denegado
                    </h1>

                    <p style="
                        opacity:.7;
                        font-size:18px;
                    ">
                        DevTools detectado
                    </p>
                </div>
            `;

            document.body.style.overflow = "hidden";

        }

    }

    setInterval(detectDevTools, 500);

})();

/* DETECTAR DEBUGGER */
setInterval(function() {
    debugger;
}, 100);

/* OCULTAR CONSOLA */
console.log = function () {};
console.warn = function () {};
console.error = function () {};
console.info = function () {};

/* BLOQUEAR INSPECCIÓN EN ELEMENTOS */
document.onmousedown = function(e) {
    if (e.button == 2) {
        return false;
    }
};

/* ANTI IFRAME */
if (window.top !== window.self) {
    window.top.location = window.self.location;
}