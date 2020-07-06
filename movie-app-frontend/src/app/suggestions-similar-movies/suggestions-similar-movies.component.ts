import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

// packages for autocomplete
import { Component, ViewChild, ElementRef } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { MovieList } from 'src/app/classes/movielist';


@Component({
  selector: 'app-suggestions-similar-movies',
  templateUrl: './suggestions-similar-movies.component.html',
  styleUrls: ['./suggestions-similar-movies.component.css']
})
export class SuggestionsSimilarMoviesComponent implements OnInit {

  titles: string[];
  url_autocomplete: string = '/all_movies/autocomplete/';
  baseMovie: any;
  baseMovieIsAssigned: boolean;
  // results (similar movies to baseMovie)
  movieList: MovieList;

  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.titles = [];
    this.baseMovie = {};
    this.baseMovieIsAssigned = false;
    this.movieList = new MovieList();
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


  getBaseMovie(): void{

    let headers = {};

    if(this.authService.isLoggedIn()){
      headers = {'Authorization': 'Bearer ' + this.authService.token };
    };

    this.http.get('/all_movies/movies_detail_data/',
                  { headers: headers,
                    params: {
                      'term': (<HTMLInputElement>document.getElementById('movie_title')).value,
                      'nr_results_shown': '1',
                      'page_number': '1'
                    }
                  })
      .subscribe(json_result => {

        console.log(json_result)

        if(json_result['meta']['status'] == 'normal'){
          this.baseMovie = json_result['data'][0]
          this.baseMovieIsAssigned = true;

          // search similar movies
          let movie = json_result['data'][0]
          this.getSimilarMovies(movie.movieId);

        }

      }
    );
  }


  private getSimilarMovies(movieId): void{

    this.http.get('/similar_movies/',
                  { params: { 'movieId': movieId } })
      .subscribe(json_result => {
        console.log(json_result['data'])
        this.movieList.assignResults(json_result['data']);
      }
    );

  }

  private autocomplete(title){

    this.http.get(this.url_autocomplete,
                  { params: { 'term': title } })
      .subscribe(json_result => {
        this.titles = json_result['data']['title'];
      });

  };


}
