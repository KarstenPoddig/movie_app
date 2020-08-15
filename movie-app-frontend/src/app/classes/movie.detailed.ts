import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


export class MovieDetailed {

  public movieId: string;
  public title: string;
  public country: string;
  public year: string;
  public urlMoviePoster: string;
  public production: string;
  public imdbRating: string;
  public rating: string;
  public actors: string;
  public genres: string;
  public writers: string;

//   public authService: AuthService;
//   private http: HttpClient;

  constructor(movieInformation){
    this.movieId        = movieInformation.movieId;
    this.title          = movieInformation.title;
    this.country        = movieInformation.country;
    this.year           = movieInformation.year;
    this.urlMoviePoster = movieInformation.urlMoviePoster;
    this.production     = movieInformation.production;
    this.imdbRating     = movieInformation.imdbRating;
    this.rating         = movieInformation.rating;
    this.actors         = movieInformation.actors;
    this.writers        = movieInformation.writers;
    this.genres         = movieInformation.genres;

    //this.authService = new AuthService;
    //this.http = new HttpClient;
  }

  public rateMovie(rating, http, authService): void {

    if(!authService.isLoggedIn()){
      console.log('Please log in to rate a movie.')
      return;
    }

    let headers = {'Authorization': 'Bearer ' + authService.token }

    http.get('/rate_movie/',
                  { headers: headers,
                    params: {
                      'rating': rating,
                      'movieId': this.movieId
                    }
                  })
      .subscribe(json_result => {
        console.log(json_result);
      })
  }

}
