/* LÓGICA DEL VALIDADOR IBAN SEPA */
const SEPA_DATA = { ES: 24, FR: 27, DE: 22, IT: 27, GB: 22, PT: 25 };
const BANCOS_DETALLE = {
    "0049": { nombre: "BANCO SANTANDER, S.A.", bic: "BSCHESMMXXX", direccion: "DE PEREDA 9-12, SANTANDER", sepa: ["SCT", "SDD", "SCT Inst"] },
    "0182": { nombre: "BBVA", bic: "BBVAESMMXXX", direccion: "SAN NICOLÁS 4, BILBAO", sepa: ["SCT", "SDD"] }
};

function validar() {
    let raw = document.getElementById('ibanInput').value.replace(/\s/g, '').toUpperCase();
    if (raw.length < 15) return;

    const country = raw.substring(0, 2);
    const bankCode = raw.substring(4, 8);
    const isValid = validarMod97(raw);
    const banco = BANCOS_DETALLE[bankCode];

    renderResult(raw, isValid, banco);
}

function validarMod97(iban) {
    let rearranged = iban.substring(4) + iban.substring(0, 4);
    let numeric = "";
    for (let i = 0; i < rearranged.length; i++) {
        let code = rearranged.charCodeAt(i);
        if (code >= 65 && code <= 90) numeric += (code - 55);
        else numeric += rearranged[i];
    }
    return BigInt(numeric) % 97n === 1n;
}

function renderResult(raw, isValid, banco) {
    const box = document.getElementById('box-result');
    box.style.display = 'block';
    document.getElementById('status-text-final').innerText = isValid ? "✓ IBAN Válido" : "✗ IBAN Inválido";
    document.getElementById('res-iban').innerText = raw;
    document.getElementById('res-bic').innerText = banco ? banco.bic : "No disponible";
    document.getElementById('res-banco-nombre').innerText = banco ? banco.nombre : "Banco desconocido";
}