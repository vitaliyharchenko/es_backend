import geocoder

from django.db import models
# from django.contrib.postgres.fields import JSONField


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
        help_text='Возьмите из Яндекс карт',
        blank=True,
        null=True
    )

    latitude = models.FloatField(
        verbose_name='Широта',
        help_text='Возьмите из Яндекс карт',
        blank=True,
        null=True
    )

    address = models.CharField(
        max_length=500,
        verbose_name='Адрес',
        unique=True,
        help_text='В формате "ул. Московская, д.9"'
    )

    # geo_json = JSONField(
    #     blank=True,
    #     null=True
    # )

    class Meta:
        verbose_name = 'место'
        verbose_name_plural = 'места'

    def __str__(self):
        return self.address

    # def save(self, *args, **kwargs):
    #     # http://geocoder.readthedocs.io
    #     g = geocoder.yandex(u'{} {}'.format(self.city, self.address), lang='ru_RU')
    #     geo_json = g.geojson
    #     self.geo_json = geo_json
    #     properties = geo_json['features'][0]['properties']
    #     try:
    #         self.address = '{}, {}'.format(properties['street'], properties['housenumber'])
    #     except KeyError:
    #         print(properties)
    #         self.address = properties['raw']['name']
    #     self.longitude = properties['lng']
    #     self.latitude = properties['lat']
    #     super().save(*args, **kwargs)


class Court(models.Model):
    title = models.CharField(
        verbose_name='Название',
        max_length=200,
        unique=True
    )

    class Meta:
        verbose_name = 'площадка'
        verbose_name_plural = 'площадки'

    def __str__(self):
        return self.title
