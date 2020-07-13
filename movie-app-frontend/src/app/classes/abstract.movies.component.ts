import { AuthService } from '../auth.service';

import { Cluster } from 'src/app/classes/cluster';
import { ClusterList } from 'src/app/classes/clusterlist';
import { Filter } from 'src/app/classes/filter';
import { MovieQueryResult } from 'src/app/classes/movie.query.result';
import { MovieQuery } from 'src/app/classes/movie.query';
import { MovieList } from 'src/app/classes/movielist';
import { NavigationArea } from 'src/app/classes/navigation.area';

import { HttpClient } from '@angular/common/http';

// packages for autocomplete
import { Component, ViewChild, ElementRef } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';


// This is the base class for the components AllMoviesComponent and
// RatedMoviesComponent
@Component({ template: '' })
export abstract class AbstractMoviesComponent {

  // abstract members -> set in derived classes
  abstract url: string;
  abstract only_rated_movies: number;
  abstract url_autocomplete: string;


  // members which apply for both
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
  public filter : Filter;
  movieQueryResult: MovieQueryResult;
  navigationArea: NavigationArea;
  autocompleteMovies: string[];
  titles: string[];

  constructor(public authService: AuthService,
              private http: HttpClient) {
    this.filter = new Filter;
    this.movieQueryResult = new MovieQueryResult;
    this.navigationArea = new NavigationArea;
    this.titles = [];
   }

  ngOnInit(): void {

    // autocomplete
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {return event.target.value;}),
      filter(res => res.length > 2),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((title: string) => this.autocomplete(title));

  }

  private autocomplete(title){

    let headers = {}

    if(this.authService.isLoggedIn()){
     headers = {'Authorization': 'Bearer ' + this.authService.token }
    }

    this.http.get(this.url_autocomplete,
                  { headers: headers,
                   params: {
                     'term': title
                   }
                  })
      .subscribe(json_result => {
        this.titles = json_result['data']['title'];
      });

  };

  public getMovies(page_number: number): void {

     // show movie loader
     document.getElementById('movie_loader').hidden = false;

     this.movieQueryResult.clear();
     this.navigationArea.resetNavigationArea();

     let headers = {}

     if(this.authService.isLoggedIn()){
       headers = {'Authorization': 'Bearer ' + this.authService.token }
     }

     this.http.get(this.url,
                   {headers: headers,
                    params: {
                      'term': (<HTMLInputElement>document.getElementById('movie_title')).value,
                      'nr_results_shown': '20',
                      'page_number': page_number.toString(),
                      'only_rated_movies': this.only_rated_movies.toString(),
                      'filter_genre': this.filter.create_genre_filter_str(),
                      'filter_year':  this.filter.create_year_filter_str(),
                    }
                   })
         .subscribe(json_result => {
           console.log(json_result);
           this.movieQueryResult.assignResults(json_result);
           this.navigationArea.setNavigationArea(json_result['meta']);
         });

     document.getElementById('movie_loader').hidden = true;
  }

  private rate_movie(movieId, rating): void{
    console.log(movieId);
    console.log(rating);
  }


}
