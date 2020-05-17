from django.contrib import admin

from .models import Game, UserGameRelation


class UserStatusesInline(admin.TabularInline):
    model = UserGameRelation
    extra = 0
    readonly_fields = ('datetime',)


class GameAdmin(admin.ModelAdmin):
    inlines = [
        UserStatusesInline,
    ]
    list_filter = ('is_reported', 'datetime')


# Register your models here.
admin.site.register(Game, GameAdmin)
