from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib import auth
from projectgiver.models import ProjectGiver
from projects.models import Project
from skillSet.models import skillSet
from bid.models import Bid
from notifications.models import Notification
from django.views.decorators.cache import cache_control
from django.template.context_processors import csrf
from django.contrib.auth.models import User


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def homePJ(request):
    ''' Redirects to front page for project giver '''

    try:
        f = ProjectGiver.objects.filter(account=request.user)
        c = {}
        c.update(csrf(request))
        c.update({'project_giver': f[0]})
        return render(request, 'entry2.html', c)
    except:
        return HttpResponseRedirect('/#login')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def pjSignout(request):
    ''' Redirects to home page when the project giver logs out '''

    auth.logout(request)
    return HttpResponseRedirect('/')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def pj_edit_profile(request):
    ''' Function to edit profile of project giver '''

    first_name = request.POST.get('fname', "")
    last_name = request.POST.get('lname', "")
    email = request.POST.get('email', "")
    projectgiverobj = ProjectGiver.objects.get(account=request.user)
    projectgiverobj.first_name = first_name
    projectgiverobj.last_name = last_name
    projectgiverobj.emailAddress = email
    projectgiverobj.save()
    return HttpResponseRedirect('/projectgiver')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def pj_edit_pic(request):
    ''' Function to edit profile image of project giver '''

    profile_image_src = request.FILES['profile_image']
    projectgiverobj = ProjectGiver.objects.get(account=request.user)
    projectgiverobj.profile_image = profile_image_src
    projectgiverobj.save()
    return HttpResponseRedirect('/projectgiver')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def render_page(request):
    ''' Function which sends data to front end to populate the fields '''

    availableSkills = skillSet.objects.all()
    pg = ProjectGiver.objects.get(account=request.user)
    bids = Bid.objects.filter(project_poster=pg)
    sortedBids = bids.order_by('project__Title')
    bidsMade = []
    for b in sortedBids:
        bidsMade.append({'Title': b.project.Title, 'freelancer': b.freelancer.account.username,
                         'amount': b.amount, 'duration': b.duration, 'budget': b.project.budget, 'id': b.id})
    past_projects = Project.objects.filter(proj_poster=pg, status='completed')
    pastproj = []
    for obj in past_projects:
        innerdict = {'Title': obj.Title, 'description': obj.description,
                     'id': obj.id, 'freelancerRating': obj.flRating}
        pastproj.append(innerdict)
    ongo_projects = Project.objects.filter(proj_poster=pg, status='ongoing')
    ongoproj = []
    for obj in ongo_projects:
        innerdict = {'Title': obj.Title,
                     'description': obj.description, 'id': obj.id}
        ongoproj.append(innerdict)
    dict = {'first_name': pg.first_name, 'last_name': pg.last_name, 'emailAddress': pg.emailAddress,
            'rating': pg.rating, 'profile_image': str(pg.profile_image), 'username': pg.account.username,
            'csrf_token': str(csrf(request)['csrf_token']),
            'pastproj': pastproj, 'ongoproj': ongoproj, 'bids': bidsMade}
    return JsonResponse(dict, safe=False)


def notification_project_poster(request):
    ''' Function which searches for notifications for a Project Giver '''

    project_poster = ProjectGiver.objects.filter(account=request.user)[0]
    noti_obj = Notification.objects.filter(
        project_poster=project_poster, seen_status='project_poster_unseen')
    noti_list = []
    for obj in noti_obj:
        innerdict = {'notification_id': obj.id, 'project_poster': obj.project_poster.first_name, 'freelancer': obj.freelancer.first_name,
                     'project': obj.project.Title, 'noti_type': obj.project.status}
        noti_list.append(innerdict)
    dict = {'notification_list': noti_list}
    return JsonResponse(dict)


def click_notification(request):
    ''' Function which removes notification when a Project giver checks the notification '''

    seenarr = request.POST.getlist('seenarr[]')
    for i in range(len(seenarr)):
        obj = Notification.objects.get(id=seenarr[i])
        obj.seen_status = 'project_poster_seen'
        obj.save()
    return HttpResponse('Succsess')


def render_add(request):
    ''' Function which sends available set of skills for Project requirement '''

    availableSkills = skillSet.objects.all()
    skill_list = []
    for skill in availableSkills:
        skill_list.append(skill.skillname)
    return JsonResponse({'skills': skill_list})
