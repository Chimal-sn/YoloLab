from django.urls import path
from .views import RegistrarUsuarioView, IniciarSesionView, ObtenerUsuarioView

urlpatterns = [
    path('API/Registrar/', RegistrarUsuarioView.as_view(), name='registrar_usuario'),
    path('API/IniciarSesion/', IniciarSesionView.as_view(), name='iniciar_sesion'),
    path('API/ObtenerUsuario/', ObtenerUsuarioView.as_view(), name='obtener_usuario'),
]
 