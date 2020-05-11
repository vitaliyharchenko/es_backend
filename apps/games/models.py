from django.db import models


# Create your models here.
class Game(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')

    visibility = models.BooleanField(verbose_name='Публичная игра', default=True)
    is_reported = models.BooleanField(verbose_name='Создан отчет', default=False)

    creator = models.ForeignKey(
        'users.User',
        verbose_name=u'Создатель',
        related_name=u'creator',
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Creators'}
    )

    capacity = models.SmallIntegerField(
        verbose_name='Вместимость',
        blank=True,
        default=0
    )

    cost = models.SmallIntegerField(
        verbose_name='Цена',
        blank=True,
        default=0
    )

    datetime = models.DateTimeField(verbose_name='Начало')

    duration = models.DurationField(
        verbose_name=u'Длительность',
        help_text=u'В минутах',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = 'игра'
        verbose_name_plural = 'игры'

    def __str__(self):
        return u'{}, {}'.format(self.title, self.datetime)
