/* =========================================
   LÓGICA GESTOR DE CORREO - v2.5
   ========================================= */

const templates = {
    bienvenida: {
        fields: ["nombre", "telefono"],
        es: { subject: "Bienvenido a Layer4 Solutions - Alta de línea {{telefono}}", text: "Hola {{nombre}},\n\n¡Bienvenido a Layer4 Solutions! Tu línea {{telefono}} ya está activa." },
        en: { subject: "Welcome to Layer4 Solutions - Line activation {{telefono}}", text: "Hello {{nombre}},\n\nWelcome to Layer4 Solutions! Your line {{telefono}} is now active." },
        fr: { subject: "Bienvenue chez Layer4 Solutions - Activation {{telefono}}", text: "Bonjour {{nombre}},\n\nBienvenue ! Votre ligne {{telefono}} est désormais active." }
        // ... (Añadir el resto de idiomas aquí)
    },
    apn: {
        fields: ["telefono", "apn_valor"],
        es: { subject: "Configuración Internet - {{telefono}}", text: "Introduce estos datos en Ajustes:\nAPN: {{apn_valor}}" },
        en: { subject: "Internet Config - {{telefono}}", text: "Enter these settings in Settings:\nAPN: {{apn_valor}}" }
    },
    incidencianueva: {
        fields: ["tel_linea", "cod_cliente", "intro_manual", "direccion", "contacto", "tel_contacto", "detalle_incidencia"],
        es: { subject: "INCIDENCIA - {{tel_linea}} - {{cod_cliente}}", text: `Hola,\n\n{{intro_manual}}\n\nLínea: {{tel_linea}}\nDirección: {{direccion}}\nContacto: {{contacto}}\nTeléfono: {{tel_contacto}}\n\n{{detalle_incidencia}}\n\nUn saludo,` }
        // Aquí se podrían añadir plantillas para otros idiomas si se desea
    }
};
    

function renderForm() {
    const key = document.getElementById('tplSelect').value;
    const container = document.getElementById('dynamic-vars');
    if(!container) return;
    
    container.innerHTML = "";
    templates[key].fields.forEach(f => {
        const div = document.createElement('div');
        div.innerHTML = `<label style="font-size:11px; text-transform:uppercase;">${f.replace('_',' ')}</label>
                         <input type="text" id="field_${f}" oninput="updatePreview()" placeholder="Escribir...">`;
        container.appendChild(div);
    });
    updatePreview();
}

function updatePreview() {
    const key = document.getElementById('tplSelect').value;
    const lang = document.getElementById('langSelect').value;
    const tpl = templates[key][lang] || templates[key]['es'];
    
    let subject = tpl.subject;
    let body = tpl.text;
    
    templates[key].fields.forEach(f => {
        const val = document.getElementById('field_'+f).value || `[${f}]`;
        subject = subject.replace(`{{${f}}}`, val);
        body = body.replace(`{{${f}}}`, val);
    });
    
    document.getElementById('preview-subject').innerText = subject;
    document.getElementById('preview-body').innerText = body;
}

function sendMail() {
    const subject = encodeURIComponent(document.getElementById('preview-subject').innerText);
    const body = encodeURIComponent(document.getElementById('preview-body').innerText);
    // Esto abre la APP nativa (Outlook, Mail, etc.)
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function sendOutlookApp() {
    const subject = encodeURIComponent(document.getElementById('preview-subject').innerText);
    const body = encodeURIComponent(document.getElementById('preview-body').innerText);
    
    // Protocolo específico para forzar la apertura de la APP de Outlook Desktop
    // Nota: 'ms-outlook' es el comando que entiende Windows/Office
    const outlookUri = `ms-outlook:compose?subject=${subject}&body=${body}`;
    
    window.location.href = outlookUri;
}

function sendWA() {
    const body = encodeURIComponent(document.getElementById('preview-body').innerText);
    window.open(`https://wa.me/?text=${body}`, '_blank');
}

// Función auxiliar para copiar campos al hacer clic
// scripts/atencion_cliente.js

function copyField(id) {
    const element = document.getElementById(id);
    const text = element.innerText || element.textContent;
    
    if (text.trim() === "") return;

    navigator.clipboard.writeText(text).then(() => {
        // Feedback visual rápido
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = "#dcfce7"; // Verde clarito
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 300);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}
// Inicialización automática
document.addEventListener("DOMContentLoaded", renderForm);