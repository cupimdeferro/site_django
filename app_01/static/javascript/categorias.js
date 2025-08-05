document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.dropdown-toggler');
    const dropdowns = document.querySelectorAll('.dropdown');

    const categoriasDropdownId = 'my-dropdown-id';
    const categoriasDropdown = document.getElementById(categoriasDropdownId);
    const categoriasIcon = document.querySelector(`.dropdown-toggler[data-dropdown="${categoriasDropdownId}"] .fa-angle-down`);

    // Alternar dropdowns
    dropdownButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            const dropdownId = button.dataset.dropdown;
            const dropdown = document.getElementById(dropdownId);
            const icon = button.querySelector('.fa-angle-down');

            const isOpen = dropdown.classList.contains('show');

            // Fecha todos os dropdowns, exceto o atual
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('show');
            });

            // Fecha ícones de todos os outros
            dropdownButtons.forEach(btn => {
                const btnIcon = btn.querySelector('.fa-angle-down');
                if (btn !== button && btnIcon) btnIcon.classList.remove('rotate-180');
            });

            // Alternar visibilidade do dropdown atual
            dropdown.classList.toggle('show');

            // Atualizar ícone apenas se for o principal (Categorias)
            if (dropdownId === categoriasDropdownId && categoriasIcon) {
                if (dropdown.classList.contains('show')) {
                    categoriasIcon.classList.add('rotate-180');
                } else {
                    categoriasIcon.classList.remove('rotate-180');
                }
            } else if (icon) {
                // Outros menus (como "Fotógrafo")
                icon.classList.toggle('rotate-180', dropdown.classList.contains('show'));
            }
        });
    });

    // Clique fora: fecha todos os dropdowns e reseta ícones
    document.addEventListener('click', e => {
        if (!e.target.closest('.navbar-dropdown')) {
            dropdowns.forEach(d => d.classList.remove('show'));
            dropdownButtons.forEach(btn => {
                const btnIcon = btn.querySelector('.fa-angle-down');
                if (btnIcon) btnIcon.classList.remove('rotate-180');
            });
        }
    });

    // Fecha todos os dropdowns ao pressionar a tecla ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            dropdowns.forEach(d => d.classList.remove('show'));
            dropdownButtons.forEach(btn => {
                const btnIcon = btn.querySelector('.fa-angle-down');
                if (btnIcon) btnIcon.classList.remove('rotate-180');
            });
        }
    });
});


// ////////// <!---------- Script para manipular o menu amburguer em telas menores ----------> ///////////////

document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".navbar-toggler");
    const menu = document.querySelector(".navbar-menu");

    toggler.addEventListener("click", function () {
        toggler.classList.toggle("open");  // Anima o botão hambúrguer
        menu.classList.toggle("active");   // Mostra/oculta o menu
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !toggler.contains(event.target)) {
            menu.classList.remove("active");
            toggler.classList.remove("open");
        }
    });
});


document.querySelectorAll('.navbar-dropdown > a').forEach(item => {
    // Comportamento para mobile
    item.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });

    // Efeito hover para desktop
    item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 992) {
            this.parentElement.classList.add('hover');
        }
    });

    item.addEventListener('mouseleave', function () {
        if (window.innerWidth > 992) {
            setTimeout(() => {
                if (!this.parentElement.matches(':hover')) {
                    this.parentElement.classList.remove('hover');
                }
            }, 200);
        }
    });
});

// Fechar menus ao clicar fora
document.addEventListener('click', function (e) {
    if (window.innerWidth > 992) {
        if (!e.target.closest('.navbar-dropdown')) {
            document.querySelectorAll('.navbar-dropdown').forEach(dropdown => {
                dropdown.classList.remove('hover');
            });
        }
    }
});


// ///////// <!---------- Script para manipular o Dropdown do ícone do fotógrafo quando logado ----------> ///////////

document.addEventListener('click', function (event) {
    const checkbox = document.getElementById('dropdownToggle');
    const dropdownWrapper = document.querySelector('.dropdown-toggle-wrapper');

    // Verifica se o clique foi fora do dropdown
    if (!dropdownWrapper.contains(event.target)) {
        checkbox.checked = false;
    }
});

// ///////// <!---------- Script para manipular o "Acordeon" do FAQ ----------> ///////////

document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(button => {
        button.addEventListener("click", function () {
            const isActive = this.classList.contains("active");

            // Fecha todas as respostas abertas
            faqQuestions.forEach(btn => {
                btn.classList.remove("active");
                const answer = btn.nextElementSibling;
                if (answer && answer.classList.contains("faq-answer")) {
                    answer.style.maxHeight = null;
                    answer.style.padding = "0";
                }
            });

            // Se não estava ativa, abre a clicada
            if (!isActive) {
                this.classList.add("active");
                const answer = this.nextElementSibling;
                if (answer && answer.classList.contains("faq-answer")) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    answer.style.padding = "20px 0";
                }
            }
        });
    });
});

// ///////// <!---------- Script para manipular o botão "Voltar ao Topo" ----------> ///////////

document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (!backToTopBtn) {
        console.error('Botão "Voltar ao Topo" não encontrado');
        return;
    }

    function handleScroll() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }

    // Debounce para melhor performance
    let isScrolling;
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Verifica posição inicial
    handleScroll();
});