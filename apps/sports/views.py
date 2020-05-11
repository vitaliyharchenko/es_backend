from rest_framework import viewsets
from rest_framework import permissions

from .models import GameType, SportType, SportRole
from .serializers import GameTypeSerializer, SportTypeSerializer, SportRoleSerializer


class SportTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = SportType.objects.all()
    serializer_class = SportTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class GameTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = GameType.objects.all()
    serializer_class = GameTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class SportRoleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = SportRole.objects.all()
    serializer_class = SportRoleSerializer
    permission_classes = [permissions.IsAuthenticated]
