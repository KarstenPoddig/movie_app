export class Filter {

  html_elem_genre_filter_id : string;
  html_elem_year_filter_id : string;

  filter_genre_active: string[];
  filter_year_active: string[];

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
      // add to html
      var additional_filter_elem = document.createElement('div');
      additional_filter_elem.setAttribute('class', 'filter_criterion');
      additional_filter_elem.innerHTML = genre;
      document.getElementById('active_genre_filter').appendChild(additional_filter_elem);
    }
    console.log(this.filter_genre_active);
  };

  add_year_filter(year: string): void{
    // check if genre is already contained in active filter_genre_active
    if(!(this.filter_year_active.includes(year))){
      // append to active filter
      this.filter_year_active.push(year);
      // add to html
      var additional_filter_elem = document.createElement('div');
      additional_filter_elem.setAttribute('class', 'filter_criterion');
      additional_filter_elem.innerHTML = year;
      document.getElementById('active_year_filter').appendChild(additional_filter_elem);
    }
    console.log(this.filter_year_active);
  };

  clear_filter(): void{
    // delete variables
    this.filter_genre_active = [];
    this.filter_year_active = [];
    // delete elements in html
    document.getElementById('active_genre_filter').innerHTML = '';
    document.getElementById('active_year_filter').innerHTML = '';
  }

  create_genre_filter_str(): string{
    return this.filter_genre_active.join(',');
  }

  create_year_filter_str(): string{
    return this.filter_year_active.join(',');
  }

}
