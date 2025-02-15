from django.shortcuts import render, redirect
from django.contrib import messages
from .models import WebinarRegistration

# Create your views here.

def home(request):
    return render(request, 'landing/home.html')

def register(request):
    if request.method == 'POST':
        WebinarRegistration.objects.create(
            full_name=request.POST['full_name'],
            email=request.POST['email'],
            phone_number=request.POST['phone_number'],
            university_and_year=request.POST['university_and_year'],
            want_early_access=request.POST.get('want_early_access') == 'on',
            questions=request.POST.get('questions', '')
        )
        messages.success(request, 'Thank you for registering! We will contact you soon.')
        return redirect('register')
    return render(request, 'landing/register.html')
