/* scripts/turbo_engine.js - Motor de Alto Rendimiento Layer4 v2.6.2 */

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let fullData = [];

// Manejo de checkboxes excluyentes (Solo uno activo a la vez)
function toggleMargin(val) {
    if (val === 10) document.getElementById('check20').checked = false;
    if (val === 20) document.getElementById('check10').checked = false;
}

async function iniciarTurboProcesado(input) {
    const file = input.files[0];
    if (!file) return;

    // UI Reset
    document.getElementById('fileName').innerText = file.name;
    document.getElementById('progressBox').style.display = 'block';
    document.getElementById('marginPanel').style.display = 'none';
    document.getElementById('btnDownload').style.display = 'none';
    fullData = [];

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument(arrayBuffer);
    const doc = await loadingTask.promise;
    
    document.getElementById('statPages').innerText = `Páginas: ${doc.numPages}`;

    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        
        // Mapeo por coordenadas Y (Fila) con tolerancia de 3 unidades
        const rows = {};
        content.items.forEach(item => {
            const y = Math.round(item.transform[5] / 3) * 3; 
            if (!rows[y]) rows[y] = [];
            rows[y].push(item);
        });

        // Reconstrucción de la fila de izquierda a derecha (Versión 1 - Columna_X)
        const sortedY = Object.keys(rows).sort((a, b) => b - a);
        sortedY.forEach(y => {
            const items = rows[y].sort((a, b) => a.transform[4] - b.transform[4]);
            
            if (items.length > 1) {
                const rowObj = { "Página": i };
                items.forEach((it, index) => {
                    rowObj[`Columna_${index + 1}`] = it.str.trim();
                });
                fullData.push(rowObj);
            }
        });

        actualizarProgreso(i, doc.numPages);
        page.cleanup(); 
        
        // Pausa para evitar que el navegador se congele con 40MB
        if (i % 12 === 0) await new Promise(r => setTimeout(r, 5));
    }

    document.getElementById('statusLabel').innerText = "¡Procesado completo!";
    document.getElementById('marginPanel').style.display = 'block';
    document.getElementById('btnDownload').style.display = 'block';
}

function actualizarProgreso(actual, total) {
    const pct = Math.round((actual / total) * 100);
    document.getElementById('progressFill').style.width = pct + "%";
    document.getElementById('percentLabel').innerText = pct + "%";
    document.getElementById('statusLabel').innerText = `Procesando: pág ${actual}...`;
    document.getElementById('statRows').innerText = `Filas: ${fullData.length}`;
}

/**
 * Función que detecta si un texto es un importe y le aplica el multiplicador
 */
function aplicarMargenAImporte(texto, multiplicador) {
    if (multiplicador === 1) return texto; // Sin margen
    
    // Detecta importes tipo "0,1500" o "12,34"
    const priceRegex = /^(\d+([.]\d+)?),(\d+)$/;
    let limpio = texto.trim();
    
    if (priceRegex.test(limpio)) {
        // Convertimos coma en punto para operar matemáticamente
        let num = parseFloat(limpio.replace(/\./g, '').replace(',', '.'));
        if (!isNaN(num)) {
            let resultado = num * multiplicador;
            // Devolvemos el formato con coma para Excel (4 decimales para mayor precisión)
            return resultado.toLocaleString('es-ES', { 
                minimumFractionDigits: 4, 
                maximumFractionDigits: 4 
            });
        }
    }
    return texto;
}

function generarXlsx() {
    let mult = 1.0;
    let sufijo = "_PROVEEDOR";
    
    if (document.getElementById('check10').checked) {
        mult = 1.10;
        sufijo = "_CLIENTE_10";
    } else if (document.getElementById('check20').checked) {
        mult = 1.20;
        sufijo = "_CLIENTE_20";
    }

    // Procesamos los datos con el margen elegido
    const dataFinal = fullData.map(fila => {
        let nFila = { ...fila };
        Object.keys(nFila).forEach(k => {
            if (k !== "Página") {
                nFila[k] = aplicarMargenAImporte(nFila[k], mult);
            }
        });
        return nFila;
    });

    const ws = XLSX.utils.json_to_sheet(dataFinal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Factura_Layer4");
    
    // Auto-ajuste de columnas
    ws['!cols'] = Array(12).fill({ wch: 15 });

    const nombre = `L4_Turbo${sufijo}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, nombre);
}

    const nombreArchivo = `L4_Factura_Turbo_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
}

// Al final de scripts/turbo_engine.js
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            iniciarTurboProcesado(this);
        });
    }
});
