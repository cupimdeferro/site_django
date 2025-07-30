from django.urls import path
from .import views

urlpatterns = [
    # path('', views.Listar_Perfis_ProfPF, name='listar_perfilPF_page'),    
    path('login/', views.Loga_profPF, name='loga_profPF'),
    path('login/', views.Loga_profPJ, name='loga_profPJ'),
    path('logout/', views.Logout_prof, name='logout_prof'),
    path('dashboard/', views.Carrega_dashboard, name='carrega_dashboard'),    
    path('dashboard/info-profissional/', views.Carrega_edicao_info_prof, name='carrega_edicao_cad_prof'),
    path('dashboard/info-fotografia/', views.Carrega_upload_fotografia, name='carrega_upload_fotografia'),
    path('dashboard/info-suporte/', views.Carrega_suporte, name='carrega_info_suporte'),
    path('dashboard/atualizar-info-PF/', views.Atualizar_info_profPF, name='atualizar_info_profPF'),
    # path('carregar-info-PJ/', views.Carregar_info_profPJ, name='carregar_info_profPJ'),
    path('dashboard/atualizar-info-PJ/', views.Atualizar_info_profPJ, name='atualizar_info_profPJ'),
    path('dashboard/deletar-fotografia/', views.Deletar_fotografia, name='deleta_fotografia'),

]
