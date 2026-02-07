from django.urls import path
from .views import RegistrarUsuarioView, IniciarSesionView, UsuarioView, RefreshTokenView

urlpatterns = [
    path('API/Registrar/', RegistrarUsuarioView.as_view(), name='registrar_usuario'),
    path('API/IniciarSesion/', IniciarSesionView.as_view(), name='iniciar_sesion'),
    path('me/', UsuarioView.as_view(), name='obtener_usuario'),
    path('refresh/', RefreshTokenView.as_view(), name='refresh_token'),
]
 