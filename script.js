// Función genérica para conectar inputs con la vista previa en tiempo real
function bindData(inputId, previewId, defaultValue) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            preview.textContent = input.value;
            preview.style.color = '#000';
        } else {
            preview.textContent = defaultValue;
            preview.style.color = '#555';
        }
    });
}

// Vincular cada campo con su respectivo lugar en el cartel
bindData('proy_nombre', 'v_proy_nombre', 'Nombre y apellido');
bindData('proy_titulo', 'v_proy_titulo', 'Título y matrícula prof.');
bindData('proy_dom', 'v_proy_dom', 'Domicilio');

bindData('cons_nombre', 'v_cons_nombre', 'Nombre y apellido/Razón S.');
bindData('cons_titulo', 'v_cons_titulo', 'Título y matrícula');
bindData('cons_dom', 'v_cons_dom', 'Domicilio');

bindData('dir_nombre', 'v_dir_nombre', 'Nombre y apellido');
bindData('dir_titulo', 'v_dir_titulo', 'Título y matrícula prof.');
bindData('dir_dom', 'v_dir_dom', 'Domicilio');

bindData('com_nombre', 'v_com_nombre', 'Nombre y apellido');
bindData('com_dom', 'v_com_dom', 'Domicilio');

bindData('perm_edif', 'v_perm', 'PPO/PP - 00/000/00');
bindData('uso_prev', 'v_uso', 'VIVIENDA NUEVA/REFORMA');

bindData('circ', 'v_circ', '0');
bindData('sector', 'v_sector', '0');
bindData('mza', 'v_mza', '0');
bindData('parcela', 'v_parcela', '0');
bindData('zona', 'v_zona', '0 - XXXXXXX');

// --- LÓGICA PARA ENVIAR POR WHATSAPP Y DESCARGAR IMAGEN ---
document.getElementById('btn-whatsapp').addEventListener('click', function(e) {
    e.preventDefault();

    // El botón cambia de texto para avisar que está procesando
    const btn = document.getElementById('btn-whatsapp');
    const textoOriginal = btn.textContent;
    btn.textContent = "Generando imagen...";
    btn.disabled = true; // Evita que hagan doble clic rápido

    // ACÁ DEBÉS PONER EL NÚMERO DE TELÉFONO
    const telefono = "5492944800799"; 
    
    const v = (id) => document.getElementById(id).value.trim() || "-";
    
    // Armado del mensaje
    let texto = "*NUEVO CARTEL DE OBRA*\n\n";
    texto += "*PROYECTISTA*\nNombre: " + v('proy_nombre') + "\nMatrícula: " + v('proy_titulo') + "\nDomicilio: " + v('proy_dom') + "\n\n";
    texto += "*CONSTRUCTOR*\nNombre: " + v('cons_nombre') + "\nMatrícula: " + v('cons_titulo') + "\nDomicilio: " + v('cons_dom') + "\n\n";
    texto += "*DIR. DE OBRA*\nNombre: " + v('dir_nombre') + "\nMatrícula: " + v('dir_titulo') + "\nDomicilio: " + v('dir_dom') + "\n\n";
    texto += "*COMITENTE*\nNombre: " + v('com_nombre') + "\nDomicilio: " + v('com_dom') + "\n\n";
    texto += "*DATOS MUNICIPALES*\nPermiso: " + v('perm_edif') + "\nUso: " + v('uso_prev') + "\n\n";
    texto += "*NOMENCLATURA CATASTRAL*\nCirc: " + v('circ') + " | Sector: " + v('sector') + " | Mza: " + v('mza') + " | Parcela: " + v('parcela') + " | Zona: " + v('zona');

    const cartelPreview = document.querySelector('.preview-box');

    // Generar la imagen
    html2canvas(cartelPreview).then(canvas => {
        // 1. Crear la descarga obligando a Chrome a detectarla
        let enlace = document.createElement('a');
        enlace.download = 'Cartel_Obra_Comarca.png';
        enlace.href = canvas.toDataURL('image/png');
        document.body.appendChild(enlace); // Lo agregamos al HTML oculto
        enlace.click(); // Forzamos el clic
        document.body.removeChild(enlace); // Lo borramos para limpiar

        // 2. Restaurar el botón
        btn.textContent = textoOriginal;
        btn.disabled = false;

        // 3. Abrir WhatsApp con un retraso de 500 milisegundos para que no choque con la descarga
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
        setTimeout(() => {
            window.open(url, '_blank');
        }, 500);

    }).catch(error => {
        // Por si llega a fallar la imagen, que al menos mande el texto
        console.error("Error al crear la imagen:", error);
        btn.textContent = textoOriginal;
        btn.disabled = false;
        
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
    });
});
