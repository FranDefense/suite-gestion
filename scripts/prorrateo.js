/* scripts/prorrateo.js - v2.5.1 */

const TRANSLATIONS = {
    es: { 
        subject: "Bienvenida y Facturación - Layer4 Solutions", 
        text: "Estimado {{cliente}}, le damos la bienvenida a Layer4 Solutions y le informamos que su línea {{linea}} ha quedado activada a día {{dia}}/{{mes}}.\n\nAprovechamos también para facilitarle nuestro contacto y horarios:\n- Tel. 910075198: De lunes a viernes, de 9 a.m. a 6 p.m. ininterrumpidamente.\n- email comercial@layer4.es: De lunes a domingo, de 9 a.m. a 7 p.m. (365 días al año)\n\nPor último, le informamos que su primera factura se emitirá el día 1 del mes siguiente a la contratación. El importe total será de {{total}}€, que corresponde a la suma del prorrateo del mes en curso ({{prorrateo}}€) más la cuota mensual por adelantado del mes siguiente ({{base}}€).\n\nReciba un cordial saludo." 
    },
    en: { 
        subject: "Welcome and Billing Information - Layer4 Solutions", 
        text: "Dear {{cliente}}, welcome to Layer4 Solutions. We inform you that your line {{linea}} has been activated as of {{dia}}/{{mes}}.\n\nWe also provide our contact details and hours:\n- Tel. 910075198: Monday to Friday, 9 a.m. to 6 p.m.\n- email comercial@layer4.es: Monday to Sunday, 9 a.m. to 7 p.m. (365 days a year)\n\nFinally, please note that your first invoice will be issued on the 1st of the following month. The total amount will be {{total}}€, which is the sum of the current month's proration ({{prorrateo}}€) plus the monthly fee in advance for next month ({{base}}€).\n\nBest regards." 
    },
    de: { 
        subject: "Willkommen und Rechnungsinformationen - Layer4 Solutions", 
        text: "Sehr geehrte(r) {{cliente}}, willkommen bei Layer4 Solutions. Wir informieren Sie, dass Ihre Leitung {{linea}} am {{dia}}.{{mes}}. aktiviert wurde.\n\nUnsere Kontaktzeiten:\n- Tel. 910075198: Montag bis Freitag, 9 bis 18 Uhr.\n- E-Mail comercial@layer4.es: Montag bis Sonntag, 9 bis 19 Uhr (365 Tage im Jahr).\n\nIhre erste Rechnung wird am 1. des Folgemonats erstellt. Der Gesamtbetrag beläuft sich auf {{total}}€ (anteilig für diesen Monat: {{prorrateo}}€ + Grundgebühr im Voraus: {{base}}€).\n\nMit freundlichen Grüßen." 
    },
    fr: { 
        subject: "Bienvenue et Informations Facturation - Layer4 Solutions", 
        text: "Cher/Chère {{cliente}}, bienvenue chez Layer4 Solutions. Nous vous informons que votre ligne {{linea}} a été activée le {{dia}}/{{mes}}.\n\nNos contacts :\n- Tél. 910075198 : du lundi au vendredi, de 9h à 18h.\n- E-mail comercial@layer4.es : du lundi au dimanche, de 9h à 19h (365 jours par an).\n\nEnfin, votre première facture sera émise le 1er du mois suivant. Le montant total sera de {{total}}€ (prorata : {{prorrateo}}€ + forfait mensuel d'avance : {{base}}€).\n\nCordialement." 
    },
    it: { 
        subject: "Benvenuto e Informazioni Fatturazione - Layer4 Solutions", 
        text: "Gentile {{cliente}}, benvenuto in Layer4 Solutions. La informiamo che la sua linea {{linea}} è stata attivata il {{dia}}/{{mes}}.\n\nContatti :\n- Tel. 910075198: dal lunedì al venerdì, dalle 9:00 alle 18:00.\n- Email comercial@layer4.es: dal lunedì alla domenica, dalle 9:00 alle 19:00 (365 giorni all'anno).\n\nInfine, la prima fattura sarà emessa il 1° del mese successivo. L'importo totale sarà di {{total}}€ (prorata: {{prorrateo}}€ + canone anticipato: {{base}}€).\n\nCordiali saluti." 
    },
    fi: { 
        subject: "Tervetuloa ja Laskutustiedot - Layer4 Solutions", 
        text: "Hyvä {{cliente}}, tervetuloa Layer4 Solutionsiin. Liittymänne {{linea}} on aktivoitu {{dia}}.{{mes}}.\n\nYhteystiedot:\n- Puh. 910075198: Maanantai–perjantai klo 9–18.\n- Sähköposti comercial@layer4.es: Maanantai–sunnuntai klo 9–19 (365 päivää vuodessa).\n\nEnsimmäinen lasku lähetetään seuraavan kuun 1. päivänä. Kokonaissumma on {{total}}€ (suhteellinen osuus {{prorrateo}}€ + seuraavan kuukauden ennakkomaksu {{base}}€).\n\nYstävällisin terveisin." 
    },
    no: { 
        subject: "Velkommen og Fakturainformasjon - Layer4 Solutions", 
        text: "Kjære {{cliente}}, velkommen til Layer4 Solutions. Linjen din {{linea}} ble aktivert {{dia}}/{{mes}}.\n\nKontaktinformasjon:\n- Tlf. 910075198: Mandag til fredag, 09.00 til 18.00.\n- E-post comercial@layer4.es: Mandag til søndag, 09.00 til 19.00 (365 dager i året).\n\nFørste faktura utstedes den 1. i neste måned. Totalsummen blir {{total}}€ (prorata {{prorrateo}}€ + månedsavgift på forskudd {{base}}€).\n\nMed vennlig hilsen." 
    },
    da: { 
        subject: "Velkommen og Faktureringsoplysninger - Layer4 Solutions", 
        text: "Kære {{cliente}}, velkommen til Layer4 Solutions. Din linje {{linea}} er blevet aktiveret den {{dia}}/{{mes}}.\n\nKontakt:\n- Tlf. 910075198: Mandag til fredag, kl. 9-18.\n- E-mail comercial@layer4.es: Mandag til søndag, kl. 9-19 (365 dage om året).\n\nDen første faktura udstedes den 1. i den næste måned. Det samlede beløb er {{total}}€ (prorata {{prorrateo}}€ + månedsafgift forud {{base}}€).\n\nMed venlig hilsen." 
    },
    sv: { 
        subject: "Välkommen och Faktureringsinformation - Layer4 Solutions", 
        text: "Bästa {{cliente}}, välkommen till Layer4 Solutions. Din linje {{linea}} aktiverades den {{dia}}/{{mes}}.\n\nKontaktuppgifter:\n- Tel. 910075198: Måndag till fredag, 09.00 till 18.00.\n- E-post comercial@layer4.es: Måndag till söndag, 09.00 till 19.00 (365 dagar om året).\n\nFörsta fakturan utfärdas den 1:a i nästa månad. Totalsumman blir {{total}}€ (prorata {{prorrateo}}€ + månedsavgift i förskott {{base}}€).\n\nMed vänlig hälsning." 
    }
};

function calcularProrrateo() {
    const basePrice = parseFloat(document.getElementById('basePrice').value) || 0;
    const startDay = parseInt(document.getElementById('startDay').value) || 1;
    const monthIndex = parseInt(document.getElementById('monthSelect').value);
    const lang = document.getElementById('langSelect').value;
    const cliente = document.getElementById('clientName').value || "[CLIENTE]";
    const linea = document.getElementById('lineNumber').value || "[Nº LÍNEA]";
    
    const year = new Date().getFullYear();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    
    let prorrateoValue = 0;
    const remainingDays = (totalDays - startDay) + 1;
    if (remainingDays > 0 && startDay <= totalDays) {
        prorrateoValue = (basePrice / totalDays) * remainingDays;
    }

    const totalFactura = prorrateoValue + basePrice;

    document.getElementById('resultPrice').innerText = `${totalFactura.toFixed(2)}€`;
    document.getElementById('monthInfo').innerText = `Prorrateo (${prorrateoValue.toFixed(2)}€) + Cuota Prepago (${basePrice.toFixed(2)}€)`;

    updatePreview(lang, startDay, monthIndex + 1, prorrateoValue.toFixed(2), basePrice.toFixed(2), totalFactura.toFixed(2), cliente, linea);
}

function updatePreview(lang, dia, mes, prorrateo, base, total, cliente, linea) {
    const tpl = TRANSLATIONS[lang];
    let body = tpl.text
        .replace("{{cliente}}", cliente)
        .replace("{{linea}}", linea)
        .replace("{{dia}}", dia)
        .replace("{{mes}}", mes < 10 ? "0" + mes : mes)
        .replace("{{prorrateo}}", prorrateo)
        .replace("{{base}}", base)
        .replace("{{total}}", total);

    document.getElementById('preview-body').innerText = body;
}

function fillMonths() {
    const monthSelect = document.getElementById('monthSelect');
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const currentMonth = new Date().getMonth();
    
    months.forEach((m, i) => {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = m;
        if(i === currentMonth) opt.selected = true;
        monthSelect.appendChild(opt);
    });
}

function sendMail() {
    const lang = document.getElementById('langSelect').value;
    const subject = encodeURIComponent(TRANSLATIONS[lang].subject);
    const body = encodeURIComponent(document.getElementById('preview-body').innerText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function sendWA() {
    const body = encodeURIComponent(document.getElementById('preview-body').innerText);
    window.open(`https://wa.me/?text=${body}`, '_blank');
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) showToast("Mensaje copiado");
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    fillMonths();
    document.getElementById('startDay').value = new Date().getDate();
    calcularProrrateo();
});