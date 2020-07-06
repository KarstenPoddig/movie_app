export class NavigationArea {

  page_number: number;
  total_number_pages: number;

  pages_shown: number[];

  constructor(){
    this.pages_shown = [];
  }

  public setNavigationArea(meta_data): void {

    if(meta_data['status'] == 'normal'){
      this.page_number = meta_data['page_number'];
      this.total_number_pages = meta_data['total_number_pages'];
      this.setPagesShown();
    }
    else{
      this.pages_shown = [];
    }
  }

  private setPagesShown(): void {

    let page_set = new Set()

    // first page
    page_set.add(1)

    // page_number-1
    if((this.page_number-1 > 0) &&
       (this.page_number-1 <= this.total_number_pages)){
      page_set.add(this.page_number-1);
    }
    // page_number
    if((this.page_number > 0) &&
           (this.page_number <= this.total_number_pages)){
      page_set.add(this.page_number);
    }
    // page_number+1
    if((this.page_number+1 > 0) &&
       (this.page_number+1 <= this.total_number_pages)){
      page_set.add(this.page_number+1);
    }

    // last page
    page_set.add(this.total_number_pages);

    this.pages_shown = <number[]>Array.from(page_set.values());
  }

  public getPagesShown(): number[] {
    return(this.pages_shown);
  }

  public resetNavigationArea(): void{
    this.pages_shown = [];
  }

}
