from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib import auth
from FL.models import Freelancer
from projectgiver.models import ProjectGiver
from otp.models import OTP
from django.template.context_processors import csrf
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.validators import ValidationError
from django.views.decorators.cache import cache_control
import pyotp
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import re


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@ensure_csrf_cookie
def regUser(request):
    ''' Function to register a user '''

    otp = request.POST.get('otp')
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    email = request.POST.get('email', '')
    try:
        validate_email(email)
    except:
        response = HttpResponse('/#Register')
        return response
    first_name = request.POST.get('fname', '')
    last_name = request.POST.get('lname', '')
    user_type = request.POST.get('userType')
    confirm_password = request.POST.get('confirm_password')
    if (password != confirm_password):
        response = HttpResponse('/#Register')
        return response
    first_name = request.POST.get('fname', '')
    last_name = request.POST.get('lname', '')
    otpobj = OTP.objects.filter(email=email)
    if not otpobj:
        return HttpResponse("/#Register")
    if otp != str(otpobj[0].otp):
        return HttpResponse("/#Register")
    otpobj.delete()
    user = User.objects.create_user(
        username=username, password=password, first_name=user_type)
    if user is not None:
        if (user_type == 'freelancer'):
            Freelancer.objects.create(
                first_name=first_name, last_name=last_name, emailAddress=email, account=user, rating=0)
            auth.login(request, user)
            return HttpResponse('freelancer')
        elif (user_type == 'projectPoster'):
            ProjectGiver.objects.create(
                first_name=first_name, last_name=last_name, emailAddress=email, account=user, rating=0)
            auth.login(request, user)
            return HttpResponse('projectgiver')
    else:
        return HttpResponse('/#Register')


@ensure_csrf_cookie
@cache_control(no_cache=True, must_revalidate=True, no_store=True)
def landingPage(request):
    ''' Function to render the home page of the website '''

    if request.user.is_authenticated:
        if request.user.first_name == 'freelancer':
            return HttpResponseRedirect('/freelancer')
        else:
            return HttpResponseRedirect('/projectgiver')
    return render(request, 'index.html')


@cache_control(no_cache=True, must_revalidate=True, no_store=True)
@ensure_csrf_cookie
def authen(request):
    ''' Function to check login credentials and sign-in the user if the credentials are correct '''

    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request, user)
        if User.objects.get(username=username).first_name == 'freelancer':
            return HttpResponse('freelancer')
        if User.objects.get(username=username).first_name == 'projectPoster':
            return HttpResponse('projectgiver')
    else:
        return HttpResponse('/#Login')


def usernames(request):
    ''' Function to send the list of all existing usernames and email-IDs to the home page '''

    emailarray = []
    fl_obj = Freelancer.objects.all()
    pg_obj = ProjectGiver.objects.all()
    for obj in fl_obj:
        emailarray.append(obj.emailAddress)
    for obj in pg_obj:
        emailarray.append(obj.emailAddress)
    usernamearray = []
    user_obj = User.objects.all()
    for obj in user_obj:
        usernamearray.append(obj.username)
    c = {'email': emailarray, 'username': usernamearray,
         'csrf_token': str(csrf(request)['csrf_token'])}
    return JsonResponse(c)


@csrf_exempt
def sendOtp(request):
    ''' Function to generate an OTP at the time of registration and email it to the user '''

    email = request.POST.get('email')
    totp = pyotp.TOTP('base32secret3232', 6, interval=1)
    otp = totp.now()
    send_mail('Do Not Reply', 'Your OTP is ' + otp + '. Do not share this with anyone',
              'Freelancer freelancerakpy@gmail.com', [email])
    OTP.objects.filter(email=email).delete()
    OTP.objects.create(otp=otp, email=email)
    return HttpResponse("SUCCESS")
