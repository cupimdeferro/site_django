// ///////// <!------ Início do script para manipular o menu suspenso do Navbar -------> ////////

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

// Lógica para manipular o Submenu Evento //
const eventoLink = document.getElementById("evento-link");
const subcategory = document.getElementById("sub-dropdow-evento");

if (eventoLink && subcategory) {
  eventoLink.addEventListener("click", function (e) {
    e.preventDefault(); // Evita comportamento padrão
    // e.stopPropagation(); // <--- impede a propagação
    subcategory.classList.toggle("show-subcategory");
  });

  document.addEventListener("click", function (event) {
    if (!subcategory.contains(event.target) && !eventoLink.contains(event.target)) {
      subcategory.classList.remove("show-subcategory");
    }
  });
}

// Lógica para manipular o Submenu Ensaio //
const ensaioLink = document.getElementById("ensaio-link");
const subcat = document.getElementById("sub-dropdow-ensaio");

if (ensaioLink && subcat) {
  ensaioLink.addEventListener("click", function (e) {
    e.preventDefault(); // Evita comportamento padrão
    // e.stopPropagation(); // <--- impede a propagação
    subcat.classList.toggle("show-subcategory");
  });

  document.addEventListener("click", function (event) {
    if (!subcat.contains(event.target) && !ensaioLink.contains(event.target)) {
      subcat.classList.remove("show-subcategory");
    }
  });
}


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



///////////////////////// Script para modal de visualização das fotos //////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalImage");
    const modalImg = document.getElementById("expandedImage");
    const closeBtn = document.getElementById("closeModal");
    const prevBtn = document.getElementById("prevImage");
    const nextBtn = document.getElementById("nextImage");

    const images = document.querySelectorAll(".img-hover-zoom img");
    let currentIndex = 0;

    function showModal(index) {
        currentIndex = index;
        modal.style.display = "block";
        modalImg.src = images[currentIndex].src;
    }

    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            showModal(index);
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
    });

    // Fechar modal ao clicar fora da imagem
    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });
});

////////////////////////////// Java do Icone Heart //////////////////////////////////////

// Aguarda o DOM carregar
document.addEventListener("DOMContentLoaded", function () {
    const heartContainers = document.querySelectorAll(".heart");

    heartContainers.forEach(container => {
        const emptyHeart = container.querySelector(".far.fa-heart");
        const filledHeart = container.querySelector(".fas.fa-heart");

        container.addEventListener("click", () => {
            const isLiked = filledHeart.style.display === "inline";

            if (isLiked) {
                filledHeart.style.display = "none";
                emptyHeart.style.display = "inline";
            } else {
                filledHeart.style.display = "inline";
                emptyHeart.style.display = "none";
            }
        });
    });
})

////////// Script do Menu perfil ///////////////


// document.addEventListener('DOMContentLoaded', () => {
//     const dropdownCheckbox = document.getElementById('dropdownToggle');

//     // Fecha o dropdown se clicar fora dele
//     document.addEventListener('click', function(event) {
//         const dropdown = document.querySelector('.dropdown_user');

//         if (!dropdown.contains(event.target)) {
//             dropdownCheckbox.checked = false;
//         }
//     });

//     // Garante que só um dropdown fique aberto de cada vez (caso tenha múltiplos no futuro)
//     const allDropdowns = document.querySelectorAll('.dropdown-checkbox');
//     allDropdowns.forEach(checkbox => {
//         checkbox.addEventListener('change', () => {
//             if (checkbox.checked) {
//                 allDropdowns.forEach(cb => {
//                     if (cb !== checkbox) cb.checked = false;
//                 });
//             }
//         });
//     });
// });

