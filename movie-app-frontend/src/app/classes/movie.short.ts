export class MovieShort {

  public movieId: string;
  public title: string;
  public country: string;
  public year: string;
  public runtime: string;
  public urlMoviePoster: string;


  constructor(movieInformation){
    this.movieId = movieInformation.movieId;
    this.title = movieInformation.title;
    this.country = movieInformation.country;
    this.year = movieInformation.year;
    this.runtime = movieInformation.runtime;
    this.urlMoviePoster = movieInformation.urlMoviePoster;
  }

  public toggleInformation(): void {

    let htmlElem = document.getElementById('movie_view_short_info_' + this.movieId)
    htmlElem.hidden = !htmlElem.hidden;

  }

}
