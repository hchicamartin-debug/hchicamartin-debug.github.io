document.addEventListener('DOMContentLoaded', () => {

    // ====================================================================
    // EFECTO DE BRILLO DEL CURSOR
    // ====================================================================
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
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
            modal.querySelector('.modal__close-btn').focus();
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
                    <div class="modal__img-placeholder" style="background-image: ${imgPlaceholder}; background-size: cover; background-position: center;"></div>
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

    // ====================================================================
    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ====================================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formFeedback = this.querySelector('#form-feedback');
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const subject = this.querySelector('#subject').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.textContent = 'Por favor, complete todos los campos requeridos.';
                formFeedback.className = 'form-feedback error';
                return;
            }

            formFeedback.textContent = `¡Gracias, ${name}! Hemos recibido tu consulta. Te responderemos pronto.`;
            formFeedback.className = 'form-feedback success';
            this.reset();
            setTimeout(() => { formFeedback.textContent = ''; }, 8000);
        });
    }
});