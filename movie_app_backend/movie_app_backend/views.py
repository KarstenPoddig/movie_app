from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from movie_app.models import ClusteringStatus


class OutputObject:
    """This is the central class """
    def __init__(self, status=None, message=None, data=None,
                 dict_additional_meta_data={}):
        self.status = status
        self.message = message
        self.data = data
        self.additional_meta_data = dict_additional_meta_data

    def build_meta_data(self, standard_dict):
        self.additional_meta_data.update(standard_dict)

    def build_output_dict(self):
        self.build_meta_data(standard_dict={'status': self.status,
                                            'message': self.message})
        self.output_dict = {'meta': self.additional_meta_data,
                            'data': self.data}

    def get_output_dict(self):
        self.build_output_dict()
        return self.output_dict

    def get_http_response(self):
        self.build_output_dict()
        return JsonResponse(data=self.output_dict)


class SignUp(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        username = request.GET.get('username')
        password = request.GET.get('password')

        # username or password are empty
        if (username=='' or password==''):
            outputObject = OutputObject(status='exception',
                                        message='username or password is empty.')
            return Response(outputObject.get_output_dict())

        # try to create account
        try:
            new_user = User(username=username)
            new_user.set_password(password)
            new_user.save()
            # initialize clustering status as 'Done'
            clustering_status = ClusteringStatus(user=new_user,
                                                 status='Done')
            clustering_status.save();
        except IntegrityError:
            outputObject = OutputObject(status='exception',
                                        message='username already exists')
            return Response(data=outputObject.get_output_dict())

        # everything worked out
        outputObject = OutputObject(status='normal')
        return Response(data=outputObject.get_output_dict())
