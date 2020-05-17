from django.contrib import admin

from .models import City, Country, Court, CourtType, Place


class CityInline(admin.TabularInline):
    model = City
    extra = 0


class CountryAdmin(admin.ModelAdmin):
    model = Country
    inlines = [CityInline]


admin.site.register(Court)
admin.site.register(CourtType)
admin.site.register(Country, CountryAdmin)
admin.site.register(Place)
