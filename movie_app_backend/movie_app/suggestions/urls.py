from django.urls import path
from movie_app.suggestions import views

urlpatterns = [
    path('cluster/', views.SuggestionsCluster.as_view(),
         name='suggestions-cluster'),
    path('similar_movies/', views.SimilarMovies.as_view(),
         name='suggestions-simlar-movies'),
    path('actor/', views.SuggestionsActor.as_view(),
         name='suggestions-actor'),
]