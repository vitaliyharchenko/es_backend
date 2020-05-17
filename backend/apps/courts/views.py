from rest_framework import viewsets
from rest_framework import permissions

from .models import Court
from .serializers import CourtSerializer


class CourtViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Court.objects.all().order_by('views')
    serializer_class = CourtSerializer
    permission_classes = [permissions.AllowAny]
