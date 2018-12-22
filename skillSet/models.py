from django.db import models


class skillSet(models.Model):
    ''' Model for Skillset '''
    skillname = models.CharField(max_length=50)

    def __str__(self):
        return "Skill:" + str(self.skillname)
