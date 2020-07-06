import { Component, OnInit, Injectable } from '@angular/core';
// Import Custom Classes
// import { Cluster } from 'src/app/classes/cluster';
// import { ClusterList } from 'src/app/classes/clusterlist';
// import { Filter } from 'src/app/classes/filter';
// import { MovieQueryResult } from 'src/app/classes/movie.query.result';
// import { MovieQuery } from 'src/app/classes/movie.query';
// import { MovieList } from 'src/app/classes/movielist';
// import { NavigationArea } from 'src/app/classes/navigation.area';

import { AbstractMoviesComponent } from 'src/app/classes/abstract.movies.component';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

// package for star rating
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})

@Injectable()
export class AllMoviesComponent extends AbstractMoviesComponent implements OnInit {

  only_rated_movies: number = 0;
  url: string = '/all_movies/movies_detail_data/';
  url_autocomplete: string = '/all_movies/autocomplete/';

}
