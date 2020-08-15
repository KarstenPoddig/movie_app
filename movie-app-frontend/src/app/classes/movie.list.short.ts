import { MovieShort } from 'src/app/classes/movie.short';


export class MovieListShort {

  movies: MovieShort[];

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
      this.movies.push(new MovieShort(movies[i]));
    }

  }
}
