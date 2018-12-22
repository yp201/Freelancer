from django.db import models
from projectgiver.models import ProjectGiver
from FL.models import Freelancer


class Project(models.Model):
    ''' Model for Projects '''

    Title = models.CharField(max_length=50)
    proj_poster = models.ForeignKey(ProjectGiver, on_delete=models.CASCADE)
    freelancerAssigned = models.ForeignKey(
        Freelancer, on_delete=models.CASCADE, blank=True, null=True)
    description = models.CharField(max_length=800)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='available')
    noBids = models.IntegerField(default=0)
    deadline = models.DateField()
    flRating = models.IntegerField(default=0)
    ppRating = models.IntegerField(default=0)

    def __str__(self):
        return "Project Id:" + str(self.id) + " name:" + self.Title
