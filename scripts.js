document.addEventListener('DOMContentLoaded', () => {

    // ====================================================================
    // EFECTO DE BRILLO DEL CURSOR
    // ====================================================================
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow && window.matchMedia("(min-width: 769px)").matches) { // Solo en escritorio
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // ====================================================================
    // MENÚ DE NAVEGACIÓN MÓVIL (HAMBURGUESA)
    // ====================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            nav.classList.toggle('active');
            // Para accesibilidad
            const isExpanded = nav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Cerrar menú al hacer clic en un enlace
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                if (document.body.classList.contains('nav-open')) {
                    document.body.classList.remove('nav-open');
                    nav.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ====================================================================
    // NAVEGACIÓN SUAVE (SMOOTH SCROLL)
    // ====================================================================
    document.querySelectorAll('.nav__link, .header__logo, .scroll-down-arrow, .footer__logo').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('index.html#') || href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                if (window.location.pathname.includes('carta.html')) {
                    window.location.href = `index.html#${targetId}`;
                } else {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // ====================================================================
    // ANIMACIÓN DE ENTRADA AL HACER SCROLL (REVEAL)
    // ====================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ====================================================================
    // LÓGICA DEL MODAL (PARA LA CARTA)
    // ====================================================================
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        const modal = document.getElementById('modal');
        const modalBody = modal.querySelector('.modal__body');
        const closeTriggers = document.querySelectorAll('[data-close-modal]');
        let lastFocusedElement;

        function openModal(content) {
            lastFocusedElement = document.activeElement;
            modalBody.innerHTML = content;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            // Esperar un poco para que el modal sea visible antes de enfocar
            setTimeout(() => modal.querySelector('.modal__close-btn').focus(), 100);
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if(lastFocusedElement) lastFocusedElement.focus();
        }

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.dataset.title;
                const description = item.dataset.description;
                const price = item.dataset.price;
                const imgPlaceholder = item.dataset.imgPlaceholder;

                const modalContent = `
                    <div class="modal__img-placeholder" style="background-image: ${imgPlaceholder};"></div>
                    <div class="modal__text-content">
                        <h3 class="modal__title">${title}</h3>
                        <p class="modal__description">${description}</p>
                        <span class="modal__price">${price} €</span>
                    </div>
                `;
                openModal(modalContent);
            });
        });

        closeTriggers.forEach(trigger => trigger.addEventListener('click', closeModal));
        modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    }

});