from django.db import models
from projects.models import Project
from skillSet.models import skillSet


class ProjectSkills(models.Model):
    ''' Model for projects' skills '''
    skill = models.ForeignKey(skillSet, on_delete=models.CASCADE)
    projectid = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return "skillname:" + str(self.skill.skillname) + " " + str(self.projectid.Title)
