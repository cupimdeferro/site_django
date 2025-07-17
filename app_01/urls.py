from django.urls import path
from .import views

urlpatterns = [
    path('', views.Ir_Home_Page, name='carregar_home_page'),
    path('portifolio/moda/', views.Ir_Port_Moda, name='port_moda_page'),
    path('portifolio/casamento/', views.Ir_Port_Casamento, name='port_casamento_page'),
    path('profissionalPF/login/', views.Ir_Login_ProfPF, name='login_profPF_page'),
    path('profissionalPF/cadastro/', views.Cadastrar_ProfPF, name='cadastro_profPF_page'),
    path('profissionalPJ/login/', views.Ir_Login_ProfPJ, name='login_profPJ_page'),
    path('profissionalPJ/cadastro/', views.Cadastrar_ProfPJ, name='cadastro_profPJ_page'),
    path('cliente/login/', views.Ir_Login_Cliente, name='login_cliente_page'),
    path('cliente/cadastro/', views.Cadastrar_Cliente, name='cadastro_cliente_page'),
]
