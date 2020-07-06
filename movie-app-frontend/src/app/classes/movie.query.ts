import { Filter } from 'src/app/classes/filter';


export class MovieQuery {

  term: string;
  nr_results_shown: number;
  page_number: number;
  filter_genre: string;
  filter_year: string;
  only_rated_movies: number;

  filter: Filter;

  constructor(){
    this.filter = new Filter
  }

  setQueryParams(): void {
    this.term = (<HTMLInputElement>document.getElementById('movie_title')).value;
    this.nr_results_shown = 20;
    this.page_number = 1;
    this.filter_genre = this.filter.create_genre_filter_str()
  };

  getMovies(): void {

  };
}
