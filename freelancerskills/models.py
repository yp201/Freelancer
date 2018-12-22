from django.db import models
from FL.models import Freelancer


class FreelancerSkills(models.Model):
    ''' Model for freelancer skills '''

    skillname = models.CharField(max_length=50)
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE)

    def __str__(self):
        return "skillname:" + str(self.skillname) + " " + str(self.freelancer)
