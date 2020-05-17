from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    use_in_migrations = True

    @classmethod
    def normalize_email(cls, email):
        """ Normalize the email address by lowercase it. """
        email = email or ''
        try:
            email_name, domain_part = email.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            email = email_name.lower() + '@' + domain_part.lower()
        return email

    def _create_user(self, email, password, **extra_fields):
        """ Create and save a user with the given email, password and extra_fields."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """ Create user with createsuperuser method. """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


def get_avatar_path(instance, filename):
    """
        Define where to store image
        Instance is an instance of model, that contains image
        file will be uploaded to MEDIA_ROOT/...
    """
    return f'users/avatars/{instance.pk}/{filename}'


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Email', unique=True)

    first_name = models.CharField('Имя', max_length=30)
    last_name = models.CharField('Фамилия', max_length=30)

    date_joined = models.DateTimeField('Дата регистрации', auto_now_add=True)
    is_active = models.BooleanField('Активный профиль', default=True)
    is_staff = models.BooleanField('Статус админа', default=False)

    sex = models.CharField(max_length=1, choices=(('m', 'мужской'), ('f', 'женский')), verbose_name='Пол')
    weight = models.IntegerField('Вес', help_text='В кг.', null=True, blank=True)
    height = models.IntegerField('Рост', help_text='В см.', null=True, blank=True)
    bdate = models.DateField('Дата рождения', auto_now_add=False, blank=True, null=True,
                             help_text=u'В формате ГГГ-ММ-ДД')
    avatar = models.ImageField(upload_to=get_avatar_path, null=True, blank=True)

    # sport_types = models.ManyToManyField(SportType, blank=True)
    # amplua = models.ManyToManyField(Amplua, blank=True, null=True)

    # city = models.ForeignKey(
    #     City,
    #     verbose_name='Город',
    #     on_delete=models.CASCADE,
    #     related_name='user_city',
    #     default=None,
    #     null=True
    # )

    # # phone = PhoneNumberField(
    #     verbose_name='Мобильный телефон',
    #     unique=True,
    #     null=True,
    #     help_text=u'В формате +7**********'
    # )

    # bdate_privacy = models.BooleanField(verbose_name='Скрыть дату рождения', default=False)
    # phone_privacy = models.BooleanField(verbose_name='Скрыть номер телефона', default=False)

    # Флаги для Django
    is_active = models.BooleanField('Активность', default=True,
                                    help_text='Сделайте профиль неактивным вместо удаление')
    is_staff = models.BooleanField('Статус персонала', default=False,
                                   help_text='Отметьте, если пользователь может входить в административную часть сайта')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'

    def __str__(self):
        if self.first_name != "" and self.last_name != "":
            return u'{} {}'.format(self.first_name, self.last_name)
        else:
            return self.email

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return f'{self.first_name} {self.last_name}'
