// Cargar Google Charts y el paquete de gráficos de pastel
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(inicializar);

function inicializar() {
    document.querySelector('.botones').addEventListener('click', procesarEcuacion);
}

function procesarEcuacion() {
    const ciclos = 1000;
    let errores_arcsin = 0;
    let errores_arccos = 0;
    let errores_sqrt = 0;
    let errores_division = 0;
    let errores_ln = 0;

    for (let i = 0; i < ciclos; i++) {
        try {
            // Generar valores aleatorios para las variables
            let x1 = Math.random() * 2 - 1; // Valor entre -1 y 1
            let x2 = Math.random() * 2 - 1;
            let x3 = Math.random() * 2 - 1;
            let x4 = Math.random() * 2 - 1;

            // Cálculo de los términos de la ecuación
            let term1_sqrt = Math.sqrt(2 + x1);
            let term1_arccos = Math.acos(1/2 + x2);
            let term2_sqrt = Math.sqrt(5 + x3);
            let term2_arcsin = Math.asin(Math.sqrt(3)/2 + x4);
            let term3_arccos = Math.acos(1/Math.sqrt(2));

            let ln2 = Math.log(2 + x1); // Logaritmo de una variable modificada
            let ln3 = Math.log(3 + x2); // Logaritmo de una variable modificada

            // Verificación de errores
            if (isNaN(term1_sqrt) || term1_sqrt < 0) errores_sqrt++;
            if (isNaN(term1_arccos)) errores_arccos++;
            if (isNaN(term2_sqrt) || term2_sqrt < 0) errores_sqrt++;
            if (isNaN(term2_arcsin)) errores_arcsin++;
            if (isNaN(term3_arccos)) errores_arccos++;
            if (isNaN(ln2) || ln2 <= 0) errores_ln++;
            if (isNaN(ln3) || ln3 <= 0) errores_ln++;

            // Cálculo del resultado
            let numerador = (term1_sqrt + term1_arccos) * 2 * ln2 - (term2_sqrt - term2_arcsin) * 2 * ln3 + term3_arccos * ln2 * ln3;
            let denominador = 2 * ln2 * ln3;
            let resultado = numerador / denominador;

            if (!isFinite(resultado)) errores_division++;

        } catch (e) {
            console.error("Error en la evaluación: ", e);
        }
    }

    // Actualización de los valores en la tabla
    document.getElementById('errores-arcsin').textContent = errores_arcsin;
    document.getElementById('porcentaje-arcsin').textContent = ((errores_arcsin / ciclos) * 100).toFixed(2) + "%";

    document.getElementById('errores-arccos').textContent = errores_arccos;
    document.getElementById('porcentaje-arccos').textContent = ((errores_arccos / ciclos) * 100).toFixed(2) + "%";

    document.getElementById('errores-sqrt').textContent = errores_sqrt;
    document.getElementById('porcentaje-sqrt').textContent = ((errores_sqrt / ciclos) * 100).toFixed(2) + "%";

    document.getElementById('errores-division').textContent = errores_division;
    document.getElementById('porcentaje-division').textContent = ((errores_division / ciclos) * 100).toFixed(2) + "%";

    document.getElementById('errores-ln').textContent = errores_ln;
    document.getElementById('porcentaje-ln').textContent = ((errores_ln / ciclos) * 100).toFixed(2) + "%";

    // Generar gráfico de pastel
    drawChart(errores_arcsin, errores_arccos, errores_sqrt, errores_division, errores_ln);
}

// Función para dibujar el gráfico de pastel
function drawChart(errores_arcsin, errores_arccos, errores_sqrt, errores_division, errores_ln) {
    var data = google.visualization.arrayToDataTable([
        ['Tipo de Error', 'Totales'],
        ['Arcsin', errores_arcsin],
        ['Arccos', errores_arccos],
        ['Raíz Cuadrada', errores_sqrt],
        ['División', errores_division],
        ['Logaritmo Natural', errores_ln]
    ]);

    var options = {
        title: 'Distribución de Errores',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}
