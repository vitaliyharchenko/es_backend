from rest_framework import serializers

from apps.users.serializers import UserSerializer
from apps.courts.serializers import CourtSerializer
from apps.sports.serializers import GameTypeSerializer

from .models import Game


class GameSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer()
    court = CourtSerializer()
    game_type = GameTypeSerializer()

    class Meta:
        model = Game
        fields = ['url', 'id', 'capacity', 'creator', 'cost', 'datetime', 'duration', 'court', 'game_type']
