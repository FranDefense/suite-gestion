/* scripts/turbo_converter.js - Motor de Alto Rendimiento para Layer4 */

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let fullData = [];

async function iniciarTurboProcesado(input) {
    const file = input.files[0];
    if (!file) return;

    // UI Reset
    document.getElementById('fileName').innerText = file.name;
    document.getElementById('progressBox').style.display = 'block';
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

        // Reconstrucción de la fila de izquierda a derecha
        const sortedY = Object.keys(rows).sort((a, b) => b - a);
        sortedY.forEach(y => {
            const items = rows[y].sort((a, b) => a.transform[4] - b.transform[4]);
            
            // Si la línea tiene formato de consumo o tabla
            if (items.length > 2) {
                const rowObj = { "Página": i };
                items.forEach((it, index) => {
                    rowObj[`Columna_${index + 1}`] = it.str.trim();
                });
                fullData.push(rowObj);
            }
        });

        // Actualización de progreso y liberación de memoria
        actualizarProgreso(i, doc.numPages);
        page.cleanup(); 
        
        // Pequeña pausa para que el navegador respire
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 10));
    }

    document.getElementById('statusLabel').innerText = "¡Conversión lista!";
    document.getElementById('btnDownload').style.display = 'block';
}

function actualizarProgreso(actual, total) {
    const pct = Math.round((actual / total) * 100);
    document.getElementById('progressFill').style.width = pct + "%";
    document.getElementById('percentLabel').innerText = pct + "%";
    document.getElementById('statusLabel').innerText = `Leyendo página ${actual}...`;
    document.getElementById('statRows').innerText = `Registros: ${fullData.length}`;
}

function generarXlsx() {
    const ws = XLSX.utils.json_to_sheet(fullData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Factura_Completa");
    
    // Auto-ajuste de columnas básico
    ws['!cols'] = Array(15).fill({ wch: 20 });

    const nombreArchivo = `L4_Factura_Turbo_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
}