from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError('El correo es obligatorio')
        correo = self.normalize_email(correo)
        user = self.model(correo=correo, **extra_fields)
        user.set_password(password)  # Hashea la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, password=None, **extra_fields):
        extra_fields.setdefault('rol', 'admin')  # Por defecto, superusuarios son 'admin'
        return self.create_user(correo, password, **extra_fields)

class Usuario(AbstractBaseUser):
    
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Ampliado para contraseñas hasheadas
    foto = models.ImageField(upload_to='Perfil/', null=True, blank=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'  # Campo usado para autenticación
    REQUIRED_FIELDS = ['nombre']  # Campos obligatorios al crear un superusuario

    def __str__(self):
        return self.nombre

    @property
    def username(self):
        """
        Helper para plantillas que esperan un atributo username.
        Prioriza el nombre y usa el correo como respaldo.
        """
        return self.nombre or self.correo
