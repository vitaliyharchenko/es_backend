"""conf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from apps.games.views import GameViewSet, UserGameViewSet
from apps.users.views import GroupViewSet
from apps.users.views import UserViewSet
from apps.courts.views import CourtViewSet
from apps.sports.views import GameTypeViewSet, SportTypeViewSet, SportRoleViewSet


router = routers.DefaultRouter()
router.register(r'games', GameViewSet)
router.register(r'user_games', UserGameViewSet)
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'courts', CourtViewSet)
router.register(r'game_types', GameTypeViewSet)
router.register(r'sport_types', SportTypeViewSet)
router.register(r'sport_roles', SportRoleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
