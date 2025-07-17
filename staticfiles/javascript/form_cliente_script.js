// Script para alternar entre tela de login e tela de cadastro

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        // Exibe a parte da página para cadastro
        container.classList.add('active');

        // Redireciona para a URL do Django para cadastro
        // window.location.href = "{% url 'cadastro_cliente_page' %}";
    });

    loginBtn.addEventListener('click', () => {
        // Exibe a parte da página para login
        container.classList.remove('active');

        // Redireciona para a URL do Django para login
        // window.location.href = "{% url 'login_cliente_page' %}";
    });
});

// Verificar se os valores dos campos de email e confirmar email, senha e confirmar senha são iguais (1ª parte)
// Obter os dados de cadastro e (após a resposta JSON da view) enviá-los para a view (2ª parte)

document.addEventListener('DOMContentLoaded', () => { // 1ª Parte
    const form = document.getElementById('form-send');
    const cpfInput = document.querySelector('input[placeholder="CPF"]');
    const telefoneInput = document.getElementById("telefone");
    const cepInput = document.getElementById("cep");
    const email = document.getElementById('email');
    const confirmarEmail = document.getElementById('confirmar_email');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmar_senha');
    const requiredFields = document.querySelectorAll('.form-group input, .form-group select');

    // Função para buscar informações do CEP
    async function buscarCEP(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar o CEP");
            }
            const data = await response.json();

            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            // Preenche os campos de endereço
            document.getElementById("estado").value = data.uf || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("logradouro").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";

        } catch (error) {
            console.error("Erro:", error);
            alert("Não foi possível buscar o CEP. Tente novamente.");
        }
    }

    // Adiciona o evento ao campo CEP
    cepInput.addEventListener("blur", function () {
        const cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (cep.length === 8) {
            buscarCEP(cep); // Chama a função para buscar o CEP
        } else {
            alert("CEP inválido. Digite um CEP com 8 dígitos.");
        }
    });

    // Função para formatar o CPF
    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o primeiro ponto
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o hífen
        return cpf;
    }

    // Função de Validação de CPF
    function validarCPF(cpf) {
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }
    // Formatação no campo CPF enquanto o usuário insere os dados
    cpfInput.addEventListener("input", function () {
        this.value = formatarCPF(this.value);
    });


    // Validação de CPF após o usuário inserir os dados
    cpfInput.addEventListener("blur", function () {
        const cpf = this.value.replace(/\D/g, ""); // Remove formatação para validar
        if (!validarCPF(cpf)) {
            alert("CPF inválido. Verifique e tente novamente.");
            this.value = ""; // Limpa o campo CPF se for inválido
            setTimeout(() => {
                this.focus(); // Retorna o foco ao campo CPF
            }, 0);

        }
    });


    // Função para formatar o campo de telefone
    telefoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        let formatted = "";

        if (value.length > 10) {
            // Formato para números celulares com 9 dígitos
            formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        } else if (value.length > 6) {
            // Formato para números fixos com 8 dígitos
            formatted = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
        } else if (value.length > 2) {
            // Adiciona o DDD parcialmente
            formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            // Adiciona o parêntese de abertura ao DDD
            formatted = `(${value}`;
        }
        e.target.value = formatted; // Atualiza o valor no campo
    });



    form.addEventListener('submit', (event) => {
        // Verificar campos obrigatórios
        const requiredFields = form.querySelectorAll('[required]');
        for (const field of requiredFields) {
            if (field.placeholder === "CPF") return; // Ignorar o campo CPF
            if (!field.value.trim()) {
                alert(`O campo "${field.placeholder || field.name}" é obrigatório.`);
                field.focus();
                event.preventDefault(); // Impede o envio do formulário
                return;
            }
        }

        // let valid = true;
        // let errorMessage = '';

        // // Verificar se todos os campos obrigatórios estão preenchidos (ignorando o CPF)
        // requiredFields.forEach(field => {
        //     if (field.placeholder === "CPF") return; // Ignorar o campo CPF
        //     if (!field.value.trim()) {
        //         valid = false;
        //         errorMessage += `O campo "${field.placeholder || field.name}" é obrigatório.\n`;
        //     }
        // });

        // Validação de e-mail
        if (email.value !== confirmarEmail.value) {
            valid = false;
            errorMessage += 'Os campos de e-mail não são iguais.\n';
        }

        // Validação de senha
        if (senha.value !== confirmarSenha.value) {
            valid = false;
            errorMessage += 'Os campos de senha não são iguais.\n';
        }

        // Bloquear o envio se houver erro
        if (!valid) {
            event.preventDefault();
            alert(errorMessage);
            return; // Impede o envio do formulário
        }

        // Enviar os dados usando fetch // 2ª Parte
        event.preventDefault(); // Impede o recarregamento da página
        const formData = new FormData(form);

        fetch(cad_Url, {
            method: "POST",
            body: formData,
            headers: { 'X-CSRFToken': '{{ csrf_token }}' },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.href = log_Url;
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error("Erro ao enviar o formulário:", error);
                alert("Erro ao processar o formulário. Tente novamente.");
            });
    });
});



// // Verificar se os valores dos capos de email e confirmar email, senha e confirmar senha são iguais

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('form-send');
//     const email = document.getElementById('email');
//     const confirmarEmail = document.getElementById('confirmar_email');
//     const senha = document.getElementById('senha');
//     const confirmarSenha = document.getElementById('confirmar_senha');
//     const requiredFields = document.querySelectorAll('.form-group input, .form-group select');

//     form.addEventListener('submit', (e) => {
//         let valid = true;
//         let errorMessage = '';

//         // Verificar se todos os campos obrigatórios estão preenchidos (ignorando o CPF)
//         requiredFields.forEach(field => {
//             if (field.placeholder === "CPF") return; // Ignorar o campo CPF
//             if (!field.value.trim()) {
//                 valid = false;
//                 errorMessage += `O campo "${field.placeholder || field.name}" é obrigatório.\n`;
//             }
//         });

//         // Validação de e-mail
//         if (email.value !== confirmarEmail.value) {
//             valid = false;
//             errorMessage += 'Os campos de e-mail não são iguais.\n';
//         }

//         // Validação de senha
//         if (senha.value !== confirmarSenha.value) {
//             valid = false;
//             errorMessage += 'Os campos de senha não são iguais.\n';
//         }

//         // Bloquear o envio se houver erro
//         if (!valid) {
//             e.preventDefault();
//             alert(errorMessage);
//         }

//     });
// });


// // Script para obter os dados de cadastro e (após a resposta JSON da view) enviá-los para a view.

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('form-send');

//     form.addEventListener('submit', function (event) {
//         event.preventDefault(); // Impede o recarregamento da página
//         const formData = new FormData(form); // Cria um objeto FormData com os dados do formulário

//         fetch(cad_Url, { // Enviando os dados com fetch. Aqui a função fetch realiza uma requisição HTTP assíncrona, e os dados são enviados a view através do método POST.
//             method: "POST",
//             body: formData,
//             headers: { 'X-CSRFToken': '{{ csrf_token }}' }, // Inclui o CSRF token
//         })
//         .then(response => response.json()) // Aqui é recebida a resposta do servidor (ou seja, da view) que é convertida para JSON, pois espera-se que o backend retorne um objeto JSON.
//         .then(data => {
//             if (data.success) {
//                 // // Limpa os campos do formulário após cadastro realizado com sucesso
//                 // form.reset();
//                 // Exibe alerta de sucesso e redireciona ao clicar em "OK"
//                 alert(data.message);
//                 window.location.href = log_Url; // Redireciona para a página de Login (Aqui log_Url, é uma variável que recebe o valor da url 'login_cliente_page' gerada pelo Django)
//             } else {
//                 // Exibe o erro
//                 alert(data.message);
//             }
//         })
//         .catch(error => {
//             console.error("Erro ao enviar o formulário:", error);
//             alert("Erro ao processar o formulário. Tente novamente.");
//         });
//     });
// });
