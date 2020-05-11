from django.db import models


# Create your models here.
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
