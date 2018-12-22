from django.db import models
from FL.models import Freelancer
from projects.models import Project
from projectgiver.models import ProjectGiver


class Bid(models.Model):
    ''' Model for Bds '''
    project_poster = models.ForeignKey(ProjectGiver, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)
    def __str__(self):
        return str(self.freelancer.account.username) + " " + str(self.project.Title)
