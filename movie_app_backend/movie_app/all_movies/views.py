import numpy as np
from movie_app_backend.views import OutputObject
from movie_app.sql_query.sql_query import QueryMovieDetails
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from movie_app.views import movies_detail_data
from movie_app.models import Movie
import numpy as np
import pandas as pd
from movie_app.sql_query.sql_query import AutocompleteAllMovies


class AllMoviesDetailData(APIView):

    # permission_classes = (permissions.IsAuthenticated, )
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        return Response(data=movies_detail_data(request))


class AllMoviesAutocomplete(APIView):

    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        term = request.GET.get('term', '')
        queryObj = AutocompleteAllMovies()
        queryObj.build_query(term)
        output = OutputObject(status='normal',
                              data=queryObj.get_data())
        return Response(data=output.get_output_dict())
