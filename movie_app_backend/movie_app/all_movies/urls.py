from django.urls import path
from movie_app.all_movies import views

urlpatterns = [
    path('movies_detail_data/',
         views.AllMoviesDetailData.as_view(),
         name='rated-movies-detail-data'),
    path('autocomplete/',
         views.AllMoviesAutocomplete.as_view(),
         name='all-movies-autocomplete'),
]
