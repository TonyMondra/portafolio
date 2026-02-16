
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

    // Infinite Scroll Snap Carousel
    const scrollContainer = document.getElementById('proyects-carrusel');
    const originalSlides = document.querySelectorAll('#proyects-carrusel .carousel-item');
    const prevBtn = document.getElementById('scroll-prev');
    const nextBtn = document.getElementById('scroll-next');
    const dotsNav = document.getElementById('projects-dots');
    
    if (scrollContainer && originalSlides.length > 1) {
        const slidesArray = Array.from(originalSlides);
        const totalSlides = slidesArray.length;
        let dots = [];
        let isScrolling = false;
        
        // Clone first and last slides
        const firstClone = slidesArray[0].cloneNode(true);
        const lastClone = slidesArray[totalSlides - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        
        // Add clones to DOM
        scrollContainer.querySelector('.carousel-inner').appendChild(firstClone);
        scrollContainer.querySelector('.carousel-inner').insertBefore(lastClone, slidesArray[0]);
        
        // Get all slides including clones
        const allSlides = document.querySelectorAll('#proyects-carrusel .carousel-item');
        
        // Generate dots for original slides only
        function generateDots() {
            if (!dotsNav) return;
            dotsNav.innerHTML = '';
            dots = [];
            
            slidesArray.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.setAttribute('aria-label', `Proyecto ${index + 1}`);
                dot.onclick = () => scrollToSlide(index + 1); // +1 because of clone
                dotsNav.appendChild(dot);
                dots.push(dot);
            });
        }
        
        // Get current slide index
        function getCurrentIndex() {
            const scrollLeft = scrollContainer.scrollLeft;
            const slideWidth = allSlides[0].offsetWidth + 20; // width + margin
            return Math.round(scrollLeft / slideWidth);
        }
        
        // Scroll to slide by index (including clones)
        function scrollToSlide(index, behavior = 'smooth') {
            allSlides[index].scrollIntoView({ behavior: behavior, inline: 'center', block: 'nearest' });
        }
        
        // Handle infinite loop with smooth transition
        function handleInfiniteScroll() {
            if (isScrolling) return;
            
            const currentIndex = getCurrentIndex();
            const totalAllSlides = allSlides.length;
            
            // If at clone of last slide (index 0), jump to real last slide
            if (currentIndex === 0) {
                isScrolling = true;
                // Disable transitions temporarily
                scrollContainer.style.scrollBehavior = 'auto';
                scrollToSlide(totalSlides, 'auto');
                // Update active class immediately after jump
                updateDots(totalSlides);
                requestAnimationFrame(() => {
                    scrollContainer.style.scrollBehavior = 'smooth';
                    isScrolling = false;
                });
            }
            // If at clone of first slide (last index), jump to real first slide
            else if (currentIndex === totalAllSlides - 1) {
                isScrolling = true;
                // Disable transitions temporarily
                scrollContainer.style.scrollBehavior = 'auto';
                scrollToSlide(1, 'auto');
                // Update active class immediately after jump
                updateDots(1);
                requestAnimationFrame(() => {
                    scrollContainer.style.scrollBehavior = 'smooth';
                    isScrolling = false;
                });
            }
            else {
                updateDots(currentIndex);
            }
        }
        
        // Update dots based on current position
        function updateDots(currentIndex) {
            // Map to original slide index (subtract 1 for the clone at start)
            let originalIndex = currentIndex - 1;
            if (originalIndex < 0) originalIndex = totalSlides - 1;
            if (originalIndex >= totalSlides) originalIndex = 0;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === originalIndex);
            });
            
            // Update active class on slides
            allSlides.forEach((slide, i) => {
                const isActive = i === currentIndex;
                slide.classList.toggle('active', isActive);
            });
        }
        
        // Button handlers with loop
        if (prevBtn) {
            prevBtn.onclick = () => {
                const currentIndex = getCurrentIndex();
                if (currentIndex === 1) {
                    // At first real slide, go to clone of last
                    scrollToSlide(0);
                } else {
                    scrollToSlide(currentIndex - 1);
                }
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = () => {
                const currentIndex = getCurrentIndex();
                const lastRealIndex = totalSlides;
                if (currentIndex === lastRealIndex) {
                    // At last real slide, go to clone of first
                    scrollToSlide(lastRealIndex + 1);
                } else {
                    scrollToSlide(currentIndex + 1);
                }
            };
        }
        
        // Listen for scroll events
        scrollContainer.addEventListener('scroll', handleInfiniteScroll, { passive: true });
        
        // Initialize - start at first real slide (index 1)
        generateDots();
        setTimeout(() => {
            scrollToSlide(1, 'auto');
            updateDots(1);
        }, 100);
    } else if (originalSlides.length === 1) {
        // Single slide - just add active class
        originalSlides[0].classList.add('active');
    }

});