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
