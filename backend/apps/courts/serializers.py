from rest_framework import serializers
from .models import Court


class CourtSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Court
        fields = ['url', 'id', 'title']
