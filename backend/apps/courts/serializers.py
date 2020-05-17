from rest_framework import serializers
from .models import Court, Place, City, Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'title']


class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = City
        fields = ['id', 'country', 'title']


class PlaceSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = Place
        fields = ['id', 'address', 'city']


class CourtSerializer(serializers.HyperlinkedModelSerializer):
    place = PlaceSerializer()

    class Meta:
        model = Court
        fields = ['url', 'id', 'title', 'place']
