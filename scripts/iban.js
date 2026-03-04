// 1. Configuración de longitudes por país
const IBAN_CONFIG = {
    "ES": { bankLen: 4, nombre: "España" },
    "AT": { bankLen: 5, nombre: "Austria" },
    "DE": { bankLen: 8, nombre: "Deutschland" }
};

// 2. Base de datos unificada (Clave: País + Código Banco)
const BANCOS_DETALLE = {
    // --- ESPAÑA ---
    "ES0049": { nombre: "BANCO SANTANDER, S.A.", direccion: "PASEO DE PEREDA 9-12", postal: "39004 SANTANDER", bic: "BSCHESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES0182": { nombre: "BANCO BILBAO VIZCAYA ARGENTARIA, S.A. (BBVA)", direccion: "PLAZA DE SAN NICOLÁS 4", postal: "48005 BILBAO", bic: "BBVAESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES2100": { nombre: "CAIXABANK, S.A.", direccion: "CALLE PINTOR SOROLLA 2-4", postal: "46002 VALENCIA", bic: "CAIXESBBXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES0081": { nombre: "BANCO DE SABADELL, S.A.", direccion: "AVENIDA OSCAR ESPLÁ 37", postal: "03007 ALICANTE", bic: "BSABESBBXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES0128": { nombre: "BANKINTER, S.A.", direccion: "PASEO DE LA CASTELLANA 29", postal: "28046 MADRID", bic: "BKTRE SMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES2080": { nombre: "ABANCA CORPORACIÓN BANCARIA, S.A.", direccion: "CALLE RÚA NUEVA 30", postal: "15003 A CORUÑA", bic: "CAGLESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES2103": { nombre: "UNICAJA BANCO, S.A.", direccion: "AVENIDA DE ANDALUCÍA 10-12", postal: "29007 MÁLAGA", bic: "UNIC ESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES2085": { nombre: "IBERCAJA BANCO, S.A.", direccion: "PLAZA DE BASILIO PARAÍSO 2", postal: "50008 ZARAGOZA", bic: "CAZRE SMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES2095": { nombre: "KUTXABANK, S.A.", direccion: "GRAN VÍA 30-32", postal: "48009 BILBAO", bic: "KUTXESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES0061": { nombre: "BANCA MARCH, S.A.", direccion: "AVENIDA ALEJANDRO ROSSELLÓ 8", postal: "07002 PALMA DE MALLORCA", bic: "BMRCESMMXXX", sepa: ["SCT", "SDD", "B2B"] },
    "ES0073": { nombre: "OPEN BANK, S.A.", direccion: "PASEO DE LA CASTELLANA 24", postal: "28046 MADRID", bic: "OPEB ESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES0239": { nombre: "EVO BANCO, S.A.", direccion: "CALLE SERRANO 45", postal: "28001 MADRID", bic: "EVOB ESMMXXX", sepa: ["SCT", "SDD", "SCT Inst"] },
    "ES0019": { nombre: "DEUTSCHE BANK SAE", direccion: "PASEO DE LA CASTELLANA 18", postal: "28046 MADRID", bic: "DEUT ESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES1491": { nombre: "TRIODOS BANK N.V. S.E.", direccion: "CALLE JOSÉ ECHEGARAY 5", postal: "28232 LAS ROZAS (MADRID)", bic: "TRIO ESMMXXX", sepa: ["SCT", "SDD"] },
    "ES3058": { nombre: "CAJAMAR CAJA RURAL, S.C.C.", direccion: "PLAZA de BARCELONA 5", postal: "04006 ALMERÍA", bic: "CAGRE SMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES3059": { nombre: "CAJA RURAL DE ASTURIAS, S.C.C.", direccion: "CALLE MELQUIADES ÁLVAREZ 7", postal: "33003 OVIEDO", bic: "BCOEESMM059", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "ES3183": { nombre: "CAJA DE ARQUITECTOS S.C.C. (ARQUIA)", direccion: "CALLE BARQUILLO 6", postal: "28004 MADRID", bic: "ARQUESMMXXX", sepa: ["SCT", "SDD", "B2B"] },
    "ES0234": { nombre: "BANCO CAMINOS, S.A.", direccion: "CALLE ALMAGRO 8", postal: "28010 MADRID", bic: "BAME ESMMXXX", sepa: ["SCT", "SDD", "B2B"] },
    "ES0198": { nombre: "BANCO COOPERATIVO ESPAÑOL, S.A.", direccion: "CALLE VIRGEN DE LOS PELIGROS 4", postal: "28013 MADRID", bic: "BCOE ESMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },

    // --- AUSTRIA ---
    "AT20111": { nombre: "ERSTE BANK DER OESTERREICHISCHEN SPARKASSEN AG", direccion: "AM BELVEDERE 1", postal: "1100 WIEN", bic: "GIBAATWWXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT11000": { nombre: "UNICREDIT BANK AUSTRIA AG", direccion: "ROTHSCHILDPLATZ 1", postal: "1020 WIEN", bic: "BKAUATWWXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT31000": { nombre: "RAIFFEISEN BANK INTERNATIONAL AG", direccion: "AM STADTPARK 9", postal: "1030 WIEN", bic: "RZBAATWWXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT14000": { nombre: "BAWAG P.S.K. AG", direccion: "WIEDNER GÜRTEL 11", postal: "1100 WIEN", bic: "BAWAATWWXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT43000": { nombre: "VOLKSBANK WIEN AG", direccion: "DIETRICHGASSSE 25", postal: "1030 WIEN", bic: "VOWIATWWXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT15000": { nombre: "OBERBANK AG", direccion: "UNTERE DONAULÄNDE 28", postal: "4020 LINZ", bic: "OBRKAT2LXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT19100": { nombre: "BANK 99 AG", direccion: "WIEDNER GÜRTEL 13", postal: "1100 WIEN", bic: "B99AATWWXXX", sepa: ["SCT", "SDD", "SCT Inst"] },
    "AT18600": { nombre: "SANTANDER CONSUMER BANK GMBH", direccion: "DONAUSTADTSTRASSE 1", postal: "1220 WIEN", bic: "SCBAATWWXXX", sepa: ["SCT", "SDD"] },
    "AT76000": { nombre: "BKS BANK AG", direccion: "ST. VEITER RING 43", postal: "9020 KLAGENFURT", bic: "BKST AT 2KXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "AT32000": { nombre: "RAIFFEISENLANDESBANK NIEDERÖSTERREICH-WIEN AG", direccion: "FRIEDRICH-WILHELM-RAIFFEISEN-PLATZ 1", postal: "1020 WIEN", bic: "RLNWATWWXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },

    // --- ALEMANIA ---
    "DE10020030": { nombre: "DEUTSCHE BANK AG", direccion: "TAUNUSANLAGE 12", postal: "60325 FRANKFURT AM MAIN", bic: "DEUTDEDBXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE10040000": { nombre: "COMMERZBANK AG", direccion: "KAISERPLATZ", postal: "60311 FRANKFURT AM MAIN", bic: "COBADEFFXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE50010517": { nombre: "ING-DIBA AG", direccion: "THEODOR-HEUSS-ALLEE 2", postal: "60486 FRANKFURT AM MAIN", bic: "INGDDEFFXXX", sepa: ["SCT", "SDD", "SCT Inst"] },
    "DE10010010": { nombre: "POSTBANK (NIEDERLASSUNG DER DEUTSCHE BANK AG)", direccion: "FRIEDRICH-EBERT-ALLEE 114-120", postal: "53113BONN", bic: "PBNKDEFFXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE70020270": { nombre: "UNICREDIT BANK AG (HYPOVEREINSBANK)", direccion: "ARABELLASTRASSE 12", postal: "81925 MÜNCHEN", bic: "HYVEDEMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE10050000": { nombre: "LANDESBANK BERLIN AG (BERLINER SPARKASSE)", direccion: "ALEXANDERPLATZ 2", postal: "10178 BERLIN", bic: "PALADEBEXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE20050550": { nombre: "HAMBURGER SPARKASSE AG (HASPA)", direccion: "ECKERNFÖRDER STRASSE 1", postal: "22607 HAMBURG", bic: "HASPDEHHXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE30060010": { nombre: "DZ BANK AG", direccion: "PLATZ DER REPUBLIK", postal: "60325 FRANKFURT AM MAIN", bic: "GENODEFFXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE60050101": { nombre: "LANDESBANK BADEN-WÜRTTEMBERG (LBBW)", direccion: "AM HAUPTBAHNHOF 2", postal: "70173 STUTTGART", bic: "SOLADESTXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE50050000": { nombre: "LANDESBANK HESSEN-THÜRINGEN (HELABA)", direccion: "MAINZER LANDSTRASSE 46", postal: "60325 FRANKFURT AM MAIN", bic: "HELADEFFXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE10011001": { nombre: "N26 BANK AG", direccion: "KLOSTERSTRASSE 62", postal: "10179 BERLIN", bic: "N26EDEB1XXX", sepa: ["SCT", "SDD", "SCT Inst"] },
    "DE30020900": { nombre: "TARGOBANK AG", direccion: "KASERNENSTRASSE 10", postal: "40213 DÜSSELDORF", bic: "CMCIDEDDXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE47650130": { nombre: "SPARKASSE BIELEFELD", direccion: "SCHWERINER STRASSE 5", postal: "33605 BIELEFELD", bic: "WELADED1BIE", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE12702000": { nombre: "UNICREDIT BANK AG (HYPOVEREINSBANK)", direccion: "AM ZEUGHAUS 1-2", postal: "10117 BERLIN", bic: "HYVEDEMMXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE36010043": { nombre: "POSTBANK (NIEDERLASSUNG DER DEUTSCHE BANK AG) - ESSEN", direccion: "MUNZSTRASSE 1", postal: "45127 ESSEN", bic: "PBNKDEFFXXX", sepa: ["SCT", "SDD", "B2B", "SCT Inst"] },
    "DE27020001": { nombre: "AUDI BANK ZNDL D VOLKSWAGEN BANK", direccion: "XXXX", postal: "38112 BRAUNSCHWEIG", bic: "AUDFDE21XXX", sepa: ["SCT","SDD","B2B","SCT Inst"] }
};

function validar() {
    let raw = document.getElementById('ibanInput').value.replace(/\s/g, '').toUpperCase();
    const box = document.getElementById('box-result');

    if (raw.length < 5) {
        box.style.display = 'none';
        return;
    }

    const country = raw.substring(0, 2);
    const config = IBAN_CONFIG[country];
    let banco = null;
    let isValid = false;

    if (config) {
        // Extraemos código de banco dinámico (4 para ES, 5 para AT)
        const bankCode = raw.substring(4, 4 + config.bankLen);
        banco = BANCOS_DETALLE[country + bankCode];
        isValid = validarMod97(raw);
    }

    renderResult(raw, isValid, banco);
}

function validarMod97(iban) {
    if (iban.length < 15) return false;
    let rearranged = iban.substring(4) + iban.substring(0, 4);
    let numeric = "";
    for (let i = 0; i < rearranged.length; i++) {
        let code = rearranged.charCodeAt(i);
        if (code >= 65 && code <= 90) numeric += (code - 55);
        else numeric += rearranged[i];
    }
    return BigInt(numeric) % 97n === 1n;
}

/* --- ACTUALIZAR EN scripts/iban.js --- */

function renderResult(raw, isValid, banco) {
    const box = document.getElementById('box-result');
    const notificarBox = document.getElementById('notificar-container'); // El nuevo contenedor
    if(!box) return;
    
    box.style.display = 'block';
    box.style.borderColor = isValid ? "#10b981" : "#f56565";
    box.style.backgroundColor = isValid ? "#f0fdf4" : "#fef2f2";

    const country = raw.substring(0, 2);
    const config = IBAN_CONFIG[country] || { bankLen: 4 };
    const detailPart = raw.substring(4 + config.bankLen);

    document.getElementById('res-status').innerText = isValid ? '✓ IBAN VÁLIDO' : '✗ IBAN INVÁLIDO';
    document.getElementById('res-status').style.color = isValid ? "#166534" : "#991b1b";

    // Mostrar IBAN sin espacios para copiar y pegar en facturación o bancos
    document.getElementById('res-iban').innerText = raw;

    // Mostrar IBAN con espacios cada 4 dígitos para mejor lectura
    /*-- document.getElementById('res-iban').innerText = raw.replace(/(.{4})/g, '$1 ').trim(); --*/

    document.getElementById('res-bic').innerText = banco ? banco.bic : "DESCONOCIDO";
    
    document.getElementById('res-banco-nombre').innerText = banco ? banco.nombre : "Entidad no identificada";
    document.getElementById('res-banco-dir').innerText = banco ? banco.direccion : "Dirección no disponible";
    document.getElementById('res-banco-postal').innerText = banco ? banco.postal : "";
    document.getElementById('res-oficina').innerText = `Detalle cuenta: ${detailPart}`;

    // LÓGICA DE NOTIFICACIÓN:
    // Si el IBAN es válido pero NO hemos encontrado el banco en nuestra lista
    if (isValid && !banco) {
        notificarBox.style.display = 'block';
    } else {
        notificarBox.style.display = 'none';
    }

    const sepaBox = document.getElementById('sepa-capabilities');
    if (banco && banco.sepa) {
        const labels = { "SCT": "Transferencias", "SDD": "Adeudos", "B2B": "Empresas", "SCT Inst": "Inmediatas" };
        sepaBox.innerHTML = banco.sepa.map(s => `<div class="sepa-item">✅ ${labels[s] || s}</div>`).join('');
    } else {
        sepaBox.innerHTML = "<div style='color:#64748b'>Información SEPA no disponible.</div>";
    }
}

// NUEVA FUNCIÓN PARA ENVIAR EL CORREO
function notificarProgramacion() {
    const ibanConsultado = document.getElementById('ibanInput').value.trim().toUpperCase();
    const email = "fmaestre@layer4.es";
    const subject = encodeURIComponent("NO APARECE INFORMACIÓN - VALIDADOR DE IBAN");
    const body = encodeURIComponent(`El IBAN ${ibanConsultado} no aparece registrado en iban.js. Por favor, añade la información del banco correspondiente.`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text.replace(/\s/g, '')).then(() => {
        showToast("¡Copiado al portapapeles!");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Función para mostrar el popup dinámico
function showToast(mensaje) {
    let toast = document.getElementById('copy-toast');
    
    // Si el elemento no existe en el HTML, lo creamos dinámicamente
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-toast';
        document.body.appendChild(toast);
    }
    
    toast.innerText = mensaje;
    toast.className = "show";
    
    // Lo ocultamos después de 3 segundos
    setTimeout(() => { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}




