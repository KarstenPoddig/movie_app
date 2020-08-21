# Movie App

deployment status: **online**

Link: [Movie App](http://35.246.223.238)

This repository contains the files for a movie recommendation web app.

The app is deployed with the Google Kubernetes Engine. It consists of two services - the frontend and the backend. The .yaml files for the deyploment of each are contained in the folders 'movie-app-frontend' and 'movie_app_backend'.

Some features of the app (like searching for movies or searching similar movies to a specific movie) can be explored without an account. Other features (like rating movies and getting movie suggestions based on rated movies) require an account. To explore all features you can create your own account or simply use the following one (with existing ratings):

| username   |   password    |
|------------|:-------------:|
| testuser   |    password   |

## Backend

The backend is mostly written in Python and is based on the django rest framework. Furthermore the backend is connected to a PostgreSQL database running in a Google Cloud Project.

## Frontend

The frontend is written in Typescript with Angular.

## Report

The folder 'report' contains among others the following information:
 - detailed information of the features and the UI
 - description of the algorithms which determine the suggestions
 - source of data (for ratings and movies)

The report is not finalized yet, but still in progress.
