from rest_framework import serializers
from .models import GameType, SportType, SportRole


class SportTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SportType
        fields = ['url', 'title']


class GameTypeSerializer(serializers.HyperlinkedModelSerializer):
    sport_type = SportTypeSerializer()

    class Meta:
        model = GameType
        fields = ['url', 'title', 'sport_type']


class SportRoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SportRole
        fields = ['url', 'title', 'sport_type']

