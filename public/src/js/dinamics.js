
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



    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // Apple-style Transform Slider for Projects - SIMPLIFIED
    console.log('Initializing projects slider...');
    
    const slider = document.querySelector('#proyects-carrusel .carousel-inner');
    const slides = document.querySelectorAll('#proyects-carrusel .carousel-item');
    const prevBtn = document.getElementById('scroll-prev');
    const nextBtn = document.getElementById('scroll-next');
    const dotsNav = document.getElementById('projects-dots');
    
    console.log('Slider found:', !!slider);
    console.log('Slides found:', slides.length);
    console.log('Prev button:', !!prevBtn);
    console.log('Next button:', !!nextBtn);
    
    if (!slider || slides.length === 0) {
        console.error('Slider elements not found!');
    } else {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let dots = [];
        
        // Calculate offset for a specific slide
        function getOffsetForSlide(index) {
            let offset = 0;
            
            for (let i = 0; i < index; i++) {
                const slide = slides[i];
                const style = window.getComputedStyle(slide);
                const width = slide.offsetWidth;
                const marginLeft = parseInt(style.marginLeft) || 0;
                const marginRight = parseInt(style.marginRight) || 0;
                offset += width + marginLeft + marginRight;
            }
            
            // Add the left margin of the target slide
            if (index < slides.length) {
                const targetStyle = window.getComputedStyle(slides[index]);
                offset += parseInt(targetStyle.marginLeft) || 0;
            }
            
            return -offset;
        }
        
        // Generate dots dynamically based on number of slides
        function generateDots() {
            if (!dotsNav) return;
            
            // Clear existing dots
            dotsNav.innerHTML = '';
            dots = [];
            
            // Create a dot for each slide
            slides.forEach((slide, index) => {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.setAttribute('data-slide', index);
                dot.setAttribute('aria-label', `Proyecto ${index + 1}`);
                dot.onclick = function() {
                    console.log('Dot clicked:', index);
                    goToSlide(index);
                };
                dotsNav.appendChild(dot);
                dots.push(dot);
            });
            
            console.log('Generated', dots.length, 'dots');
        }
        
        // Update dots navigation
        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Move to specific slide
        function goToSlide(index) {
            if (index < 0) index = 0;
            if (index >= totalSlides) index = totalSlides - 1;
            
            currentSlide = index;
            const offset = getOffsetForSlide(currentSlide);
            
            slider.style.transform = `translateX(${offset}px)`;
            slider.style.transition = 'transform 0.5s ease-out';
            
            // Update active class on slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
            
            // Update button opacity
            if (prevBtn) prevBtn.style.opacity = currentSlide > 0 ? '0.9' : '0.3';
            if (nextBtn) nextBtn.style.opacity = currentSlide < totalSlides - 1 ? '0.9' : '0.3';
            
            // Update dots
            updateDots();
            
            console.log('Moved to slide:', currentSlide, 'offset:', offset);
        }
        
        // Button handlers - DIRECT
        if (prevBtn) {
            prevBtn.onclick = function() {
                console.log('Prev clicked');
                goToSlide(currentSlide - 1);
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                console.log('Next clicked');
                goToSlide(currentSlide + 1);
            };
        }
        
        // Initialize first slide and generate dots
        slides[0].classList.add('active');
        if (prevBtn) prevBtn.style.opacity = '0.3';
        generateDots();
        updateDots();
        
        console.log('Slider initialized with', totalSlides, 'slides');
    }

});