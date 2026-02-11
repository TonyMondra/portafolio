
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

    // Apple-style Transform Slider for Projects
    const proyectosBlock = document.getElementById('proyectos-block');
    const sliderContainer = document.getElementById('proyects-carrusel');
    const itemsContainer = sliderContainer ? sliderContainer.querySelector('.carousel-inner') : null;
    const items = itemsContainer ? itemsContainer.querySelectorAll('.carousel-item') : [];
    const prevBtn = document.getElementById('scroll-prev');
    const nextBtn = document.getElementById('scroll-next');
    
    if (items.length > 0 && itemsContainer) {
        let currentIndex = 0;
        let isAnimating = false;
        
        // Calcular ancho de item + gap
        function getItemWidth() {
            const item = items[0];
            const style = window.getComputedStyle(item);
            const width = item.offsetWidth;
            const marginLeft = parseInt(style.marginLeft) || 0;
            const marginRight = parseInt(style.marginRight) || 0;
            return width + marginLeft + marginRight;
        }
        
        // Actualizar posición del slider
        function updateSlider(animate = true) {
            if (isAnimating && animate) return;
            
            const itemWidth = getItemWidth();
            const offset = -currentIndex * itemWidth;
            
            itemsContainer.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none';
            itemsContainer.style.transform = `translateX(${offset}px)`;
            
            // Actualizar clases active
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            // Actualizar botones
            if (prevBtn && nextBtn) {
                prevBtn.style.opacity = currentIndex > 0 ? '0.9' : '0.3';
                nextBtn.style.opacity = currentIndex < items.length - 1 ? '0.9' : '0.3';
            }
            
            if (animate) {
                isAnimating = true;
                setTimeout(() => { isAnimating = false; }, 500);
            }
        }
        
        // Navegación
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, items.length - 1));
            updateSlider(true);
        }
        
        function next() {
            goToSlide(currentIndex + 1);
        }
        
        function prev() {
            goToSlide(currentIndex - 1);
        }
        
        // Event listeners de botones
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prev();
            });
            
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                next();
            });
        }
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) next();
                else prev();
            }
        }, { passive: true });
        
        // Scroll vertical convertido a navegación horizontal
        let isInProyectosSection = false;
        
        function checkIfInView() {
            if (!proyectosBlock) return;
            const rect = proyectosBlock.getBoundingClientRect();
            isInProyectosSection = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
        }
        
        window.addEventListener('scroll', checkIfInView, { passive: true });
        checkIfInView();
        
        let lastWheelTime = 0;
        document.addEventListener('wheel', (e) => {
            if (!isInProyectosSection) return;
            
            const now = Date.now();
            if (now - lastWheelTime < 500) return; // Debounce
            
            const delta = e.deltaY;
            
            if (delta > 30 && currentIndex < items.length - 1) {
                e.preventDefault();
                next();
                lastWheelTime = now;
            } else if (delta < -30 && currentIndex > 0) {
                e.preventDefault();
                prev();
                lastWheelTime = now;
            }
        }, { passive: false });
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (!isInProyectosSection) return;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            }
        });
        
        // Inicializar
        items[0].classList.add('active');
        updateSlider(false);
        
        // Recalcular en resize
        window.addEventListener('resize', () => {
            updateSlider(false);
        });
    }

});