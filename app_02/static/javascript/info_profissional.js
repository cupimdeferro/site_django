document.getElementById('form-editar').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    Swal.fire({
        title: 'Salvando...',
        text: 'Aguarde enquanto suas alterações são processadas.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(atualizar_info_Url, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': '{{ csrf_token }}'
        }
    }).then(res => res.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                text: data.message
            }).then(() => {
                // Atualiza nome
                const nomeInput = document.getElementById('nome');
                const nomeDisplay = document.querySelector('.form-perfil input[name="nome"]');
                if (nomeInput && nomeDisplay) {
                    nomeDisplay.value = nomeInput.value;
                }
    
                // Atualiza descrição
                const bioTextarea = document.getElementById('biografia');
                const bioDisplay = document.querySelector('.form-perfil textarea[name="biografia"]');
                if (bioTextarea && bioDisplay) {
                    bioDisplay.value = bioTextarea.value;
                }
    
                // Atualiza imagem (pré-visualização)
                const fotoInput = document.getElementById('foto-perfil');
                const fotoPreview01 = document.querySelector('.foto-perfil');
                const fotoPreview02 = document.querySelector('.image-perfil');
                if (fotoInput && fotoInput.files.length > 0) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        fotoPreview01.src = e.target.result;
                        fotoPreview02.src = e.target.result;
                    };
                    reader.readAsDataURL(fotoInput.files[0]);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado!',
                text: data.message
            });
        }
    })
    .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Erro de rede!',
                text: 'Tente novamente mais tarde.'
            });
        });
});

