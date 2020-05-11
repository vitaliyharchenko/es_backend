from rest_framework import serializers

from apps.users.serializers import UserSerializer
from apps.courts.serializers import CourtSerializer

from .models import Game


class GameSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer()
    court = CourtSerializer()

    class Meta:
        model = Game
        fields = ['url', 'id', 'capacity', 'creator', 'cost', 'datetime', 'duration', 'court']
