# Django core
from django.contrib import admin

# Models
from .models import SportRole, GameType, SportType


class GameTypeInline(admin.TabularInline):
    model = GameType
    extra = 0


class SportRoleInline(admin.TabularInline):
    model = SportRole
    extra = 0


class SportTypeAdmin(admin.ModelAdmin):
    model = SportType
    inlines = [GameTypeInline, SportRoleInline]


# Core django admin site register
admin.site.register(SportType, SportTypeAdmin)
