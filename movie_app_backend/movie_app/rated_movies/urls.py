from django.urls import path
from movie_app.rated_movies import views

urlpatterns = [

    path('autocomplete/',
         views.RatedMoviesAutocomplete.as_view(),
         name='rated-movies-autocomplete'),

    path('movies_detail_data/',
         views.RatedMoviesDetailData.as_view(),
         name='rated-movies-detail-data'),

    path('hist_rating_data/',
         views.StatisticsRatingHistData.as_view(),
         name='hist-rating-data'),
    path('hist_rating_year_data/',
         views.StatisticsRatingsYearData.as_view(),
         name='hist-rating-year-data'),
    path('hist_rating_genre_data/',
         views.StatisticsRatingsGenreData.as_view(),
         name='hist-rating-genre-data'),
    path('avg_rating_genre_data/',
         views.StatisticsAvgRatingGenreData.as_view(),
         name='avg-rating-genre-data'),

    path('clustered_movies/',
         views.ClusteredMovies.as_view(),
         name='clustered-movies'),

    path('refresh_cluster/',
         views.RefreshCluster.as_view(),
         name='refresh-cluster'),

]
