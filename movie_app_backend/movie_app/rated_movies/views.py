import numpy as np
import pandas as pd
from movie_app.models import Movie, Rating
from django.db.models import Count
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from movie_app_backend.views import OutputObject
from movie_app.sql_query.sql_query import RatedMoviesHistGenre,\
    RatedMoviesAvgGenre
from movie_app.rated_movies.rated_movies_cluster import get_rated_movies_clustered
from movie_app.clustering.suggestions_cluster import refresh_clusters
from movie_app.sql_query.sql_query import QueryMovieDetails


class RatedMovies(LoginRequiredMixin, TemplateView):
    template_name = 'movie_app/rated_movies.html'


class RatedMoviesClusterView(LoginRequiredMixin, TemplateView):
    template_name = 'movie_app/rated_movies_cluster.html'


class RatedMoviesStatistics(LoginRequiredMixin, TemplateView):
    template_name = 'movie_app/rated_movies_statistics.html'


def hist_ratings_data(request):
    data = \
        pd.DataFrame.from_records(
            Rating.objects.filter(user=request.user).values('rating')
                .annotate(Count('movie_id'))
        )
    # if user didnt rate movies return empty structure
    if data.empty:
        data = {'rating': [], 'nr_ratings': []}
    else:
        data = data.to_dict('list')
        # rename column 'movie_id__count' to 'nr_ratings'
        data['nr_ratings'] = data.pop('movie_id__count')

    output = OutputObject(status='normal',
                          data=data)
    return output.get_http_response()


def hist_ratings_per_genre_data(request):
    query_obj = RatedMoviesHistGenre()
    query_obj.build_query(user_id=request.user.id)
    data = query_obj.get_data()
    output = OutputObject(status='normal',
                          data=data)
    return output.get_http_response()


def avg_rating_per_genre_data(request):
    query_obj = RatedMoviesAvgGenre()
    query_obj.build_query(user_id=request.user.id)
    data = query_obj.get_data()
    output = OutputObject(status='normal',
                          data=data)
    return output.get_http_response()


def rated_movies_cluster_data(request):
    user = request.user
    data = get_rated_movies_clustered(user=user)
    if len(data.keys()) == 0:
        output = OutputObject(status='execption',
                              message="You didn't rate any movies.")
    else:
        output = OutputObject(status='normal',
                              data=data)
    return output.get_http_response()


def ratings_per_year_data(request):
    movies = pd.DataFrame.from_records(Rating.objects.filter(user=request.user)
                                       .values('movie_id', 'movie__year'))
    if movies.empty:
        movies = pd.DataFrame(columns=['year', 'nr_ratings'])
    else:
        movies['year'] = np.floor(movies['movie__year']/10)*10
        movies = movies.groupby('year')['movie_id'].count().reset_index()
        movies.columns = ['year', 'nr_ratings']
    output = OutputObject(status='normal',
                          data=movies.to_dict('list'))
    return output.get_http_response()


############### Test for DRF #####################

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from movie_app.views import movies_detail_data
from movie_app.sql_query.sql_query import AutocompleteRatedMovies


class RatedMoviesDetailData(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        return Response(data=movies_detail_data(request))


class ListRatedMovies(APIView):
    """
    View all Rated Movies
    """
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        rated_movies = [movie.movie_id for movie in Rating.objects.filter(user=request.user)]
        return Response(rated_movies)


class TestData(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def get(self, request):
        outputObject = OutputObject(status='normal', data={'entry_1': 'a', 'entry_2': 'b', 'entry_3': [1,2,4]})
        return Response(data=outputObject.get_output_dict())


class StatisticsRatingHistData(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        data = \
            pd.DataFrame.from_records(
                Rating.objects.filter(user=request.user).values('rating')
                    .annotate(Count('movie_id'))
            )
        # if user didnt rate movies return empty structure
        if data.empty:
            data = {'rating': [], 'nr_ratings': []}
        else:
            data = data.to_dict('list')
            # rename column 'movie_id__count' to 'nr_ratings'
            data['nr_ratings'] = data.pop('movie_id__count')

        output = OutputObject(status='normal',
                              data=data)
        return Response(data=output.get_output_dict())


class StatisticsRatingsYearData(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        movies = pd.DataFrame.from_records(Rating.objects.filter(user=request.user)
                                           .values('movie_id', 'movie__year'))
        if movies.empty:
            movies = pd.DataFrame(columns=['year', 'nr_ratings'])
        else:
            movies['year'] = np.floor(movies['movie__year'] / 10) * 10
            movies = movies.groupby('year')['movie_id'].count().reset_index()
            movies.columns = ['year', 'nr_ratings']
        output = OutputObject(status='normal',
                              data=movies.to_dict('list'))
        return Response(data=output.get_output_dict())


class StatisticsRatingsGenreData(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        query_obj = RatedMoviesHistGenre()
        query_obj.build_query(user_id=request.user.id)
        data = query_obj.get_data()
        output = OutputObject(status='normal',
                              data=data)
        return Response(data=output.get_output_dict())


class StatisticsAvgRatingGenreData(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        query_obj = RatedMoviesAvgGenre()
        query_obj.build_query(user_id=request.user.id)
        data = query_obj.get_data()
        output = OutputObject(status='normal',
                              data=data)
        return Response(output.get_output_dict())


class RatedMoviesAutocomplete(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        term = request.GET.get('term', '')
        term = str.lower(term)
        queryObj = AutocompleteRatedMovies()
        queryObj.build_query(term=term,
                             user_id=request.user.id)
        output = OutputObject(status='normal',
                              data=queryObj.get_data())
        return Response(data=output.get_output_dict())


class ClusteredMovies(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        user = request.user
        data = get_rated_movies_clustered(user=user)
        if len(data) == 0:
            output = OutputObject(status='execption',
                                  message="You didn't rate any movies.")
        else:
            output = OutputObject(status='normal',
                                  data=data)
        return Response(data=output.get_output_dict())


class RefreshCluster(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        refresh_clusters(user=request.user)
        # compute_new_clusters_movies(user=request.user)
        output = OutputObject(status='normal',
                              data=None)
        return Response(data=output.get_output_dict())
