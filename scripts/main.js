/* =========================================
   LÓGICA GLOBAL - LAYER4 SOLUTIONS v2.5
   ========================================= */

// 1. CARGA MODULAR DE COMPONENTES
async function cargarComponentes() {
    try {
        const [resNav, resFoot] = await Promise.all([
            fetch('comp/nav.html'),
            fetch('comp/footer.html')
        ]);
        
        const navHTML = await resNav.text();
        const footHTML = await resFoot.text();

        if(document.getElementById('nav-placeholder')) {
            document.getElementById('nav-placeholder').innerHTML = navHTML;
        }
        if(document.getElementById('footer-placeholder')) {
            document.getElementById('footer-placeholder').innerHTML = footHTML;
        }
        
        // Inicializar estado de red tras cargar el nav
        updateOnlineStatus(); 
    } catch (err) {
        console.error("Error cargando componentes modulares:", err);
    }
}

// 2. GESTIÓN DE ESTADO DE RED
function updateOnlineStatus() {
    const s = document.getElementById('network-status');
    const t = document.getElementById('status-text');
    if (!s) return;
    
    if (navigator.onLine) {
        s.className = 'online';
        if (t) t.innerText = 'Online';
    } else {
        s.className = 'offline';
        if (t) t.innerText = 'Modo Offline';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// 3. LÓGICA DE ACTUALIZACIÓN (PWA)
let newWorker;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        reg.addEventListener('updatefound', () => {
            newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateToast();
                }
            });
        });
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

function showUpdateToast() {
    const toast = document.getElementById('update-toast');
    if (toast) {
        toast.style.display = 'flex';
        // Sonido de notificación v2.0
        const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7838575c34.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio bloqueado por navegador"));
    }
}

function actualizarApp() {
    if (newWorker) newWorker.postMessage({ action: 'skipWaiting' });
}

// EJECUCIÓN INICIAL
document.addEventListener("DOMContentLoaded", cargarComponentes);