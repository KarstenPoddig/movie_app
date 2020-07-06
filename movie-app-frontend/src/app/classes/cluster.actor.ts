import { MovieList } from 'src/app/classes/movielist';


export class ClusterActor {

  movieList: MovieList;
  actor: string;

  constructor(data) {

    this.movieList = new MovieList();
    this.movieList.assignResults(data['movies']);

    this.actor = data['actor']

  }

  getMovies() {
    return(this.movieList.getMovies())
  }
}
