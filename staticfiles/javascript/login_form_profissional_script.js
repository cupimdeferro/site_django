// Script para alternar entre tela de login e tela de cadastro //

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        // Exibe a parte da página para cadastro
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        // Exibe a parte da página para login
        container.classList.remove('active');
    });
});

// Script da responsividade em versão mobile //

document.addEventListener('DOMContentLoaded', function () {
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const mobileRegisterBtn = document.getElementById('mobile-register');
    const mobileLoginBtn = document.getElementById('mobile-login');

    // Função para verificar se é mobile
    function isMobile() {
        return window.innerWidth <= 991;
    }

    // Alternar para cadastro
    function showRegister() {
        if (isMobile()) {
            container.classList.add('show-signup');
            window.scrollTo(0, 0);
        } else {
            container.classList.add('active');
        }
    }

    // Alternar para login
    function showLogin() {
        if (isMobile()) {
            container.classList.remove('show-signup');
            window.scrollTo(0, 0);
        } else {
            container.classList.remove('active');
        }
    }

    // Event listeners para desktop
    if (registerBtn) registerBtn.addEventListener('click', showRegister);
    if (loginBtn) loginBtn.addEventListener('click', showLogin);

    // Event listeners para mobile
    if (mobileRegisterBtn) {
        mobileRegisterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showRegister();
        });
    }

    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showLogin();
        });
    }

    // Ajustar ao redimensionar a tela
    window.addEventListener('resize', function () {
        if (!isMobile()) {
            container.classList.remove('show-signup');
        }
    });
});

// Script para tratar os dados inseridos no form de cadastro //

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-send');
    const cpfInput = document.querySelector('input[placeholder="CPF"]');
    const telefoneField = document.getElementById('telefone');
    const cepField = document.getElementById('cep');
    const senhaField = document.getElementById('senha');
    const confirmarSenhaField = document.getElementById('confirmar_senha');
    const emailField = document.getElementById('email');
    const confirmarEmailField = document.getElementById('confirmar_email');
    const estadoField = document.getElementById('estado');
    const cidadeField = document.getElementById('cidade');
    const logradouroField = document.getElementById('logradouro');
    const bairroField = document.getElementById('bairro');

    // 1 - Validação E formatação do CPF 

    // Função de Formatação
    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    }

    // Função de Validação
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

    // Formatação de CPF enquanto o usuário insere os dados    
    cpfInput.addEventListener("input", function () {
        this.value = formatarCPF(this.value);
    });


    // Validação de CPF após o usuário inserir os dados
    cpfInput.addEventListener("blur", function () {
        const cpf = this.value.replace(/\D/g, "");

        if (cpf === "") {
            alert("O Campo CPF é obrigatório. Por favor insira um valor.");
            setTimeout(() => {
                this.focus(); // Retorna o foco ao campo após o alerta
            }, 0);

        } else if (!validarCPF(cpf)) {
            alert("CPF inválido. Verifique e tente novamente.");
            this.value = ""; // Limpa o campo de CPF
            setTimeout(() => {
                this.focus(); // Retorna o foco ao campo após o alerta
            }, 0);
        }
    });

    // 2 - Formatar telefone
    telefoneField.addEventListener('input', () => {
        let telefone = telefoneField.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (telefone.length > 11) telefone = telefone.slice(0, 11); // Limita a 11 dígitos
        telefoneField.value = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formata o telefone
    });

    telefoneField.addEventListener('blur', () => {
        const telefone = telefoneField.value.replace(/\D/g, '');
        if (telefone === "") {
            alert('O Campo telefone é obrigatório. Por favor, insira um valor.')
            setTimeout(() => {
                telefoneField.focus();
            }, 0)
        }

        else if (telefone.length !== 11) {
            alert('Telefone inválido. Deve conter 11 dígitos, incluindo DDD.');
            setTimeout(() => {
                telefoneField.focus();
            }, 0)
        }
    });

    // 3 - Formatar CEP e buscar endereço
    cepField.addEventListener('blur', async () => {
        const cep = cepField.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length !== 8) {
            alert('CEP inválido. Deve conter 8 dígitos.');
            setTimeout(() => {
                cepField.focus();
            }, 0)
            return;
        }

        cepField.value = cep.replace(/(\d{5})(\d{3})/, '$1-$2'); // Formata o CEP

        // Busca o CEP na API
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro ao buscar o CEP.');
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado. Verifique e tente novamente.');
                setTimeout(() => {
                    cepField.focus();
                })
                return;
            }

            // Preenche os campos de endereço
            estadoField.value = data.uf || '';
            cidadeField.value = data.localidade || '';
            logradouroField.value = data.logradouro || '';
            bairroField.value = data.bairro || '';
        } catch (error) {
            alert('Erro ao buscar o CEP. Verifique sua conexão.');
            console.error('Erro na busca do CEP:', error);
        }
    });

    // 4 - Verificar senhas e emails
    confirmarSenhaField.addEventListener('blur', () => {
        if (senhaField.value !== confirmarSenhaField.value) {
            alert('As senhas não coincidem. Por favor, insira novamente.');
            setTimeout(() => {
                senhaField.focus();
            }, 0)
        }
    });

    confirmarEmailField.addEventListener('blur', () => {
        if (emailField.value !== confirmarEmailField.value) {
            alert('Os emails não coincidem. Por favor, insira novamente.');
            setTimeout(() => {
                emailField.focus();
            }, 0)
        }
    });

    // 5 - Verificar campos obrigatórios e submeter o formulário

    form.addEventListener('submit', (event) => {
        // Verificar campos obrigatórios
        const requiredFields = form.querySelectorAll('[required]');
        for (const field of requiredFields) {
            if (!field.value.trim()) {
                alert(`O campo "${field.placeholder || field.name}" é obrigatório.`);
                field.focus();
                event.preventDefault(); // Impede o envio do formulário
                return;
            }
        }
        // // Verificar se os emails coincidem
        // if (emailField.value !== confirmarEmailField.value) {
        //     alert('Os emails não coincidem. Por favor, corrija.');
        //     emailField.focus();
        //     event.preventDefault();
        //     return;
        // }

        // // Verificar se as senhas coincidem
        // if (senhaField.value !== confirmarSenhaField.value) {
        //     alert('As senhas não coincidem. Por favor, corrija.');
        //     senhaField.focus();
        //     event.preventDefault();
        //     return;
        // }

        // // Verificar telefone
        // const telefone = telefoneField.value.replace(/\D/g, '');
        // if (telefone.length !== 11) {
        //     alert('Telefone inválido. Deve conter 11 dígitos, incluindo DDD.');
        //     setTimeout(() => {
        //         this.focus();
        //     }, 0)
        //     event.preventDefault();
        //     return;
        // }

        // // Verificar CEP
        // const cep = cepField.value.replace(/\D/g, '');
        // if (cep.length !== 8) {
        //     alert('CEP inválido. Deve conter 8 dígitos.');
        //     cepField.focus();
        //     event.preventDefault();
        //     return;
        // }
    });
});


// Obter os dados de cadastro e (após a resposta JSON da view) enviá-los para a view (2ª parte)

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-send');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Enviar os dados usando fetch // 2ª Parte
        const formData = new FormData(form); // Captura os dados do formulário

        try {
            const response = await fetch(cad_Url, {
                method: 'POST',
                body: formData,
                headers: { 'X-CSRFToken': '{{ csrf_token }}' }
            });

            if (!response.ok) {
                throw new Error("Erro na resposta do servidor.");
            }

            const data = await response.json(); // Processa a resposta JSON

            if (data.success) {
                // Exibe o alerta de sucesso e redireciona após o clique
                alert(data.message);
                window.location.href = login_Url; // Em caso de erro usar a variável gerada no template: login_Url 

            } else {
                // Exibe uma mensagem de erro retornada pela API
                alert(data.message);
            }
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            alert("Erro ao processar o formulário. Por favor, tente novamente.");
        }
    });
});


// Script para obter as credenciais de login do profissionalPF e do ProfissionalPJ e enviá-los via AJAX //

function getCSRFToken() { // Função para capturar o csrftoken direto do cookie
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

document.getElementById('login-form').addEventListener('submit', async function (event) {

    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch(logar_Url, {
            method: 'POST',
            body: formData,
            headers: { 'X-CSRFToken': getCSRFToken() }
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
            window.location.href = data.redirect_url; // (Pode ser: window.location.href = home_Url) // Redireciona para a home page com os dados do Profissional carregados, incluindo dashboard                    
        }

        else {
            alert(data.message);
        }
    }

    catch (error) {
        console.error("Errro ao fazer login:", error);
        alert("Erro ao processar o login. Tente novamente.");
    }
});