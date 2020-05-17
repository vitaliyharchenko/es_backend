from django.contrib.auth.models import Group

from rest_framework import serializers

from apps.courts.serializers import CitySerializer
from .models import User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'permissions']


class UserSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = User
        fields = ['url', 'id', 'email', 'first_name', 'last_name', 'groups', 'city', 'bdate', 'last_login', 'get_full_name']
