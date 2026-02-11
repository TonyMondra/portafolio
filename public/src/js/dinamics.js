
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
    } else if (slides.length === 1) {
        // Single slide - no loop needed
        slides[0].classList.add('active');
        console.log('Single slide carousel - no loop needed');
    } else {
        const originalSlides = Array.from(slides);
        const totalOriginalSlides = originalSlides.length;
        let dots = [];
        let currentIndex = 0; // 0-based index for original slides
        
        // Clone first and last slides for infinite loop effect
        const firstSlideClone = originalSlides[0].cloneNode(true);
        const lastSlideClone = originalSlides[totalOriginalSlides - 1].cloneNode(true);
        
        firstSlideClone.classList.add('clone');
        lastSlideClone.classList.add('clone');
        
        // Add clones to DOM
        slider.appendChild(firstSlideClone);
        slider.insertBefore(lastSlideClone, originalSlides[0]);
        
        // Get all slides including clones
        const allSlides = slider.querySelectorAll('.carousel-item');
        
        // Calculate slide width including margins
        function getSlideWidth() {
            const slide = allSlides[0];
            const style = window.getComputedStyle(slide);
            const width = slide.offsetWidth;
            const marginLeft = parseInt(style.marginLeft) || 0;
            const marginRight = parseInt(style.marginRight) || 0;
            return width + marginLeft + marginRight;
        }
        
        // Calculate offset for infinite loop positioning
        function calculateOffset(index) {
            // index 0 = last clone, index 1 = first original, etc.
            const slideWidth = getSlideWidth();
            return -(index * slideWidth);
        }
        
        // Update visual states
        function updateVisualState(realIndex) {
            // Update active class on original slides only
            originalSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === realIndex);
            });
            
            // Update dots
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === realIndex);
                });
            }
        }
        
        // Move to slide with infinite loop logic
        function goToSlide(targetRealIndex, animate = true) {
            // Handle wrapping for the target
            let newRealIndex = targetRealIndex;
            if (newRealIndex < 0) newRealIndex = totalOriginalSlides - 1;
            if (newRealIndex >= totalOriginalSlides) newRealIndex = 0;
            
            currentIndex = newRealIndex;
            
            // Calculate position (add 1 because of the clone at the beginning)
            const positionIndex = currentIndex + 1;
            const offset = calculateOffset(positionIndex);
            
            // Apply transform
            slider.style.transition = animate ? 'transform 0.5s ease-out' : 'none';
            slider.style.transform = `translateX(${offset}px)`;
            
            updateVisualState(currentIndex);
            
            console.log('Moved to slide:', currentIndex, 'position:', positionIndex, 'offset:', offset);
        }
        
        // Navigate next
        function next() {
            const newIndex = currentIndex + 1;
            
            if (newIndex >= totalOriginalSlides) {
                // Going to clone of first slide
                currentIndex = 0;
                const offset = calculateOffset(totalOriginalSlides + 1);
                slider.style.transition = 'transform 0.5s ease-out';
                slider.style.transform = `translateX(${offset}px)`;
                updateVisualState(0);
                
                // After animation, jump to real first slide without animation
                setTimeout(() => {
                    slider.style.transition = 'none';
                    slider.style.transform = `translateX(${calculateOffset(1)}px)`;
                }, 500);
            } else {
                goToSlide(newIndex);
            }
        }
        
        // Navigate previous
        function prev() {
            const newIndex = currentIndex - 1;
            
            if (newIndex < 0) {
                // Going to clone of last slide
                currentIndex = totalOriginalSlides - 1;
                const offset = calculateOffset(0);
                slider.style.transition = 'transform 0.5s ease-out';
                slider.style.transform = `translateX(${offset}px)`;
                updateVisualState(totalOriginalSlides - 1);
                
                // After animation, jump to real last slide without animation
                setTimeout(() => {
                    slider.style.transition = 'none';
                    slider.style.transform = `translateX(${calculateOffset(totalOriginalSlides)}px)`;
                }, 500);
            } else {
                goToSlide(newIndex);
            }
        }
        
        // Generate dots
        function generateDots() {
            if (!dotsNav) return;
            dotsNav.innerHTML = '';
            dots = [];
            
            originalSlides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.setAttribute('data-slide', index);
                dot.setAttribute('aria-label', `Proyecto ${index + 1}`);
                dot.onclick = function() {
                    goToSlide(index);
                };
                dotsNav.appendChild(dot);
                dots.push(dot);
            });
            
            console.log('Generated', dots.length, 'dots');
        }
        
        // Button handlers
        if (prevBtn) {
            prevBtn.onclick = function() {
                console.log('Prev clicked');
                prev();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                console.log('Next clicked');
                next();
            };
        }
        
        // Initialize
        generateDots();
        // Start at first real slide (index 1 because of the clone)
        slider.style.transition = 'none';
        slider.style.transform = `translateX(${calculateOffset(1)}px)`;
        originalSlides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');
        
        console.log('Infinite carousel initialized with', totalOriginalSlides, 'slides (+ 2 clones)');
    }

});