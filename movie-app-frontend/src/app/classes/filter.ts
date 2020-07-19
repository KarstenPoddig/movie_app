export class Filter {

  html_elem_genre_filter_id : string;
  html_elem_year_filter_id : string;

  public filter_genre_active: string[];
  public filter_year_active: string[];

  constructor() {
    this.html_elem_genre_filter_id = "";
    this.html_elem_year_filter_id = "";

    this.filter_genre_active = [];
    this.filter_year_active = [];
  };

  add_genre_filter(genre: string): void{
    // check if genre is already contained in active filter_genre_active
    if(!(this.filter_genre_active.includes(genre))){
      // append to active filter
      this.filter_genre_active.push(genre);
    }
  };

  add_year_filter(year: string): void{
    // check if genre is already contained in active filter_genre_active
    if(!(this.filter_year_active.includes(year))){
      // append to active filter
      this.filter_year_active.push(year);
    }
  };

  clear_filter(): void{
    // delete variables
    this.filter_genre_active = [];
    this.filter_year_active = [];
  }

  create_genre_filter_str(): string{
    return this.filter_genre_active.join(',');
  }

  create_year_filter_str(): string{
    return this.filter_year_active.join(',');
  }

}
