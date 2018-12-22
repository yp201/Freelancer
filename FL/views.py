from django.shortcuts import render
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib import auth
from .models import Freelancer
from projects.models import Project
from projectskills.models import ProjectSkills
from django.template.context_processors import csrf
from functools import reduce
from django.contrib.auth.models import User
from django.views.decorators.cache import cache_control
from skillSet.models import skillSet
from freelancerskills.models import FreelancerSkills
from bid.models import Bid
from notifications.models import Notification


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def homeFL(request):
    ''' Redirects to Freelancer dashboard page based on user login '''

    try:
        fl = Freelancer.objects.get(account=request.user)
        return render(request, 'entry.html')
    except:
        return HttpResponseRedirect('/#login')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def flSignout(request):
    ''' Freelancer signout redirects to Home page '''

    auth.logout(request)
    return HttpResponseRedirect('/')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def fl_edit_profile(request):
    ''' Function to edit the profile of the Freelancer '''

    first_name = request.POST.get('fname', "")
    last_name = request.POST.get('lname', "")
    email = request.POST.get('email', "")
    freelancerobj = Freelancer.objects.get(account=request.user)
    freelancerobj.first_name = first_name
    freelancerobj.last_name = last_name
    freelancerobj.emailAddress = email
    freelancerobj.save()
    return HttpResponseRedirect('/freelancer')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def fl_edit_pic(request):
    ''' Function to edit the profile pic of the Freelancer '''

    profile_image_src = request.FILES['profile_image']
    freelancerobj = Freelancer.objects.get(account=request.user)
    freelancerobj.profile_image = profile_image_src
    freelancerobj.save()
    return HttpResponseRedirect('/freelancer')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def render_page(request):
    ''' Function which sends data to front end to populate the fields '''

    fl = Freelancer.objects.get(account=request.user)
    madebids = Bid.objects.filter(freelancer=fl)
    bidsMade = []
    for b in madebids:
        bidsMade.append({'Title': b.project.Title, 'projectgiver': b.project_poster.account.username,
                         'amount': b.amount, 'duration': b.duration})
    availableSkills = skillSet.objects.all()
    skill_list = []
    for skill in availableSkills:
        skill_list.append(skill.skillname)
    compl_proj = Project.objects.filter(
        freelancerAssigned=fl, status='completed')
    compl_proj_list = []
    for obj in compl_proj:
        innerdict = {'Title': obj.Title, 'description': obj.description,
                     'id': obj.id, 'projectPosterRating': obj.ppRating}
        compl_proj_list.append(innerdict)
    ongo_proj = Project.objects.filter(status='ongoing', freelancerAssigned=fl)
    ongo_proj_list = []
    for obj in ongo_proj:
        innerdict = {'Title': obj.Title,
                     'description': obj.description, 'id': obj.id}
        ongo_proj_list.append(innerdict)
    freelancer_skill_list = []
    freelancer_skill = FreelancerSkills.objects.filter(
        freelancer__account=request.user)
    for obj in freelancer_skill:
        innerdict = {'name': obj.skillname}
        freelancer_skill_list.append(innerdict)
    dict = {'first_name': fl.first_name, 'last_name': fl.last_name, 'emailAddress': fl.emailAddress,
            'rating': fl.rating, 'profile_image': str(fl.profile_image), 'username': fl.account.username,
            'skills': skill_list, 'compl_proj_list': compl_proj_list, 'ongo_proj_list': ongo_proj_list, 'csrf_token': str(csrf(request)['csrf_token']),
            'freelancer_skill': freelancer_skill_list, 'bids': bidsMade}
    return JsonResponse(dict, safe=False)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def skills(request):
    ''' Function which returns the skills available to front end '''

    availableSkills = skillSet.objects.all()
    skill_list = []
    for skill in availableSkills:
        skill_list.append(skill.skillname)
    dict = {'skills': skill_list}
    return JsonResponse(dict)


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def search_render(request):
    ''' Redirects to search page for searching projects '''

    if request.user.is_authenticated:
        return render(request, 'search.html')
    else:
        return HttpResponseRedirect('/#login')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def search_skill(request):
    ''' Fucntion to search for projects based on skill '''

    proj_name = request.GET.get('nameSearch')
    skillarr = request.GET.getlist('checks[]')
    ordering = request.GET.get('ordering')
    proj_obj = ProjectSkills.objects.all()
    queries = [Q(skill__skillname__icontains=skill) for skill in skillarr]
    if queries != []:
        query = queries.pop()
    else:
        query = Q()
    for q in queries:
        query |= q

    proj_obj2 = proj_obj.filter(query)
    proj_obj1 = proj_obj2.filter(
        projectid__status='available', projectid__Title__icontains=proj_name)
    a = proj_obj1.values_list('projectid_id', flat=True).distinct()
    b = Project.objects.filter(id__in=a)
    if (ordering == 'bids'):
        proj_obj1 = b.order_by('-noBids')
    elif (ordering == 'budget'):
        proj_obj1 = b.order_by('-budget')
    project_list = []
    for obj in proj_obj1:
        skil = ProjectSkills.objects.filter(
            projectid=obj).values_list('skill__skillname', flat=True)
        if Bid.objects.filter(freelancer=Freelancer.objects.filter(account=request.user)[0], project=obj):
            buttonVal = "disabled"
        else:
            buttonVal = ''
        Fl = Freelancer.objects.get(account=request.user)
        newBid = not not (Bid.objects.filter(freelancer=Fl, project=obj))
        innerdict = {'skill_type': list(skil), 'Title': obj.Title, 'ProjectPoster': obj.proj_poster.account.username, 'buttonVal': buttonVal,
                     'description': obj.description, 'budget': obj.budget, 'deadline': obj.deadline, 'nobids': obj.noBids, 'project': {'projectid': obj.id, 'bid_status': newBid}}
        project_list.append(innerdict)
    dict = {'proj_list': project_list, 'name': proj_name}
    return JsonResponse(dict)


def add_skill(request):
    ''' Function to add a particular skill to a freelancer '''

    skillarr = request.GET.getlist('checks[]')
    fl = Freelancer.objects.get(account=request.user)
    for i in range(len(skillarr)):
        FreelancerSkills.objects.create(skillname=skillarr[i], freelancer=fl)
    return HttpResponse("SUCCESS")


def notification_freelancer(request):
    ''' Function to check for notifications for a Freelancer '''

    freelancer = Freelancer.objects.filter(account=request.user)[0]
    noti_obj = Notification.objects.filter(
        freelancer=freelancer, seen_status='freelancer_unseen')
    noti_list = []
    for obj in noti_obj:
        innerdict = {'notification_id': obj.id, 'project_poster': obj.project_poster.first_name,
                     'freelancer': obj.freelancer.first_name, 'project': obj.project.Title, 'noti_type': obj.project.status}
        obj.save()
        noti_list.append(innerdict)
    dict = {'notification_list': noti_list}
    return JsonResponse(dict)


def rating_from_freelancer(request):
    ''' Function to get rating from a Freelancer to a Project Giver '''

    freelancer = Freelancer.objects.get(account=request.user)
    rating = request.POST.get('rating')
    project_id = request.POST.get('project_id')
    project = Project.objects.get(id=project_id)
    project.ppRating = rating
    project.save()
    project_poster = project.proj_poster
    project_poster_old_rating = project_poster.rating
    project_poster_comp_project = Project.objects.filter(
        freelancerAssigned=freelancer, status='completed')
    project_poster_comp_projects = project_poster_comp_project.exclude(
        ppRating=0).count()
    project_poster_new_rating = ((project_poster_old_rating * (
        project_poster_comp_projects - 1)) + int(rating)) / project_poster_comp_projects
    project_poster.rating = project_poster_new_rating
    project_poster.save()
    return HttpResponse('Success')


def click_notification(request):
    ''' Function which removes the notification when Freelancer opens notifications '''

    seenarr = request.POST.getlist('seenarr[]')
    for i in range(len(seenarr)):
        obj = Notification.objects.get(id=seenarr[i])
        obj.seen_status = 'freelancer_seen'
        obj.save()
    return HttpResponse('Success')
