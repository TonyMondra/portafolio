document.addEventListener('DOMContentLoaded', function () {

    /* ============================================================
       REFERENCIAS PRINCIPALES DEL FORMULARIO
    ============================================================ */
    const formulario = document.getElementById('formularioContacto');
    const infoTerminal = document.getElementById('form-filling-status');

    const spans = [
        document.getElementById("form-name-placeholder"),
        document.getElementById("form-mail-placeholder"),
        document.getElementById("form-phone-placeholder"),
        document.getElementById("form-message-placeholder"),
    ];

    const inputs = [
        document.getElementById("form-name-input"),
        document.getElementById("form-mail-input"),
        document.getElementById("form-phone-input"),
        document.getElementById("form-message-input"),
    ];


    /* ============================================================
       MAPA DE REGLAS
    ============================================================ */
    const reglas = {
        "form-name-input": {
            regex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
            msgError: "Solo letras y espacios (máx. 40 caracteres)."
        },
        "form-mail-input": {
            regex: /^[\w.-]+@[\w.-]+\.\w{2,}$/i,
            msgError: "Ingrese un correo válido."
        },
        "form-phone-input": {
            regex: /^\d{10}$/,
            msgError: "Debe tener exactamente 10 dígitos."
        },
        "form-message-input": {
            regex: /^[\s\S]{10,500}$/,
            msgError: "El mensaje debe tener entre 10 y 500 caracteres."
        }
    };


    /* ============================================================
       VALIDACIÓN TIEMPO REAL
    ============================================================ */
    inputs.forEach((input) => {
        input.addEventListener("input", function (event) {
            const id = event.target.id;
            validarInput(id);
            validarFormularioCompleto();
            limpiarBlinkCorrectos();
        });
    });


    /* ============================================================
       FUNCIONES PRINCIPALES DE VALIDACIÓN
    ============================================================ */
    function validarInput(inputId) {
        const input = document.getElementById(inputId);
        const valor = input.value.trim();
        const regla = reglas[inputId];
        const flecha = buscarFlecha(inputId);

        if (!regla || !flecha) return;

        const esValido = regla.regex.test(valor);

        actualizarFlecha(flecha, esValido);
        actualizarTerminal(esValido, regla.msgError);

        if (esValido) avanzarFlecha(inputId);

        return esValido;
    }

    function buscarFlecha(inputId) {
        const elements = document.getElementsByClassName(inputId);
        return elements.length ? elements[0] : null;
    }

    function actualizarFlecha(flecha, esValido) {
        flecha.classList.remove("correctInput", "incorrectInput", "emptyInput");
        flecha.classList.add(esValido ? "correctInput" : "incorrectInput");
    }

    function actualizarTerminal(esValido, msgError) {
        if (esValido) {
            infoTerminal.classList.remove('advertencia');
            infoTerminal.textContent = "Rellene los campos faltantes";
        } else {
            infoTerminal.classList.add('advertencia');
            infoTerminal.textContent = msgError;
        }
    }


    /* ============================================================
       AVANZAR FLECHAS (estilo terminal)
    ============================================================ */
    function avanzarFlecha(inputId) {
        const mapa = {
            "form-name-input": "form-mail-placeholder",
            "form-mail-input": "form-phone-placeholder",
            "form-phone-input": "form-message-placeholder"
        };

        activarBlink(mapa[inputId]);
    }

    function activarBlink(spanId) {
        const span = document.getElementById(spanId);
        if (span && !span.classList.contains("correctInput")) {
            span.classList.add("emptyInput");
        }
    }

    function limpiarBlinkCorrectos() {
        spans.forEach(span => {
            if (span.classList.contains("correctInput")) {
                span.classList.remove("emptyInput");
            }
        });
    }


    /* ============================================================
       VALIDACIÓN GENERAL PARA MOSTRAR BOTÓN
    ============================================================ */
    function validarFormularioCompleto() {
        const completos = spans.filter(s => s.classList.contains("correctInput")).length;

        if (completos === 4) {
            mostrarBotonEnviar();
            infoTerminal.textContent = "Listo, ya puedes enviar el formulario.";
        } else {
            ocultarBotonEnviar();
        }
    }


    /* ============================================================
       BOTÓN DE ENVÍO
    ============================================================ */
    function mostrarBotonEnviar() {
        const container = document.getElementById('sendBtnContainer');

        if (!document.getElementById('btnSend')) {
            formulario.action = 'https://usebasin.com/f/540db33fed27';

            const btn = document.createElement('button');
            btn.type = "submit";
            btn.id = "btnSend";
            btn.classList.add("fa-solid", "fa-paper-plane", "fa-beat", "fa-2xl");

            /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
               ✔️ AGREGADO: permitir envío al hacer click
            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
            btn.addEventListener("click", () => {
                formulario.requestSubmit();
            });

            container.appendChild(btn);
        }
    }

    function ocultarBotonEnviar() {
        const btn = document.getElementById('btnSend');
        if (btn) btn.remove();
        formulario.action = "";
    }


    /* ============================================================
       SUBMIT AJAX + RESET ELEGANTE
    ============================================================ */
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open("POST", formulario.action, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                mostrarMensajeExito();
            } else {
                mostrarMensajeError();
            }
        };

        xhr.send(new FormData(formulario));
    });

    function mostrarMensajeExito() {
        infoTerminal.textContent = "Mensaje enviado correctamente.";

        formulario.reset();

        spans.forEach(s => {
            s.classList.remove("correctInput", "incorrectInput", "emptyInput");
        });

        ocultarBotonEnviar();
    }

    function mostrarMensajeError() {
        infoTerminal.classList.add("advertencia");
        infoTerminal.textContent = "Error al enviar. Intente de nuevo.";
    }


    /* ============================================================
       ENTER PARA ENVIAR DESDE TEXTAREA
    ============================================================ */

    const textarea = document.getElementById("form-message-input");

    textarea.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            if (validarInput("form-message-input") && formulario.action !== "") {
                e.preventDefault();
                formulario.requestSubmit();
            }
        }
    });


    /* ============================================================
       CAMBIO DE IMAGEN SEGÚN TAMAÑO
    ============================================================ */
    function changeImageSrc() {
        const image = document.getElementById("proyectoBook-img");
        if (!image) return;

        image.src = window.innerWidth <= 991 ? "media/black.png" : "media/prueba.png";
    }

    window.addEventListener("load", changeImageSrc);
    window.addEventListener("resize", changeImageSrc);


    /* ============================================================
       BOOTSTRAP TOOLTIP
    ============================================================ */
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
        .map(el => new bootstrap.Tooltip(el));

});
