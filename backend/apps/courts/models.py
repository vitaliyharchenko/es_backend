import requests

from django.db import models
from django.contrib.postgres.fields import JSONField


class Country(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название', unique=True)

    class Meta:
        verbose_name = 'страна'
        verbose_name_plural = 'страны'

    def __str__(self):
        return self.title


class City(models.Model):
    title = models.CharField(
        max_length=100,
        verbose_name='Название',
        unique=True
    )

    country = models.ForeignKey(
        Country,
        verbose_name='Страна',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'город'
        verbose_name_plural = 'города'

    def __str__(self):
        return self.title


class Place(models.Model):
    city = models.ForeignKey(
        City,
        verbose_name='Город',
        on_delete=models.CASCADE
    )

    longitude = models.FloatField(
        verbose_name='Долгота',
        help_text='Заполняется автоматически',
        blank=True,
        null=True
    )

    latitude = models.FloatField(
        verbose_name='Широта',
        help_text='Заполняется автоматически',
        blank=True,
        null=True
    )

    address = models.CharField(
        max_length=500,
        verbose_name='Адрес',
        unique=True,
        help_text='В формате "Московская 9б'
    )

    geo_json = JSONField(
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'место'
        verbose_name_plural = 'места'

    def __str__(self):
        return self.address

    def save(self, *args, **kwargs):
        YANDEX_API_KEY = "0ca6bbb3-0da0-485f-a717-8a95d054d497"
        base_url = "https://geocode-maps.yandex.ru/1.x"

        query = '{}, {}'.format(self.city, self.address)
        params = {"apikey": YANDEX_API_KEY, "geocode": query, "format": "json"}
        response = requests.get(base_url, params=params)
        response.raise_for_status()

        geo_json = response.json()["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]
        self.geo_json = geo_json

        coords = geo_json["Point"]["pos"].split(" ")
        self.longitude, self.latitude = coords[0], coords[1]

        self.address = geo_json["name"]

        # Reserved free method
        # base_url = "https://nominatim.openstreetmap.org/search"
        # query = '{} {} {}'.format(self.city.country.title, self.city.title, self.address)
        # params = {"q": query, "format": "json"}
        # response = requests.get(base_url, params=params)
        # response.raise_for_status()
        #
        # object = response.json()[0]
        # self.geo_json = object
        #
        # self.longitude = object['lon']
        # self.latitude = object['lat']
        #
        # listing = str(object["display_name"]).split(', ')
        # self.address = '{}, д.{}'.format(listing[1], listing[0])

        super().save(*args, **kwargs)


class CourtType(models.Model):
    title = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='Название типа площадки'
    )

    class Meta:
        verbose_name = 'тип площадки'
        verbose_name_plural = 'типы площадок'

    def __str__(self):
        return self.title


# Define where to store image
# Instance is an instanсe of model, that contains image
def court_image_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/...
    return 'courts/{0}/{1}/{2}'.format(
        instance.place.city,
        instance.title,
        filename)


class Court(models.Model):
    title = models.CharField(
        verbose_name='Название',
        max_length=200,
        unique=True
    )

    place = models.ForeignKey(
        Place,
        verbose_name='Место',
        on_delete=models.CASCADE
    )

    views = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'площадка'
        verbose_name_plural = 'площадки'

    def __str__(self):
        return self.title
