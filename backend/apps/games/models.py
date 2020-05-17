from django.db import models

from apps.courts.models import Court
from apps.sports.models import GameType


# Create your models here.
class Game(models.Model):

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

    court = models.ForeignKey(Court, on_delete=models.CASCADE)

    game_type = models.ForeignKey(
        GameType,
        verbose_name='Тип игры',
        on_delete=models.CASCADE
    )

    datetime = models.DateTimeField(verbose_name='Начало')

    duration = models.DurationField(
        verbose_name=u'Длительность',
        help_text=u'ЧЧ:ММ:СС',
        null=True,
        blank=True
    )

    visibility = models.BooleanField(verbose_name='Публичная игра', default=True)
    is_reported = models.BooleanField(verbose_name='Создан отчет', default=False)

    class Meta:
        verbose_name = 'игра'
        verbose_name_plural = 'игры'

    def __str__(self):
        return u'{}'.format(self.datetime)

    def get_statuses(self):
        return UserGameRelation.objects.filter(game=self).order_by('-datetime')

    def get_last_user_status(self, user):
        return UserGameRelation.objects.filter(game=self).order_by('-datetime').filter(user=user).first()

    def subscribers_count(self):
        relations = UserGameRelation.objects.filter(game=self, status=UserGameRelation.SUBSCRIBED).count()
        return relations


class UserGameRelation(models.Model):
    class Meta:
        verbose_name = 'запись на игру'
        verbose_name_plural = 'записи на игру'

    SUBSCRIBED = 1
    RESERVED = 2
    UNSUBSCRIBED = 3
    VISITED = 4
    NOTVISITED = 5
    STATUSES = (
        (SUBSCRIBED, 'Записался'),
        (UNSUBSCRIBED, 'Отписался'),
        (RESERVED, 'В резерве'),
        (VISITED, 'Посетил'),
        (NOTVISITED, 'Не пришел')
    )

    user = models.ForeignKey(
        'users.User',
        verbose_name='Пользователь',
        related_name=u'usergame',
        on_delete=models.CASCADE
    )

    game = models.ForeignKey(
        'games.Game',
        verbose_name='Игра',
        related_name='statuses',
        on_delete=models.CASCADE
    )

    datetime = models.DateTimeField(verbose_name='Дата действия', auto_now=True)

    status = models.PositiveSmallIntegerField(verbose_name='Действие', choices=STATUSES, null=True)

    def __str__(self):
        return u'{} | {}'.format(self.user, self.get_status_display())
