from django.db import models

# Create your models here.

class WebinarRegistration(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    university_and_year = models.CharField(max_length=200)
    want_early_access = models.BooleanField(default=False)
    questions = models.TextField(blank=True, null=True)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.email}"

    class Meta:
        ordering = ['-registration_date']
