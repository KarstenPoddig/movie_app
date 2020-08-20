# FROM gcr.io/google_appengine/python
#
# RUN virtualenv -p python3 /venv
# ENV PATH /venv/bin:$PATH
#
# ADD requirements.txt /app/requirements.txt
# RUN /venv/bin/pip install --upgrade pip && /venv/bin/pip install -r /app/requirements.txt
# ADD . /app
#
# CMD gunicorn -b :$PORT movie_app_backend.wsgi

FROM gcr.io/kp-test-project-2/movie_app_backend_base AS base

ADD . /app
COPY --from=base recommendation_models/ movie_app/recommendation_models/

CMD gunicorn -b :$PORT movie_app_backend.wsgi