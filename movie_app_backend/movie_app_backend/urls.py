"""django_movie_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from movie_app_backend import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('movie_app/', include('movie_app.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('sign-up/', views.SignUp.as_view(), name='signup'),

    ################## For authentification from Frontend ####################
    # path('api-token-auth/', obtain_jwt_token),
    path('api-token-auth/', jwt_views.TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('api-token-refresh/', refresh_jwt_token),

]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
