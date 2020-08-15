import { MovieListShort } from 'src/app/classes/movie.list.short';


export class Cluster {

  movieList: MovieListShort;
  tags: string[];
  cluster_id: number;

  constructor(data) {

    this.movieList = new MovieListShort(data['movies']);
    this.tags = new String(data['tags']).split(',');

  }

  getMovies() {
    return(this.movieList.getMovies())
  }
}
