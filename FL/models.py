from django.db import models
from django.contrib.auth.models import User
import os


def get_image_path(instance, filename):
    ''' Creates image path to store the images foor profile pic '''
    return os.path.join('media', str(instance.account.username) + '.jpeg')


class Freelancer(models.Model):
    ''' Model for Freelancer'''
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    emailAddress = models.CharField(max_length=250, unique=True)
    account = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.DecimalField(
        max_digits=3, decimal_places=2, blank=True, null=True)
    profile_image = models.ImageField(
        upload_to=get_image_path, blank=True, null=True, default='../static/images/index.jpeg')

    def __str__(self):
        return "Freelancer id:" + str(self.id) + " name:" + self.first_name
