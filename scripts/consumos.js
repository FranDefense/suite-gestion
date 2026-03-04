/* scripts/consumos.js - RESTAURACIÓN TOTAL v2.5.9 */
let currentOp = 'vdf';
let dataLines = [], dataUsage = [], dataIcc = [];

function setOperator(op) {
    currentOp = op;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + op).classList.add('active');
    const title = document.getElementById('op-title');
    title.innerText = op === 'vdf' ? 'Procesador Vodafone' : 'Procesador Movistar';
    title.style.color = op === 'vdf' ? 'var(--vdf-color)' : 'var(--mvs-color)';
}

async function handleFileSelect(event, type) {
    const file = event.target.files[0];
    const status = document.getElementById(`status-${type}`);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Lógica para el archivo de Consumo (Buscamos la hoja de Tráfico o Acumulados)
        let sheetName = workbook.SheetNames[0]; 
        if (type === 'usage') {
            // Buscamos "Tráfico" o "Acumulados", si no, la segunda hoja (índice 1)
            sheetName = workbook.SheetNames.find(n => n.includes('Tráfico') || n.includes('Acumulados')) || workbook.SheetNames[1] || workbook.SheetNames[0];
        }

        const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        if (type === 'lines') dataLines = json;
        if (type === 'usage') dataUsage = json;
        if (type === 'icc') dataIcc = json;

        status.innerText = `✅ Hoja: ${sheetName} (${json.length} filas)`;
    };
    reader.readAsArrayBuffer(file);
}

function procesarTodo() {
    if (!dataLines.length || !dataUsage.length) {
        alert("Faltan archivos críticos (Líneas o Consumo)");
        return;
    }

    const tbody = document.getElementById('table-body');
    tbody.innerHTML = "";
    document.getElementById('results-area').style.display = "block";
    
    let totalR = 0;

    dataLines.forEach(row => {
        // El número de línea es la base (columna 'Línea' o 'Telefono')
        const tlf = row['Línea'] || row['Llamante'] || row['Telefono'] || row['LINEA'];
        if (!tlf) return;

        // Búsqueda en Tráfico (Segunda Hoja)
        // Buscamos coincidencia de línea y que el tipo de tráfico sea Roaming
        const usageEntries = dataUsage.filter(u => (u['Línea'] || u['Telefono']) == tlf);
        
        let mbSum = 0;
        usageEntries.forEach(u => {
            const volRaw = u['Duración/Cantidad de MB'] || u['Cantidad'] || u['Volumen'] || 0;
            // Limpiamos el texto (ej: "6.5 GB" o "100 MB") y convertimos a número
            if (typeof volRaw === 'string') {
                const val = parseFloat(volRaw.replace(/[^\d.,]/g, '').replace(',', '.'));
                mbSum += volRaw.toLowerCase().includes('gb') ? val * 1024 : val;
            } else {
                mbSum += volRaw;
            }
        });

        // Búsqueda de ICC (en archivo de líneas o en el de ICC opcional)
        const iccRow = dataIcc.find(i => (i['Línea'] || i['Telefono']) == tlf);
        const iccFinal = iccRow ? (iccRow['ICC'] || iccRow['SIM']) : (row['ICC'] || row['SIM'] || '---');

        totalR += mbSum;

        const tr = document.createElement('tr');
        if (mbSum > 500) tr.className = "row-alarm"; // Clase para alerta roja

        tr.innerHTML = `
            <td><b>${tlf}</b></td>
            <td style="text-align:right">${mbSum.toFixed(2)} MB</td>
            <td>${iccFinal}</td>
            <td>${mbSum > 500 ? '<span class="alarm-badge">⚠️ EXCESO</span>' : (mbSum > 0 ? '📶 ROAMING' : 'OK')}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('stat-total').innerText = dataLines.length;
    document.getElementById('stat-roaming').innerText = (totalR / 1024).toFixed(2) + " GB";
}