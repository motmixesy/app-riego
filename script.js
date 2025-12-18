document.addEventListener('DOMContentLoaded', function() {
    // --- DATOS (Ejemplos - ¡Necesitas ampliarlos y refinarlos!) ---

    const hortalizas = [
        'Tomate', 'Papa', 'Lechuga', 'Pimiento', 'Calabacín',
        'Cebolla', 'Zanahoria', 'Ajo', 'Judía', 'Pepino', 'Berenjena'
        // Añadir más hortalizas comunes en Canarias
    ];

    const islasYMunicipios = {
        'El Hierro': ['Frontera', 'El Pinar', 'Valverde'],
        'La Palma': ['Barlovento', 'Breña Alta', 'Breña Baja', 'Fuencaliente de la Palma', 'Garafía', 'Los Llanos de Aridane', 'El Paso', 'Puntagorda', 'Puntallana', 'San Andrés y Sauces', 'Santa Cruz de la Palma', 'Tazacorte', 'Tijarafe', 'Villa de Mazo'],
        'La Gomera': ['Agulo', 'Alajeró', 'Hermigua', 'San Sebastián de la Gomera', 'Valle Gran Rey', 'Vallehermoso'],
        'Tenerife': ['Adeje', 'Arafo', 'Arico', 'Arona', 'Buenavista del Norte', 'Candelaria', 'Fasnia', 'Garachico', 'Granadilla de Abona', 'La Guancha', 'Guía de Isora', 'Güímar', 'Icod de los Vinos', 'La Matanza de Acentejo', 'La Orotava', 'Puerto de la Cruz', 'Los Realejos', 'El Rosario', 'San Cristóbal de La Laguna', 'San Juan de la Rambla', 'San Miguel de Abona', 'Santa Cruz de Tenerife', 'Santa Úrsula', 'Santiago del Teide', 'El Sauzal', 'Los Silos', 'Tacoronte', 'Tegueste', 'Vilaflor de Chasna', 'La Victoria de Acentejo'],
        'Gran Canaria': ['Agaete', 'Agüimes', 'La Aldea de San Nicolás', 'Artenara', 'Arucas', 'Firgas', 'Gáldar', 'Ingenio', 'Mogán', 'Moya', 'Las Palmas de Gran Canaria', 'San Bartolomé de Tirajana', 'Santa Brígida', 'Santa Lucía de Tirajana', 'Santa María de Guía de Gran Canaria', 'Tejeda', 'Telde', 'Teror', 'Valleseco', 'Valsequillo de Gran Canaria', 'Vega de San Mateo'],
        'Fuerteventura': ['Antigua', 'Betancuria', 'La Oliva', 'Pájara', 'Puerto del Rosario', 'Tuineje'],
        'Lanzarote': ['Arrecife', 'Haría', 'San Bartolomé', 'Teguise', 'Tías', 'Tinajo', 'Yaiza']
        // 'La Graciosa' se considera parte de Teguise administrativamente, pero podrías añadirla si es relevante
    };

    // --- ELEMENTOS DEL DOM ---
    const form = document.getElementById('riegoForm');
    const plantaSelect = document.getElementById('tipoPlanta');
    const islaSelect = document.getElementById('isla');
    const municipioSelect = document.getElementById('municipio');
    const resultadoDiv = document.getElementById('resultado');
    const resPlanta = document.getElementById('resPlanta');
    const resEpoca = document.getElementById('resEpoca');
    const resSuelo = document.getElementById('resSuelo');
    const resClima = document.getElementById('resClima');
    const resUbicacion = document.getElementById('resUbicacion');
    const resEstrategia = document.getElementById('resEstrategia');
    const resMomento = document.getElementById('resMomento');

    // --- FUNCIONES ---

    // Función para cargar opciones en un select
    function cargarOpciones(selectElement, opciones) {
        opciones.forEach(opcion => {
            const optionElement = document.createElement('option');
            optionElement.value = opcion;
            optionElement.textContent = opcion;
            selectElement.appendChild(optionElement);
        });
    }

    // Función para cargar municipios según la isla seleccionada
    function cargarMunicipios() {
        const islaSeleccionada = islaSelect.value;
        // Limpiar opciones anteriores y estado disabled
        municipioSelect.innerHTML = '<option value="" disabled selected>Selecciona el municipio...</option>';
        municipioSelect.disabled = true;

        if (islaSeleccionada && islasYMunicipios[islaSeleccionada]) {
            cargarOpciones(municipioSelect, islasYMunicipios[islaSeleccionada]);
            municipioSelect.disabled = false; // Habilitar el select de municipios
        }
    }

    // *** LÓGICA DE RECOMENDACIÓN (¡MUY SIMPLIFICADA!) ***
    // ¡¡ESTA ES LA PARTE MÁS IMPORTANTE Y COMPLEJA!!
    // Necesitarás datos agronómicos reales y posiblemente una estructura más compleja
    // para cruzar todos los factores (planta, suelo, clima, época).
    function obtenerRecomendacion(datos) {
        let estrategia = "Recomendación general: ";
        let momento = "Momento general: ";
        let frecuenciaBase = 3; // Días (ejemplo base)
        let cantidadBase = "Moderada"; // Ejemplo

        // 1. Ajustes por TIPO DE PLANTA (Ejemplo muy básico)
        switch (datos.planta) {
            case 'Lechuga':
            case 'Pepino':
                estrategia += "Riegos frecuentes y ligeros. Evitar encharcamiento. ";
                frecuenciaBase = 2;
                cantidadBase = "Ligera/Moderada";
                break;
            case 'Tomate':
            case 'Pimiento':
            case 'Berenjena':
                estrategia += "Riegos más espaciados pero profundos, especialmente en floración/fructificación. ";
                frecuenciaBase = 4;
                cantidadBase = "Moderada/Abundante";
                break;
            case 'Papa':
            case 'Zanahoria':
            case 'Cebolla':
                estrategia += "Mantener humedad constante sin excesos. Riegos regulares. ";
                frecuenciaBase = 3;
                cantidadBase = "Moderada";
                break;
            default:
                estrategia += "Aplicar riego según necesidades observadas. ";
        }

        // 2. Ajustes por TIPO DE SUELO
        switch (datos.suelo) {
            case 'Arenoso':
                estrategia += "Debido al drenaje rápido, regar más frecuentemente con menos cantidad cada vez. ";
                frecuenciaBase = Math.max(1, frecuenciaBase - 1); // Aumenta frecuencia
                cantidadBase = "Ligera/Moderada";
                break;
            case 'Arcilloso':
                estrategia += "El suelo retiene agua, regar menos frecuentemente pero con más volumen. Asegurar buen drenaje. ";
                frecuenciaBase += 2; // Disminuye frecuencia
                cantidadBase = "Moderada/Abundante";
                break;
            case 'Franco':
                 estrategia += "Suelo equilibrado, seguir recomendaciones generales ajustando por clima. ";
                break;
             // Añadir franco-arenoso, franco-arcilloso
        }

        // 3. Ajustes por CLIMA y ÉPOCA
        let factorClimaEpoca = 1.0;
        if (['Verano'].includes(datos.epoca)) factorClimaEpoca += 0.5;
        if (['Invierno'].includes(datos.epoca)) factorClimaEpoca -= 0.4;
        if (['Costero/Seco', 'Sur/Arido'].includes(datos.clima)) factorClimaEpoca += 0.3;
        if (['Cumbre/FrioHumedo'].includes(datos.clima)) factorClimaEpoca -= 0.3;

        // Ajustar frecuencia basada en el factor (simplificado)
        // Menor factor -> menos frecuencia (más días entre riegos)
        // Mayor factor -> más frecuencia (menos días entre riegos)
        frecuenciaBase = Math.round(frecuenciaBase / Math.max(0.5, factorClimaEpoca)); // Evita división por cero o negativo
        frecuenciaBase = Math.max(1, frecuenciaBase); // Al menos regar cada día en casos extremos

        estrategia += `Frecuencia estimada: cada ${frecuenciaBase} día(s). Cantidad: ${cantidadBase}. Observar siempre la planta y la humedad del suelo. El mulching (acolchado) ayuda a conservar la humedad. Considerar riego por goteo para máxima eficiencia.`;

        // 4. Ajustes por MOMENTO DEL DÍA
        if (['Verano', 'Primavera'].includes(datos.epoca) || ['Costero/Seco', 'Sur/Arido'].includes(datos.clima)) {
            momento = "Regar a primera hora de la mañana o al atardecer para minimizar la evaporación.";
        } else {
            momento = "Regar preferiblemente por la mañana para que las hojas se sequen durante el día y reducir riesgo de hongos.";
        }
        if (datos.clima === 'Cumbre/FrioHumedo' && datos.epoca === 'Invierno') {
             momento += " Evitar riegos nocturnos con temperaturas muy bajas."
        }

        return { estrategia, momento };
    }

    // --- INICIALIZACIÓN ---

    // Cargar hortalizas
    cargarOpciones(plantaSelect, hortalizas);

    // Cargar islas
    cargarOpciones(islaSelect, Object.keys(islasYMunicipios));

    // Añadir listener para cambio de isla
    islaSelect.addEventListener('change', cargarMunicipios);

    // --- MANEJO DEL FORMULARIO ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío real del formulario

        // Recoger los datos seleccionados
        const datosSeleccionados = {
            planta: plantaSelect.value,
            epoca: document.getElementById('epocaPlantacion').value,
            suelo: document.getElementById('tipoSuelo').value,
            clima: document.getElementById('tipoClima').value,
            isla: islaSelect.value,
            municipio: municipioSelect.value
        };

        // Validar que todo esté seleccionado (aunque 'required' ayuda)
        if (!datosSeleccionados.planta || !datosSeleccionados.epoca || !datosSeleccionados.suelo || !datosSeleccionados.clima || !datosSeleccionados.isla || !datosSeleccionados.municipio) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Obtener la recomendación (usando la lógica simplificada)
        const recomendacion = obtenerRecomendacion(datosSeleccionados);

        // Mostrar los datos seleccionados en la ficha
        resPlanta.textContent = datosSeleccionados.planta;
        resEpoca.textContent = datosSeleccionados.epoca;
        resSuelo.textContent = datosSeleccionados.suelo;
        resClima.textContent = datosSeleccionados.clima;
        resUbicacion.textContent = `${datosSeleccionados.municipio}, ${datosSeleccionados.isla}`;

        // Mostrar la recomendación
        resEstrategia.textContent = recomendacion.estrategia;
        resMomento.textContent = recomendacion.momento;

        // Hacer visible la ficha de resultados
        resultadoDiv.classList.remove('hidden');

         // Opcional: Desplazar la vista hacia los resultados
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    });
});