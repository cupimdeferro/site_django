from django.contrib import admin
from .models import Adms, Categorias, Clientes, EnderecosClientes, EnderecosFotografos, Fotografias, Fotografos, FotografosPf, FotografosPj, FotografosServicos, Servicos, ServicosClientes, ServicosTiposDeServicos, TiposDeServicos

# Register your models here.

admin.site.register(Adms)
admin.site.register(Categorias)
admin.site.register(Clientes)
admin.site.register(EnderecosClientes)
admin.site.register(EnderecosFotografos)
admin.site.register(Fotografias)
admin.site.register(Fotografos)
admin.site.register(FotografosPf)
admin.site.register(FotografosPj)
admin.site.register(FotografosServicos)
admin.site.register(Servicos)
admin.site.register(ServicosClientes)
admin.site.register(ServicosTiposDeServicos)
admin.site.register(TiposDeServicos)
