from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = ['url', 'capacity', 'title', 'creator']
