# Generated by Django 3.0.6 on 2020-05-17 11:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sports', '0001_initial'),
        ('courts', '0005_auto_20200517_1155'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='city',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_city', to='courts.City', verbose_name='Город'),
        ),
        migrations.AddField(
            model_name='user',
            name='sport_roles',
            field=models.ManyToManyField(blank=True, null=True, to='sports.SportRole'),
        ),
    ]