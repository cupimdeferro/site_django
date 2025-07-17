from django.urls import path
from .import views

urlpatterns = [
    # path('', views.Listar_Perfis_ProfPF, name='listar_perfilPF_page'),    
    path('login/', views.Logar_profPF, name='logar_profPF'),
    path('login/', views.Logar_profPJ, name='logar_profPJ'),
    path('logout/', views.Logout_prof, name='logout_prof'),
    path('dashboard/', views.Carregar_dashboard, name='carregar_dashboard'),    
    path('dashboard/info-profissional/', views.Carregar_info_profissional, name='carregar_info_profissional'),
    path('dashboard/info-fotografia/', views.Carregar_info_fotografia, name='carregar_info_fotografia'),
    path('dashboard/info-suporte/', views.Carregar_info_suporte, name='carregar_info_suporte'),
    path('dashboard/atualizar-info-PF/', views.Atualizar_info_profPF, name='atualizar_info_profPF'),
    # path('carregar-info-PJ/', views.Carregar_info_profPJ, name='carregar_info_profPJ'),
    path('dashboard/atualizar-info-PJ/', views.Atualizar_info_profPJ, name='atualizar_info_profPJ'),
    path('dashboard/deletar-fotografia/', views.Deletar_fotografia, name='deletar_fotografia'),

]
