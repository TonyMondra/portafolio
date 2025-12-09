
document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formularioContacto');
    let infoTerminal = document.getElementById('form-filling-status');

    const spans = [
        document.getElementById("form-name-placeholder"),
        document.getElementById("form-mail-placeholder"),
        document.getElementById("form-phone-placeholder"),
        document.getElementById("form-message-placeholder"),
    ]


    const inputs = [
        document.getElementById("form-name-input"),
        document.getElementById("form-mail-input"),
        document.getElementById("form-phone-input"),
        document.getElementById('form-message-input'),
    ];

    inputs.forEach((input) => {
        input.addEventListener("input", function (event) {

            let inputId = event.target.id;
            valCurrentInput(inputId);
            valAll();
            removeEmptyBlink();
        });
    });



    function valCurrentInput(inputId) {

        let element = document.getElementById(inputId);
        let purizado = DOMPurify.sanitize(element.value);
        let statusInput = '';
        

        switch (inputId) {
            case "form-name-input":
                var regex = /^[a-zA-Z\s]{1,40}$/;
                statusInput = 'no se permiten caracteres especiales!';
                break;
            case "form-mail-input":
                var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                statusInput = 'ingrese una dirección valida!';
                break;
            case "form-phone-input":
                var regex = /^\d{10}$/;
                statusInput = 'el numero debe tener una longitud de 10 dígitos!';
                break;
            case "form-message-input":
                var regex = /^[a-zA-Z0-9@,$.\s]{20,500}$/;
                statusInput = 'letras, emails y números!';
                break;
        }

        purizado = purizado.trim();
        const isValid = regex.test(purizado);

        if (isValid) {
            const flecha = document.getElementsByClassName(inputId);
            focusNext(inputId);
            flecha[0].classList.remove("correctInput");
            flecha[0].classList.remove("incorrectInput");
            flecha[0].classList.remove("emptyInput");
            flecha[0].classList.add("correctInput");

            infoTerminal.classList.remove('advertencia');
            infoTerminal.textContent= 'Rellene los campos faltantes';
            

        }
        else {
            const flecha = document.getElementsByClassName(inputId);
            flecha[0].classList.remove("incorrectInput")
            flecha[0].classList.remove("correctInput");
            flecha[0].classList.remove("emptyInput");
            flecha[0].classList.add("incorrectInput");
            
            infoTerminal.classList.add('advertencia');
            infoTerminal.textContent= statusInput;
            
        }

    }



    function focusNext(inputId) {
        switch (inputId) {
            case "form-name-input":
                document.getElementById("form-mail-placeholder").classList.add("emptyInput");
                break;
            case "form-mail-input":
                document.getElementById("form-phone-placeholder").classList.add("emptyInput");
                break;
            case "form-phone-input":
                document.getElementById("form-message-placeholder").classList.add("emptyInput");
                break;
        }
    }



    function valAll() {

        let counter = 0;

        spans.forEach((span) => {
            if (span.classList.contains("correctInput")) { counter++; }

            else if (span.classList.contains("incorrectInput")) { counter--; }
        })


        if (counter >= 4) {
            showSendBtn();
            removeEmptyBlink();
            infoTerminal.textContent = 'Listo, ya puedes enviar el formulario';
        }

        else {
            if (document.getElementById('btnSend')) {
                document.getElementById('btnSend').remove();
                const formulario = document.getElementById('formularioContacto');
                formulario.action = '';
            }
        }

    }



    function showSendBtn() {
        const divElement = document.getElementById('sendBtnContainer');


        if (!divElement.querySelector('button[type="submit"]')) {
            const submitButton = document.createElement('button');
            formulario.action = 'https://usebasin.com/f/540db33fed27';
            submitButton.type = 'submit';
            submitButton.id = 'btnSend';
            //submitButton.textContent = 'enviar';
            submitButton.classList.add('fa-solid');
            submitButton.classList.add('fa-paper-plane');
            submitButton.classList.add('fa-beat');
            submitButton.classList.add('fa-2xl');
            submitButton.setAttribute('form','formularioContacto');
            divElement.append(submitButton);

        }
    }



    function removeEmptyBlink() {
        spans.forEach((span) => {
            if (span.classList.contains("correctInput")) { span.classList.remove('emptyInput') }
        })
    }



    formulario.onsubmit = function (event) {
        event.preventDefault();
        let formData = new FormData(formulario);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", formulario.action, true);
        xhr.send(formData);
        xhr.onload = function (e) {
            if (xhr.status === 200) {
                formulario.reset();
                formulario.remove();
                document.getElementById('btnSend').remove();
                document.getElementById('form-filling-status').remove();
                const formContainer = document.getElementById('contact-box');
                const formResponse = document.createElement('span');
                formResponse.id = 'msgExito';
                formResponse.textContent = 'Gracias por tu mensaje!';
                formContainer.appendChild(formResponse);
            } else {
                let response = JSON.parse(xhr.response);
                //formMessage.innerHTML = "Error: " + response.error;
            }
        };
    };

    function changeImageSrc() {
        let image = document.getElementById("proyectoBook-img");
      
        if (window.innerWidth <= 991) {
          image.src = "media/black.png"; // URL for small screens
        } else {
          image.src = "media/prueba.png"; // URL for large screens
        }
      }
      

      window.addEventListener("load", changeImageSrc);
      window.addEventListener("resize", changeImageSrc);

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

});