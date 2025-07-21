# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Adms(models.Model):
    id_adm = models.AutoField(primary_key=True)
    nome_adm = models.CharField(max_length=45)
    email_adm = models.CharField(max_length=45)
    senha_adm = models.CharField(max_length=10)

    class Meta:
        # managed = False
        db_table = 'adms'

# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)

#     class Meta:
#         # managed = False
#         db_table = 'auth_group'


# class AuthGroupPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     group_id = models.IntegerField()
#     permission_id = models.IntegerField()

#     class Meta:
#         # managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group_id', 'permission_id'),)


# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type_id = models.IntegerField()
#     codename = models.CharField(max_length=100)

#     class Meta:
#         # managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type_id', 'codename'),)


# class AuthUser(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.IntegerField()
#     username = models.CharField(unique=True, max_length=150)
#     first_name = models.CharField(max_length=150)
#     last_name = models.CharField(max_length=150)
#     email = models.CharField(max_length=254)
#     is_staff = models.IntegerField()
#     is_active = models.IntegerField()
#     date_joined = models.DateTimeField()

#     class Meta:
#         # managed = False
#         db_table = 'auth_user'


# class AuthUserGroups(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user_id = models.IntegerField()
#     group_id = models.IntegerField()

#     class Meta:
#         # managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user_id', 'group_id'),)


# class AuthUserUserPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user_id = models.IntegerField()
#     permission_id = models.IntegerField()

#     class Meta:
#         # managed = False
#         db_table = 'auth_user_user_permissions'
#         unique_together = (('user_id', 'permission_id'),)



class Categorias(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    descricao_categoria = models.CharField(max_length=100)

    class Meta:
        # managed = False
        db_table = 'categorias'


class Clientes(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nome_cliente = models.CharField(max_length=70)
    genero_cliente = models.CharField(max_length=15)
    cpf_cliente = models.CharField(max_length=14, blank=True, null=True)
    telefone_cliente = models.CharField(max_length=45)
    email_cliente = models.CharField(max_length=45)
    senha_cliente = models.CharField(max_length=45)

    class Meta:
        # managed = False
        db_table = 'clientes'


# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.PositiveSmallIntegerField()
#     change_message = models.TextField()
#     content_type_id = models.IntegerField(blank=True, null=True)
#     user_id = models.IntegerField()

#     class Meta:
#         # managed = False
#         db_table = 'django_admin_log'


# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)

#     class Meta:
#         # managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)


# class DjangoMigrations(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()

#     class Meta:
#         # managed = False
#         db_table = 'django_migrations'


# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()

#     class Meta:
#         # managed = False
#         db_table = 'django_session'


class EnderecosClientes(models.Model):
    id_endereco_cliente = models.AutoField(primary_key=True)
    cep_endereco_cliente = models.CharField(max_length=15)
    logradouro_endereco_cliente = models.CharField(max_length=100)
    numero_endereco_cliente = models.IntegerField()
    bairro_endereco_cliente = models.CharField(max_length=45)
    cidade_endereco_cliente = models.CharField(max_length=45)
    estado_endereco_cliente = models.CharField(max_length=10)
    fk_id_cliente = models.ForeignKey(Clientes, models.DO_NOTHING, db_column='fk_id_cliente')

    class Meta:
        # managed = False
        db_table = 'enderecos_clientes'


class EnderecosFotografos(models.Model):
    id_endereco_fotografo = models.AutoField(primary_key=True)
    cep_endereco_fotografo = models.CharField(max_length=15)
    logradouro_endereco_fotografo = models.CharField(max_length=100)
    numero_endereco_fotografo = models.IntegerField()
    bairro_endereco_fotografo = models.CharField(max_length=45)
    cidade_endereco_fotografo = models.CharField(max_length=45)
    estado_endereco_fotografo = models.CharField(max_length=10)
    fk_id_fotografo = models.ForeignKey('Fotografos', models.DO_NOTHING, db_column='fk_id_fotografo')

    class Meta:
        # managed = False
        db_table = 'enderecos_fotografos'


class Fotografias(models.Model):
    id_fotografia = models.AutoField(primary_key=True)
    fotografia = models.ImageField(upload_to='images/fotografias/', max_length=100)
    nome_arquivo_fotografia = models.CharField(max_length=100)
    formato_fotografia = models.CharField(max_length=10)
    tamanho_fotografia = models.CharField(max_length=10)
    data_upload_fotografia = models.DateField(auto_now_add=True)
    hora_upload_fotografia = models.TimeField(auto_now_add=True)
    comentario_fotografia = models.CharField(max_length=150, blank=True, null=True)
    fk_id_fotografo = models.ForeignKey('Fotografos', models.DO_NOTHING, db_column='fk_id_fotografo')
    fk_id_categoria = models.ForeignKey(Categorias, models.DO_NOTHING, db_column='fk_id_categoria')

    class Meta:
        # managed = False
        db_table = 'fotografias'


class Fotografos(models.Model):
    id_fotografo = models.AutoField(primary_key=True)
    nome_fotografo = models.CharField(max_length=70)
    telefone_fotografo = models.CharField(max_length=45)
    raio_atendimento_fotografo = models.CharField(max_length=70)
    email_fotografo = models.CharField(max_length=45)
    senha_fotografo = models.CharField(max_length=255)
    descricao_fotografo = models.CharField(max_length=200, blank=True, null=True)
    redesocial_fotografo = models.CharField(max_length=45, blank=True, null=True)
    imagem_perfil_fotografo = models.ImageField(upload_to='images/perfis/', max_length=100, blank=True, null=True)
    fk_id_fotografo_pj = models.ForeignKey('FotografosPj', models.DO_NOTHING, db_column='fk_id_fotografo_pj', blank=True, null=True)
    fk_id_fotografo_pf = models.ForeignKey('FotografosPf', models.DO_NOTHING, db_column='fk_id_fotografo_pf', blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'fotografos'

    def __str__(self):
        return f"{self.nome_fotografo}" 



class FotografosPf(models.Model):
    id_fotografo_pf = models.AutoField(primary_key=True)
    cpf_fotografo_pf = models.CharField(max_length=14)
    apelido_profissional_fotografo_pf = models.CharField(max_length=45)
    data_nascimento_fotografo_pf = models.DateField()
    genero_fotografo_pf = models.CharField(max_length=15)

    class Meta:
        # managed = False
        db_table = 'fotografos_pf'


class FotografosPj(models.Model):
    id_fotografo_pj = models.AutoField(primary_key=True)
    cnpj_fotografo_pj = models.CharField(max_length=45)
    razao_social_fotografo_pj = models.CharField(max_length=100)

    class Meta:
        # managed = False
        db_table = 'fotografos_pj'


class FotografosServicos(models.Model):
    fk_id_fotografo = models.OneToOneField(Fotografos, models.DO_NOTHING, db_column='fk_id_fotografo', primary_key=True)  # The composite primary key (fk_id_fotografo, fk_id_servico) found, that is not supported. The first column is selected.
    fk_id_servico = models.ForeignKey('Servicos', models.DO_NOTHING, db_column='fk_id_servico')

    class Meta:
        # managed = False
        db_table = 'fotografos_servicos'
        unique_together = (('fk_id_fotografo', 'fk_id_servico'),)


class Servicos(models.Model):
    id_servico = models.AutoField(primary_key=True)
    data_contratacao_servico = models.DateField()
    hora_contratacao_servico = models.TimeField()
    quantidade_servico = models.CharField(max_length=45)

    class Meta:
        # managed = False
        db_table = 'servicos'


class ServicosClientes(models.Model):
    fk_id_servico = models.OneToOneField(Servicos, models.DO_NOTHING, db_column='fk_id_servico', primary_key=True)  # The composite primary key (fk_id_servico, fk_id_cliente) found, that is not supported. The first column is selected.
    fk_id_cliente = models.ForeignKey(Clientes, models.DO_NOTHING, db_column='fk_id_cliente')

    class Meta:
        # managed = False
        db_table = 'servicos_clientes'
        unique_together = (('fk_id_servico', 'fk_id_cliente'),)



class ServicosTiposDeServicos(models.Model):
    fk_id_servico = models.OneToOneField(Servicos, models.DO_NOTHING, db_column='fk_id_servico', primary_key=True)  # The composite primary key (fk_id_servico, fk_id_tipo_de_servico) found, that is not supported. The first column is selected.
    fk_id_tipo_de_servico = models.ForeignKey('TiposDeServicos', models.DO_NOTHING, db_column='fk_id_tipo_de_servico')

    class Meta:
        # managed = False
        db_table = 'servicos_tipos_de_servicos'
        unique_together = (('fk_id_servico', 'fk_id_tipo_de_servico'),)

class TiposDeServicos(models.Model):
    id_tipo_de_servico = models.AutoField(primary_key=True)
    descricao_tipo_de_servico = models.CharField(max_length=100)
    valor_tipo_de_servico = models.FloatField()

    class Meta:
        # managed = False
        db_table = 'tipos_de_servicos'
