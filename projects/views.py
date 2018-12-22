from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from projects.models import Project
from projectskills.models import ProjectSkills
from skillSet.models import skillSet
from projectgiver.models import ProjectGiver
from FL.models import Freelancer
from django.template.context_processors import csrf
from django.contrib.auth.models import User
from notifications.models import Notification


def add(request):
    ''' Function to add a new project to the database '''

    title = request.POST.get('Title', '')
    description = request.POST.get('description', '')
    pp = ProjectGiver.objects.get(account=request.user)
    budget = request.POST.get('budget', '')
    deadline = request.POST.get('deadline', '')
    delim = deadline[2]
    dl = deadline.split(delim)
    dl.reverse()
    dead = '-'.join(dl)
    x = Project.objects.create(Title=title, description=description,
                               proj_poster=pp, budget=budget, deadline=dead, noBids=0)
    proSkills = request.POST.getlist('project_skills[]')
    skill_list = []
    for skill in proSkills:
        a = skillSet.objects.get(skillname=skill)
        ProjectSkills.objects.create(skill=a, projectid=x)
    response = HttpResponse('Project ' + title + ' added')
    return response


def project_done(request):
    ''' Function to mark a project as done/completed '''

    proj_id = request.POST.get('proj_id')
    project = Project.objects.get(id=proj_id)
    project.status = 'completed'
    project.save()
    rating = request.POST.get('rating')
    project.flRating = rating
    project.save()
    proj_poster = project.proj_poster
    freelancer = project.freelancerAssigned
    freelancer_rating = freelancer.rating
    freelancer_comp_project = Project.objects.filter(
        freelancerAssigned=freelancer, status='completed')
    freelancer_comp_projects = freelancer_comp_project.exclude(
        flRating=0).count()
    freelancer_new_rating = (
        (freelancer_rating * (freelancer_comp_projects - 1)) + int(rating)) / freelancer_comp_projects
    freelancer.rating = freelancer_new_rating
    freelancer.save()
    Notification.objects.create(project_poster=proj_poster, project=project,
                                freelancer=freelancer, project_status='completed', seen_status='freelancer_unseen')
    return HttpResponse("SUCCESS")
