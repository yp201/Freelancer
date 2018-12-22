from django.db import models


class OTP(models.Model):
    ''' Model for OTP '''

    otp = models.IntegerField()
    email = models.CharField(max_length=255)

    def __str__(self):
        return str(self.email) + ": " + str(self.otp)
