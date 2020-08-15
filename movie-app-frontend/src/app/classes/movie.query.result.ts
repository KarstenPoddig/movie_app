import { MovieListDetailed } from 'src/app/classes/movie.list.detailed';


export class MovieQueryResult{

  movieList: MovieListDetailed;
  exception: string;
  status: string

  constructor(){
    this.movieList = new MovieListDetailed([]);
    this.exception = '';
    this.status = '';
  }

  statusIsNormal(): boolean{
    return (this.status == 'normal');
  }

  getException(): string {
    return this.exception;
  }

  clear(): void{
    this.movieList.clear();
    this.exception = '';
    this.status = '';
  }

  assignResults(json_result): void {

    this.status = json_result['meta']['status'];
    this.exception = json_result['meta']['message'];

    if(this.status == 'normal'){
      this.movieList.assignResults(json_result['data']);
    }
  }

  getQueryResult() {
    return this.movieList.getMovies();
  }
}
