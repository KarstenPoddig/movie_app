import { MovieList } from 'src/app/classes/movielist';


export class Cluster {

  movieList: MovieList;
  tags: string[];
  cluster_id: number;

  constructor(data) {

    this.movieList = new MovieList();
    this.movieList.assignResults(data['movies']);

    this.tags = new String(data['tags']).split(',');

  }

  getMovies() {
    return(this.movieList.getMovies())
  }
}
