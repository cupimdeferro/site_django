from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import transaction
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from .models import Fotografos, FotografosPf, FotografosPj, EnderecosFotografos, Clientes, EnderecosClientes, Fotografias

# Create your views here.

# FUNÇÕES PARA CARREGAR TEMPLATES DA PÁGINA INDEX E RENDERIZAR INFORMAÇÕES

def Carrega_home_page(request):
    return render(request, 'index.html')

def Carrega_galeria(request):
    fotos = Fotografias.objects.select_related('fk_id_fotografo').all()
    return render(request, 'galeria.html', {'fotos': fotos})

# CATEGORIAS DO DROPDOWN NO NAVBAR

def categoria_ambiente(request):
    return render(request, 'categorias/categoria_ambiente.html')

def categoria_formatura(request):
    return render(request, 'categorias/categoria_formatura.html')

def categoria_moda(request):
    return render(request, 'categorias/categoria_moda.html')

def categoria_aniversario(request):
    return render(request, 'categorias/categoria_aniversario.html')

def categoria_batizado(request):
    return render(request, 'categorias/categoria_batizado.html')

def categoria_casamento(request):
    return render(request, 'categorias/categoria_casamento.html')

def categoria_publicidade(request):
    return render(request, 'categorias/categoria_publicidade.html')

def categoria_arquitetura(request):
    return render(request, 'categorias/categoria_arquitetura.html')

def categoria_esporte(request):
    return render(request, 'categorias/categoria_esporte.html')

def categoria_filmmaker(request):
    return render(request, 'categorias/categoria_filmmaker.html')

def categoria_newborn(request):
    return render(request, 'categorias/categoria_newborn.html')

def categoria_gestante(request):
    return render(request, 'categorias/categoria_gestante.html')

def categoria_gastronomia(request):
    return render(request, 'categorias/categoria_gastronomia.html')

# SUBCATEGORIAS

def sub_show(request):
    return render(request, 'categorias/sub_show.html')

def sub_palestra(request):
    return render(request, 'categorias/sub_palestra.html')

def sub_festa(request):
    return render(request, 'categorias/sub_festa.html')

def sub_geral(request):
    return render(request, 'categorias/sub_geral.html')

def sub_externo(request):
    return render(request, 'categorias/sub_externo.html')

def sub_estudio(request):
    return render(request, 'categorias/sub_estudio.html')

def Carrega_login_profPF(request):
    return render(request, 'profissionais/form_profissionalPF.html')

def Carrega_login_profPJ(request):
    return render(request, 'profissionais/form_profissionalPJ.html')

def Carrega_perfil(request):
    return render(request, 'profissionais/perfil.html')


def Carrega_login_cliente (request):
    return render(request, 'clientes/login_form_cliente.html')

def Cadastra_profPF(request):
    if request.method == 'POST':
        # Função para remover caracteres não numéricos da string "valor" e retornar apenas os caracteres numéricos sem espaços entre eles   
        def limpar_dados(valor):
            return ''.join(filter(str.isdigit, valor))
        # Dados recebidos do formulário
        nome = request.POST['nome']
        nome_profissional = request.POST.get('nome_profissional')
        data_nascimento = request.POST['data_nascimento']
        cpf = limpar_dados(request.POST['cpf'])
        genero = request.POST['genero']
        telefone = limpar_dados(request.POST['telefone'])
        email = request.POST['email']
        cep = limpar_dados(request.POST['cep'])
        estado = request.POST['estado']
        cidade = request.POST['cidade']
        logradouro = request.POST['logradouro']
        bairro = request.POST['bairro']
        numero = request.POST['numero']
        senha = make_password(request.POST['senha']) # Aqui a senha é Criptografada antes de ser salva
        # especialidade_selecionada = request.POST['especialidade']
        raio_atendimento = request.POST['raio_atendimento']
        rede_social = request.POST.get('link_instagram')
        descricao = request.POST.get('descricao')        
        imagem_perfil = request.FILES.get('imagem_perfil')

        try:
            with transaction.atomic():
                # Criação do Fotógrafo PF
                fotografo_pf = FotografosPf.objects.create(
                    cpf_fotografo_pf=cpf,
                    apelido_profissional_fotografo_pf=nome_profissional,
                    data_nascimento_fotografo_pf=data_nascimento,
                    genero_fotografo_pf=genero,
                )

                # Criação do Fotógrafo
                fotografo = Fotografos.objects.create(
                    nome_fotografo=nome,
                    telefone_fotografo=telefone,
                    raio_atendimento_fotografo=raio_atendimento,
                    email_fotografo=email,
                    senha_fotografo=senha,
                    descricao_fotografo=descricao,
                    redesocial_fotografo=rede_social,
                    imagem_perfil_fotografo=imagem_perfil,
                    fk_id_fotografo_pf=fotografo_pf,
                )

                # Criação do Endereço
                EnderecosFotografos.objects.create(
                    cep_endereco_fotografo=cep,
                    logradouro_endereco_fotografo=logradouro,
                    numero_endereco_fotografo=numero,
                    bairro_endereco_fotografo=bairro,
                    cidade_endereco_fotografo=cidade,
                    estado_endereco_fotografo=estado,
                    fk_id_fotografo=fotografo,
                )
                
                # Obtém a URL dinamicamente
                # redirect_url = reverse('login_profPF_page')

                # Retorna uma resposta JSON de sucesso
                return JsonResponse({'success': True, 'message': 'Cadastro realizado com sucesso!'}) # Em caso de erro usar: 'redirect_url': redirect_url}
            
        except Exception as e:
            print(f"Erro ao cadastrar o fotógrafo: {e}")
            return JsonResponse({'success': False, 'message': 'Erro ao cadastrar. Tente novamente.'})
    
def Cadastra_profPJ(request):
    if request.method == 'POST':
        # Função para remover caracteres não numéricos da string "valor" e retornar apenas os caracteres numéricos sem espaços entre eles   
        def limpar_dados(valor):
            return ''.join(filter(str.isdigit, valor))
        # Dados recebidos do formulário
        razao_social = request.POST.get('razao_social')
        cnpj = limpar_dados(request.POST['cnpj'])
        nome = request.POST['nome']
        telefone = limpar_dados(request.POST['telefone'])
        email = request.POST['email']
        cep = limpar_dados(request.POST['cep']) 
        estado = request.POST['estado']
        cidade = request.POST['cidade']
        logradouro = request.POST['logradouro']
        bairro = request.POST['bairro']
        numero = request.POST['numero']
        senha = make_password(request.POST['senha']) # Aqui a senha é Criptografada antes de ser salva
        # especialidade_selecionada = request.POST['especialidade']
        raio_atendimento = request.POST['raio_atendimento']
        rede_social = request.POST.get('link_instagram')
        descricao = request.POST.get('descricao')        
        imagem_perfil = request.FILES.get('imagem_perfil')

        try:
            with transaction.atomic():
                # Criação do Fotógrafo PF
                fotografo_pj = FotografosPj.objects.create(
                    cnpj_fotografo_pj=cnpj,
                    razao_social_fotografo_pj=razao_social,
                )

                # Criação do Fotógrafo
                fotografo = Fotografos.objects.create(
                    nome_fotografo=nome,
                    telefone_fotografo=telefone,
                    raio_atendimento_fotografo=raio_atendimento,
                    email_fotografo=email,
                    senha_fotografo=senha,
                    descricao_fotografo=descricao,
                    redesocial_fotografo=rede_social,
                    imagem_perfil_fotografo=imagem_perfil,
                    fk_id_fotografo_pj=fotografo_pj,
                )

                # Criação do Endereço
                EnderecosFotografos.objects.create(
                    cep_endereco_fotografo=cep,
                    logradouro_endereco_fotografo=logradouro,
                    numero_endereco_fotografo=numero,
                    bairro_endereco_fotografo=bairro,
                    cidade_endereco_fotografo=cidade,
                    estado_endereco_fotografo=estado,
                    fk_id_fotografo=fotografo,
                )
                
                # Obtém a URL dinamicamente
                # redirect_url = reverse('login_profPJ_page')

                # Retorna uma resposta JSON de sucesso
                return JsonResponse({'success': True, 'message': 'Cadastro realizado com sucesso!'}) # Caso erro usar: 'redirect_url': redirect_url
            
        except Exception as e:
            print(f"Erro ao cadastrar o fotógrafo: {e}")
            return JsonResponse({'success': False, 'message': 'Erro ao cadastrar. Tente novamente.'})
    

def Cadastra_cliente (request):
    if request.method == 'POST':
        # Função para remover caracteres não numéricos da string "valor" e retornar apenas os caracteres numéricos sem espaços entre eles  
        def limpar_dados(valor):
            return ''.join(filter(str.isdigit, valor))
        # Dados recebidos do formulário
        nome = request.POST['nome']
        cpf = limpar_dados(request.POST['cpf'])
        genero = request.POST['genero']
        telefone = limpar_dados(request.POST['telefone'])
        email = request.POST['email']
        cep = limpar_dados(request.POST['cep'])
        estado = request.POST['estado']
        cidade = request.POST['cidade']
        logradouro = request.POST['logradouro']
        bairro = request.POST['bairro']
        numero = request.POST['numero']
        senha = make_password(request.POST['senha']) # A senha é Criptografada antes de ser salva 

        try:
            with transaction.atomic():
                # Criação do Cliente
                cliente = Clientes.objects.create(
                    nome_cliente=nome,
                    cpf_cliente=cpf,
                    genero_cliente=genero,
                    telefone_cliente=telefone,
                    email_cliente=email,
                    senha_cliente=senha,
                )
                # Criação do Endereço
                EnderecosClientes.objects.create(
                    cep_endereco_cliente=cep,
                    logradouro_endereco_cliente=logradouro,
                    numero_endereco_cliente=numero,
                    bairro_endereco_cliente=bairro,
                    cidade_endereco_cliente=cidade,
                    estado_endereco_cliente=estado,
                    fk_id_cliente=cliente,
                )

                # Obtém a URL dinamicamente
                redirect_url = reverse('login_cliente_page')
                
                # Retorna uma resposta JSON de sucesso
                return JsonResponse({'success': True, 'message': 'Cadastro realizado com sucesso!', 'redirect_url': redirect_url})
            
        except Exception as e:
            print(f"Erro ao cadastrar o fotógrafo: {e}")
            return JsonResponse({'success': False, 'message': 'Erro ao cadastrar. Tente novamente.'})

































