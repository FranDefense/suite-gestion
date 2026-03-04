let currentBrand = 'ios';
let navHistory = [];

// LA BASE DE DATOS: Debe tener todas las marcas que aparecen en los botones
const db = {
    ios: {
        ajustes: [
            { label: "📶 Datos móviles", next: "datos", step: "Entra en 'Datos móviles'" },
            { label: "✈️ Modo Avión", toggle: true, step: "Verifica que esté desactivado." }
        ],
        datos: [
            { label: "📍 Red de datos móviles", next: "apn", step: "Entra en 'Red de datos móviles'" }
        ],
        apn: [{ label: "Punto de acceso: internet", final: true, step: "Escribe 'internet' en el APN." }],
        errors: [{ label: "❌ No tiene internet", next: "ajustes", step: "Iniciando diagnóstico..." }]
    },
    samsung: {
        ajustes: [
            { label: "📡 Conexiones", next: "conexiones", step: "Entra en 'Conexiones'" }
        ],
        conexiones: [
            { label: "🌐 Redes móviles", next: "redes", step: "Entra en 'Redes móviles'" }
        ],
        redes: [
            { label: "📍 Nombres de punto de acceso", next: "apn", step: "Entra en 'Nombres de punto de acceso'" }
        ],
        apn: [{ label: "Añadir: internet", final: true, step: "Configura el APN con el nombre 'internet'." }]
    },
    xiaomi: {
        ajustes: [
            { label: "📶 Tarjetas SIM y redes", next: "sim", step: "Entra en 'Tarjetas SIM y redes móviles'" }
        ],
        sim: [{ label: "Ajustes avanzados", next: "apn", step: "Busca 'Nombres de Puntos de Acceso'" }],
        apn: [{ label: "Nuevo APN", final: true, step: "Crea un APN llamado 'internet'" }]
    },
    android: {
        ajustes: [
            { label: "🌐 Redes e Internet", next: "red", step: "Entra en 'Redes e Internet'" }
        ],
        red: [{ label: "SIMs", next: "apn", step: "Busca la opción de APN dentro de la SIM" }],
        apn: [{ label: "Puntos de acceso", final: true, step: "Verifica que el APN sea 'internet'" }]
    }
};

function selectBrand(brand) {
    currentBrand = brand;
    // Actualizar visual de los botones
    document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById('card-' + brand);
    if (activeCard) activeCard.classList.add('active');
    
    resetSim();
}

function resetSim() {
    navHistory = [];
    const screen = document.getElementById('phone-screen');
    if(screen) {
        screen.style.backgroundImage = "url('logo_layer4.png')";
        screen.style.backgroundColor = "white";
    }
    document.getElementById('back-nav').style.display = "none";
    document.getElementById('guide-steps').innerHTML = ""; // Limpiar guía al reiniciar
    renderHome();
}

function renderHome() {
    const display = document.getElementById('phone-display');
    display.innerHTML = `
        <div class="home-grid">
            <div class="app-icon-wrap" onclick="startSettings()">
                <div class="app-icon icon-set">⚙️</div>
                <span style="font-size:10px; color:#333; font-weight:bold;">Ajustes</span>
            </div>
        </div>`;
}

function startSettings() {
    const screen = document.getElementById('phone-screen');
    if(screen) {
        screen.style.backgroundImage = "none";
        screen.style.backgroundColor = "#f2f2f7";
    }
    renderMenu('ajustes');
}

function renderMenu(key) {
    // Si la marca no existe en la DB, abortamos para evitar el error
    if (!db[currentBrand]) {
        console.error("Marca no definida en la base de datos:", currentBrand);
        return;
    }

    if (navHistory[navHistory.length - 1] !== key) navHistory.push(key);
    
    const backBtn = document.getElementById('back-nav');
    if(backBtn) backBtn.style.display = "flex";

    const menu = db[currentBrand][key] || [];
    const display = document.getElementById('phone-display');
    
    display.innerHTML = `<div style="padding:15px; font-weight:800; color:var(--primary); font-size:12px; border-bottom:1px solid #ddd;">${key.toUpperCase()}</div>`;
    
    menu.forEach(item => {
        const div = document.createElement('div');
        div.className = "menu-row";
        div.innerHTML = `<span>${item.label}</span> <span>❯</span>`;
        div.onclick = () => {
            if (item.step) addStep(item.step);
            if (item.next) renderMenu(item.next);
        };
        display.appendChild(div);
    });
}

function goBack() {
    navHistory.pop();
    if (navHistory.length === 0) {
        resetSim();
    } else {
        const prev = navHistory.pop();
        renderMenu(prev);
    }
}

function addStep(msg) {
    const guide = document.getElementById('guide-steps');
    if(guide) {
        guide.innerHTML += `<div class="step-box">${msg}</div>`;
        guide.scrollTop = guide.scrollHeight;
    }
}

// INICIALIZACIÓN: Arranca con iOS por defecto
document.addEventListener("DOMContentLoaded", () => {
    selectBrand('ios');
});