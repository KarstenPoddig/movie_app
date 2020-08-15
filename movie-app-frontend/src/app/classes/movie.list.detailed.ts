import { MovieDetailed } from 'src/app/classes/movie.detailed';


export class MovieListDetailed {

  movies: MovieDetailed[];

  constructor(movies) {
    this.movies = [];
    this.assignResults(movies);
  }

  getMovies() {
    return(this.movies);
  }

  clear() {
    this.movies = [];
  }

  assignResults(movies): void{
    this.clear();
    for(var i=0; i<movies.length; i++){
      this.movies.push(new MovieDetailed(movies[i]));
    }

  }
}
