from rest_framework import serializers

from apps.users.serializers import UserSerializer
from apps.courts.serializers import CourtSerializer
from apps.sports.serializers import GameTypeSerializer

from .models import Game, UserGameRelation


class UserGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGameRelation
        fields = ['url', 'user', 'game', 'status', 'datetime']


class GameSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer(read_only=True)
    court = CourtSerializer(read_only=True)
    game_type = GameTypeSerializer()
    user_status = serializers.SerializerMethodField()
    statuses = UserGameSerializer(many=True, read_only=True)

    def get_user_status(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            last_user_game_relation = obj.get_last_user_status(user)
            if last_user_game_relation is not None:
                return last_user_game_relation.status
            else:
                return None
        else:
            return None

    class Meta:
        model = Game
        fields = ['id', 'capacity', 'creator', 'cost', 'datetime', 'duration', 'court', 'game_type', 'user_status', 'statuses', 'subscribers_count']
