# Generated by Django 3.0.6 on 2020-05-11 06:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='responsible',
        ),
        migrations.AddField(
            model_name='game',
            name='creator',
            field=models.ForeignKey(default=1, limit_choices_to={'groups__name': 'Creators'}, on_delete=django.db.models.deletion.CASCADE, related_name='creator', to=settings.AUTH_USER_MODEL, verbose_name='Создатель'),
            preserve_default=False,
        ),
    ]