from django.shortcuts import render
from .serializer import UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Usuario
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser


#Funcion que registra un nuevo usuario
class RegistrarUsuarioView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UsuarioSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        if 'correo' in serializer.errors:
            return Response({'error': 'El correo ya está registrado'}, status=400)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Funcion que inicia sesion
class IniciarSesionView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        correo = request.data.get('correo')
        password = request.data.get('password')
        
        try:
            usuario = Usuario.objects.get(correo=correo)
        except Usuario.DoesNotExist:
            return Response({'error': 'Correo no registrado'}, status=status.HTTP_404_NOT_FOUND)
        
        if not usuario.check_password(password):
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(usuario)
        
        refresh['correo'] = usuario.correo
        
        usuarioSerializado = UsuarioSerializer(usuario)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'usuario': usuarioSerializado.data
        }, status=status.HTTP_200_OK)

class UsuarioView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser] 
    
    def get(self, request):
        usuario = request.user
        usuarioSerializado = UsuarioSerializer(usuario)
        return Response(usuarioSerializado.data)

    def put(self, request):
        try:
            usuario = request.user
            nombre = request.data.get('nombre')
            correo = request.data.get('correo')
            foto = request.FILES.get('foto')
            
            if foto:
                usuario.foto = foto
            usuario.nombre = nombre
            usuario.correo = correo
            usuario.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    