var el = function (elemento) {
    if (elemento.charAt(0) === "#") {
        return document.querySelector(elemento);
    }

    return document.querySelectorAll(elemento);
};

var tanteador = el("#intentos"),
    carta1 = "",
    carta2 = "",
    valor1 = "",
    valor2 = "",
    intentos = 0,
    limite = 20,
    aciertos = 0;
    destapadas = 0;

    var cambia = function (id) {

    var x = document.getElementsByClassName("memo-card");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {
            x[i].querySelector("#card").className = "opaco";
            x[i].querySelector("#ask").className = "oculto";
        }
    }
};

var oculta = function (id) {
    var x = document.getElementsByClassName("memo-card");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {
            x[i].querySelector("#card").className = "oculto";
            x[i].querySelector("#ask").className = "opaco";
        }
    }
};

var quita_clic = function (id) {
    var x = document.getElementsByClassName("memo-card");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].dataset.id == id) {
            x[i].querySelector("#card").className = "opaco";
            x[i].querySelector("#ask").className = "oculto";
            x[i].onclick = null;
        }
    }
};

var tantos = function () {
    tanteador.innerHTML = " Total de intentos: " + intentos;
};

var mostrar = function (p) {
    if (destapadas < 2) {
        if (destapadas == 0 && p.dataset.id != carta1 && p.dataset.id != carta2) {
            valor1 = p.dataset.value;
            carta1 = p.dataset.id;
            destapadas = 1;
            cambia(carta1);
            
        } else {
            if (destapadas == 1 && p.dataset.id != carta1 && p.dataset.id != carta2) {
                valor2 = p.dataset.value;
                carta2 = p.dataset.id;
                destapadas = 2;
                intentos++;
                if (limite == intentos) { alert("Límite de intentos alcanzado"); reiniciar(); }
                cambia(carta2);
                
            }
            tantos();
        }

        if (valor1 == valor2 && valor1 != "" && carta1 != carta2 && carta1 != "" && carta2 != "") {
            quita_clic(carta1);
            quita_clic(carta2);
            valor1 = "";
            valor2 = "";
            carta1 = "";
            carta2 = "";
            destapadas = 0;
            aciertos++;
            if (aciertos == 10) { alert("¡Felicitaciones has ganado!"); reiniciar(); }
        }

        if (destapadas == 2) {
            t = setTimeout(function () {
                oculta(carta1);
                carta1 = "";
                if (carta2 != "") { oculta(carta2); carta2 = ""; }
                destapadas = 0;
                tantos();
                clearTimeout(t);
            }, 2000);
        }
    }
};

var reiniciar = function () {
    window.location = window.location;
};