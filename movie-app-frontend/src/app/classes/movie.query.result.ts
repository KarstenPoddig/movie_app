import { MovieList } from 'src/app/classes/movielist';


export class MovieQueryResult{

  movieList: MovieList;
  exception: string;
  status: string

  constructor(){
    this.movieList = new MovieList();
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

  assignResults(json_result){

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
