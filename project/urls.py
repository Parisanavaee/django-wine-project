
from django.contrib import admin
from django.urls import path, include
from core.views import index
from contact.views import contact

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('contact', include("contact.urls"))
]
