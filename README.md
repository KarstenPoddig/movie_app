# Movie App

deployment status: online

Link: [Movie App](http://35.234.113.42)

This repository contains the files for a movie recommendation web app.

The app is deployed with the Google Kubernetes Engine. It consists of two services - the frontend and the backend. The .yaml files for the deyploment of each are contained in the folders 'movie-app-frontend' and 'movie_app_backend'.

## Backend

The backend is written and Python and is based on the django rest framework. Furthermore the backend is connected to a PostgreSQL database running in the Google Cloud.

## Frontend

The frontend is written in Typescript with Angular.
