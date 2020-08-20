import { MovieListShort } from 'src/app/classes/movie.list.short';


export class ClusterActor {

  movieList: MovieListShort;
  actor: string;

  constructor(data) {

    this.movieList = new MovieListShort(data['movies']);
    this.actor = data['actor'];

  }

  getMovies() {
    return(this.movieList.getMovies())
  }
}
