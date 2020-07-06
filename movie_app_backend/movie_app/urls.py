from django.urls import path, include
from movie_app import views

urlpatterns = [
    path('all_movies/', include('movie_app.all_movies.urls')),
    path('rated_movies/', include('movie_app.rated_movies.urls')),
    path('suggestions/', include('movie_app.suggestions.urls')),
    path('analysis/', include('movie_app.analysis.urls')),


    path('rate_movie/', views.RateMovie.as_view(), name='rate-movie'),

    path('quality_of_profile/', views.QualityOfProfile.as_view(),
         name='quality-of-profile'),
]
