export class MovieList {

  movies: any[];

  constructor() {
    this.movies = [];
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
      this.movies.push(movies[i]);
    }

  }
}
