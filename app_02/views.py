from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.contrib import messages
# from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.contrib.sessions.models import Session
from functools import wraps
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
# from datetime import datetime
from django.views.decorators.http import require_POST
# !!! Importante: Aqui está sendo importadas as models de app_01 !!!
from app_01.models import Fotografos, FotografosPf, FotografosPj, EnderecosFotografos, Categorias, Fotografias


# FUNÇÕES DE LOGIN E LOGOUT
def Loga_profPF(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        try:
            fotografo = Fotografos.objects.get(email_fotografo=email)

            # Verifica se a senha inserida confere com a senha salva no banco de dados
            if check_password(senha, fotografo.senha_fotografo):

                # Salva o ID do fotógrafo na sessão
                request.session['fotografo_id_sessao'] = fotografo.id_fotografo
                request.session['fotografo_nome_sessao'] = fotografo.nome_fotografo
                request.session['fotografo_email_sessao'] = fotografo.email_fotografo
                request.session['fotografo_imagem_sessao'] = fotografo.imagem_perfil_fotografo.url if fotografo.imagem_perfil_fotografo else None

                # Obtém a URL dinamicamente
                redirect_url = reverse('carrega_home_page')

                return JsonResponse({'success': True, 'message': 'Login realizado com sucesso!', 'redirect_url': redirect_url})
            else:
                return JsonResponse({'success': False, 'message': 'Senha incorreta. Tente Novamente!'})

        except Fotografos.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Email não cadastrado!'})

    return render(request, 'app_01/form_profissionalPF.html')


def Loga_profPJ(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')

        try:
            fotografo = Fotografos.objects.get(email_fotografo=email)

            # Verifica se a senha inserida confere com a senha salva no banco de dados
            if check_password(senha, fotografo.senha_fotografo):

                # Salva o ID do fotógrafo na sessão
                request.session['fotografo_id_sessao'] = fotografo.id_fotografo
                request.session['fotografo_nome_sessao'] = fotografo.nome_fotografo
                request.session['fotografo_email_sessao'] = fotografo.email_fotografo
                request.session['fotografo_imagem_sessao'] = fotografo.imagem_perfil_fotografo.url if fotografo.imagem_perfil_fotografo else None

                # Obtém a URL dinamicamente
                redirect_url = reverse('carrega_home_page')

                return JsonResponse({'success': True, 'message': 'Login realizado com sucesso!', 'redirect_url': redirect_url})
            else:
                return JsonResponse({'success': False, 'message': 'Senha incorreta. Tente Novamente!'})

        except Fotografos.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Email não cadastrado!'})

    return render(request, 'app_01/form_profissionalPJ.html')

def Logout_prof(request):
    request.session.flush()  # Remove todos os dados da sessão
    return redirect('carrega_home_page')


# Função para criar um decorador personalizado para verificar o login de sessão do Fotógrafo PF
def fotografoPF_login_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if 'fotografo_id_sessao' not in request.session:
            return redirect('login_profPF_page')
        return view_func(request, *args, **kwargs)
    return _wrapped_view

# Função para criar um decorador personalizado para verificar o login de sessão do Fotógrafo PJ
def fotografoPJ_login_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if 'fotografo_id_sessao' not in request.session:
            return redirect('login_profPJ_page')
        return view_func(request, *args, **kwargs)
    return _wrapped_view

# FUNÇÕES PARA CARREGAR TEMPLATES DO DASHBOARD E RENDERIZAR INFORMAÇÕES
@fotografoPF_login_required
@fotografoPJ_login_required
def Carrega_dashboard(request):
    fotografo_id = request.session.get('fotografo_id_sessao')
    fotografo = Fotografos.objects.get(id_fotografo=fotografo_id)

    if not fotografo_id:
        if fotografo.fk_id_fotografo_pf:
            return redirect('login_profPF_page')

        if fotografo.fk_id_fotografo_pj:
            return redirect('login_profPJ_page')

    fotografias = Fotografias.objects.filter(fk_id_fotografo=fotografo).order_by('-data_upload_fotografia', '-hora_upload_fotografia')
    ultima_foto = fotografias.first()
    data_ultimo_upload = ultima_foto.data_upload_fotografia if ultima_foto else None
    total_fotos = fotografias.count()

    return render(request, 'home_dashboard.html', {
        'fotografo': fotografo,
        'data_ultimo_upload': data_ultimo_upload,
        'total_fotos': total_fotos
    })


@fotografoPF_login_required
@fotografoPJ_login_required
def Carrega_edicao_info_prof(request):
    fotografo_id = request.session.get('fotografo_id_sessao')
    fotografo = get_object_or_404(Fotografos, id_fotografo=fotografo_id)

    try:
        endereco = EnderecosFotografos.objects.get(
            fk_id_fotografo=fotografo)
    except EnderecosFotografos.DoesNotExist:
        endereco = None

    if fotografo.fk_id_fotografo_pf:
        try:
            fotografo_pf = FotografosPf.objects.get(
                id_fotografo_pf=fotografo.fk_id_fotografo_pf.id_fotografo_pf)
        except FotografosPf.DoesNotExist:
            fotografo_pf = None

        contexto = {
            'fotografo': fotografo,
            'fotografo_pf': fotografo_pf,
            'endereco': endereco
        }

    elif fotografo.fk_id_fotografo_pj:
        try:
            fotografo_pj = FotografosPj.objects.get(
                id_fotografo_pj=fotografo.fk_id_fotografo_pj.id_fotografo_pj)
        except FotografosPj.DoesNotExist:
            fotografo_pj = None

        contexto = {
            'fotografo': fotografo,
            'fotografo_pj': fotografo_pj,
            'endereco': endereco
        }

    return render(request, 'info_profissional.html', contexto)

def Carrega_suporte(request):
    return render(request, 'suporte.html')



# FUNÇÕES PARA FUNCIONALIDADES DE EDIÇÃO DE DADOS E UPLOAD DE IMAGENS


@csrf_exempt
@fotografoPF_login_required
def Atualizar_info_profPF(request):
    if request.method == 'POST':
        fotografo_id = request.session.get('fotografo_id_sessao')
        fotografo = get_object_or_404(Fotografos, id_fotografo=fotografo_id)

        # Dados Pessoais
        fotografo.nome_fotografo = request.POST.get('nome')
        fotografo.telefone_fotografo = request.POST.get('telefone')
        fotografo.raio_atendimento_fotografo = request.POST.get(
            'raio_atendimento')
        fotografo.email_fotografo = request.POST.get('email')
        fotografo.descricao_fotografo = request.POST.get('descricao')
        fotografo.redesocial_fotografo = request.POST.get('instagram')

        # nova_senha = request.POST.get('senha')
        # if nova_senha:
        #     fotografo.senha_fotografo = make_password(nova_senha)

        if 'foto-perfil' in request.FILES:
            img = request.FILES['foto-perfil']
            filename = default_storage.save(
                f'images/perfis/{img.name}', ContentFile(img.read()))
            fotografo.imagem_perfil_fotografo = filename

        fotografo.save()

        # Dados PF
        try:
            fotografo_pf = FotografosPf.objects.get(
                id_fotografo_pf=fotografo.fk_id_fotografo_pf.id_fotografo_pf)
            fotografo_pf.apelido_profissional_fotografo_pf = request.POST.get(
                'apelido')
            fotografo_pf.data_nascimento_fotografo_pf = request.POST.get(
                'data_nascimento')
            fotografo_pf.genero_fotografo_pf = request.POST.get('genero')
            fotografo_pf.cpf_fotografo_pf = request.POST.get('cpf')
            fotografo_pf.save()
        except FotografosPf.DoesNotExist:
            pass

        # Endereço
        try:
            endereco = EnderecosFotografos.objects.get(
                fk_id_fotografo=fotografo)
        except EnderecosFotografos.DoesNotExist:
            endereco = EnderecosFotografos(fk_id_fotografo=fotografo)

        endereco.cep_endereco_fotografo = request.POST.get('cep')
        endereco.estado_endereco_fotografo = request.POST.get('estado')
        endereco.cidade_endereco_fotografo = request.POST.get('cidade')
        endereco.bairro_endereco_fotografo = request.POST.get('bairro')
        endereco.logradouro_endereco_fotografo = request.POST.get('logradouro')
        endereco.numero_endereco_fotografo = request.POST.get('numero')
        endereco.save()

        return JsonResponse({'success': True, 'message': 'Dados atualizados com sucesso!'})

    return JsonResponse({'success': False, 'message': 'Não foi possível atualizar seus dados!'})


@csrf_exempt
@fotografoPJ_login_required
def Atualizar_info_profPJ(request):
    if request.method == 'POST':
        fotografo_id = request.session.get('fotografo_id_sessao')
        fotografo = get_object_or_404(Fotografos, id_fotografo=fotografo_id)

        # Dados Pessoais
        fotografo.nome_fotografo = request.POST.get('nome')
        fotografo.telefone_fotografo = request.POST.get('telefone')
        fotografo.raio_atendimento_fotografo = request.POST.get(
            'raio_atendimento')
        fotografo.email_fotografo = request.POST.get('email')
        fotografo.descricao_fotografo = request.POST.get('descricao')
        fotografo.redesocial_fotografo = request.POST.get('instagram')

        # nova_senha = request.POST.get('senha')
        # if nova_senha:
        #     fotografo.senha_fotografo = make_password(nova_senha)

        if 'foto-perfil' in request.FILES:
            img = request.FILES['foto-perfil']
            filename = default_storage.save(
                f'images/perfis/{img.name}', ContentFile(img.read()))
            fotografo.imagem_perfil_fotografo = filename

        fotografo.save()

        # Dados PJ
        try:
            fotografo_pj = FotografosPj.objects.get(
                id_fotografo_pj=fotografo.fk_id_fotografo_pj.id_fotografo_pj)
            fotografo_pj.razao_social_fotografo_pj = request.POST.get(
                'razao_social')
            fotografo_pj.cnpj_fotografo_pj = request.POST.get(
                'cnpj')
            fotografo_pj.save()
        except FotografosPj.DoesNotExist:
            pass

        # Endereço
        try:
            endereco = EnderecosFotografos.objects.get(
                fk_id_fotografo=fotografo)
        except EnderecosFotografos.DoesNotExist:
            endereco = EnderecosFotografos(fk_id_fotografo=fotografo)

        endereco.cep_endereco_fotografo = request.POST.get('cep')
        endereco.estado_endereco_fotografo = request.POST.get('estado')
        endereco.cidade_endereco_fotografo = request.POST.get('cidade')
        endereco.bairro_endereco_fotografo = request.POST.get('bairro')
        endereco.logradouro_endereco_fotografo = request.POST.get('logradouro')
        endereco.numero_endereco_fotografo = request.POST.get('numero')
        endereco.save()

        return JsonResponse({'success': True, 'message': 'Dados atualizados com sucesso!'})

    return JsonResponse({'success': False, 'message': 'Não foi possível atualizar seus dados!'})


def Carrega_upload_fotografia(request):
    fotografo_id = request.session.get('fotografo_id_sessao')
    objeto_fotografo = get_object_or_404(Fotografos, id_fotografo=fotografo_id)

    if request.method == 'POST' and request.FILES.get('upload-photo'):
        imagem = request.FILES['upload-photo']
        categoria_id = request.POST.get('categoria_id')

        # Obtendo Metadados da Imagem
        nome_arquivo = imagem.name
        formato_arquivo = imagem.content_type.split('/')[-1]
        tamanho_arquivo = f"{round(imagem.size / 1024, 2)} KB"
        # data_upload = datetime.now()

        categoria = get_object_or_404(Categorias, id_categoria=categoria_id)

        Fotografias.objects.create(
            nome_arquivo_fotografia=nome_arquivo,
            formato_fotografia=formato_arquivo,
            tamanho_fotografia=tamanho_arquivo,
            # data_upload_fotografia=data_upload,
            fk_id_categoria=categoria,
            fotografia=imagem,
            fk_id_fotografo=objeto_fotografo
        )
        

        return JsonResponse({'status': 'success'})

    fotografias = Fotografias.objects.filter(fk_id_fotografo=objeto_fotografo).order_by('-data_upload_fotografia', '-hora_upload_fotografia')
    categorias = Categorias.objects.all()
    total_fotos = fotografias.count()

    # Obtendo a fotografia mais recente, se houver 
    ultima_foto = fotografias.first()
    data_ultimo_upload = ultima_foto.data_upload_fotografia if ultima_foto else None

    return render(request, 'info_fotografias.html', {
        'fotos': fotografias,
        'categorias': categorias,
        'data_ultimo_upload': data_ultimo_upload,
        'total_fotos': total_fotos
    })

@require_POST
@fotografoPF_login_required
@fotografoPJ_login_required
def Deletar_fotografia(request):
    foto_id = request.POST.get('id_fotografia')
    fotografo_id = request.session.get('fotografo_id_sessao')

    try:
        foto = Fotografias.objects.get(id_fotografia=foto_id, fk_id_fotografo=fotografo_id)
        foto.delete()
        return JsonResponse({'status': 'success'})
    
    except Fotografias.DoesNotExist:
        return JsonResponse({'status':'error', 'message': 'Foto não encontrada'})
    
