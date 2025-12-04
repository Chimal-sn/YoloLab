from django.urls import path
from .views import RegistrarUsuarioView, IniciarSesionView 

urlpatterns = [
    path('API/Registrar/', RegistrarUsuarioView.as_view(), name='registrar_usuario'),
    path('API/IniciarSesion/', IniciarSesionView.as_view(), name='iniciar_sesion'),
]
 