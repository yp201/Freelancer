from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from projects.models import Project
from projectgiver.models import ProjectGiver
from FL.models import Freelancer
from bid.models import Bid
from notifications.models import Notification
from django.template.context_processors import csrf
from django.contrib.auth.models import User


def add_bid(request):
    ''' Function to add a bid from th freelancer's side '''

    freelancer = Freelancer.objects.get(account=request.user)
    project_id = request.POST.get('project_id', '')
    project = Project.objects.get(id=project_id)
    projectPoster = project.proj_poster
    amount = request.POST.get('amount', 0)
    duration = request.POST.get('duration', '0')
    Bid.objects.create(freelancer=freelancer, project=project,
                       amount=amount, duration=duration, project_poster=projectPoster)
    project.noBids += 1
    project.save()
    Notification.objects.create(project_poster=projectPoster, project=project,
                                freelancer=freelancer, project_status='available', seen_status='project_poster_unseen')
    response = HttpResponse("Bid Created")
    return response


def accept_bid(request):
    ''' Function to accept a bid from the project giver's side '''

    bid_id = request.POST.get('bid_id')
    bid_obj = Bid.objects.get(id=bid_id)
    freelancerobj = bid_obj.freelancer
    proj_poster = bid_obj.project_poster
    projectobj = bid_obj.project
    projectobj.freelancerAssigned = freelancerobj
    projectobj.status = 'ongoing'
    projectobj.save()
    oldbids = Bid.objects.filter(project=projectobj).delete()
    obj = Notification.objects.create(project_poster=proj_poster, project=projectobj,
                                      freelancer=freelancerobj, project_status='ongoing', seen_status='freelancer_unseen')
    return HttpResponse("SUCCESS")
