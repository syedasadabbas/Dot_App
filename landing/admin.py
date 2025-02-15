from django.contrib import admin
from .models import WebinarRegistration

# Register your models here.

@admin.register(WebinarRegistration)
class WebinarRegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'university_and_year', 'want_early_access', 'registration_date')
    list_filter = ('want_early_access', 'registration_date')
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('registration_date',)
