from django.db import models
from FL.models import Freelancer
from projects.models import Project
from projectgiver.models import ProjectGiver


class Notification(models.Model):
    ''' Model for Notifications '''

    project_poster = models.ForeignKey(ProjectGiver, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    project_status = models.CharField(max_length=50, default="Ongoing")
    seen_status = models.CharField(max_length=50, default="unseen")

    def __str__(self):
        return str(self.project_poster.account.username) + " " + str(self.project.Title)
