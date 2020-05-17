from rest_framework import viewsets
from rest_framework import permissions

from .models import Game, UserGameRelation
from .serializers import GameSerializer, UserGameSerializer


class UserGameViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = UserGameRelation.objects.all().order_by('-datetime')
    serializer_class = UserGameSerializer
    permission_classes = [permissions.AllowAny]


class GameViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Game.objects.all().order_by('-datetime')
    serializer_class = GameSerializer
    permission_classes = [permissions.AllowAny]
