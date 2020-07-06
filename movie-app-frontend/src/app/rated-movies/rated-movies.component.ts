import { Component, OnInit } from '@angular/core';
// Import Custom Classes
import { Cluster } from 'src/app/classes/cluster';
import { ClusterList } from 'src/app/classes/clusterlist';
import { Filter } from 'src/app/classes/filter';
import { MovieQueryResult } from 'src/app/classes/movie.query.result';
import { MovieQuery } from 'src/app/classes/movie.query';
import { MovieList } from 'src/app/classes/movielist';
import { NavigationArea } from 'src/app/classes/navigation.area';

import { AbstractMoviesComponent } from 'src/app/classes/abstract.movies.component';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.css']
})


export class RatedMoviesComponent extends AbstractMoviesComponent implements OnInit {

  only_rated_movies: number = 1;
  url: string = '/rated_movies/movies_detail_data/';
  url_autocomplete: string = '/rated_movies/autocomplete/';


}

