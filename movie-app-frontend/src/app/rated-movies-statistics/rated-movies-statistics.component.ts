import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { BarChart } from 'src/app/classes/bar.chart';

// package for charts
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-rated-movies-statistics',
  templateUrl: './rated-movies-statistics.component.html',
  styleUrls: ['./rated-movies-statistics.component.css']
})

export class RatedMoviesStatisticsComponent implements OnInit {

  public histRating: BarChart;
  public histRatingYear: BarChart;
  public histRatingGenre: BarChart;
  public avgRatingGenre: BarChart;

  constructor(private http: HttpClient,
              public authService: AuthService) {

    // -------- Initiate Charts and their Labels ---------------
    // Hist Ratings per Rating
    this.histRating = new BarChart;
    this.histRating.chartDatasets[0].label = 'Number of Ratings';
    // Hist Ratings per Decade
    this.histRatingYear = new BarChart;
    this.histRatingYear.chartDatasets[0].label = 'Number of Ratings'
    // Hist Ratings per Genre
    this.histRatingGenre = new BarChart;
    this.histRatingGenre.chartDatasets[0].label = 'Number of Ratings';
    // Average Rating per Genre
    this.avgRatingGenre = new BarChart;
    this.avgRatingGenre.chartDatasets[0].label = 'Average Rating';

  }

  ngOnInit(): void {

    if(this.authService.isLoggedIn()){
      this.showHistRating();
      this.showHistRatingYear();
      this.showHistRatingGenre();
      this.showAvgRatingGenre();
    }

  }



  showHistRating(): void{

    this.http.get('/hist_rating_data/',
                  { headers: { 'Authorization': 'Bearer ' + this.authService.token }})
              .subscribe((json_result) => {
                console.log(json_result);
                this.histRating.chartDatasets[0].data = json_result['data']['nr_ratings'];
                this.histRating.chartLabels = json_result['data']['rating'];
              });
  }

  showHistRatingYear(): void{

    this.http.get('/hist_rating_year_data/',
                      { headers: { 'Authorization': 'Bearer ' + this.authService.token }})
                  .subscribe((json_result) => {
                    console.log(json_result);
                    this.histRatingYear.chartDatasets[0].data = json_result['data']['nr_ratings'];
                    this.histRatingYear.chartLabels = json_result['data']['year'];
                  });

  }

  showHistRatingGenre(): void{

      this.http.get('/hist_rating_genre_data/',
                        { headers: { 'Authorization': 'Bearer ' + this.authService.token }})
                    .subscribe((json_result) => {
                      console.log(json_result);
                      this.histRatingGenre.chartDatasets[0].data = json_result['data']['nr_ratings'];
                      this.histRatingGenre.chartLabels = json_result['data']['genre'];
                    });

    }

  showAvgRatingGenre(): void{

      this.http.get('/avg_rating_genre_data/',
                        { headers: { 'Authorization': 'Bearer ' + this.authService.token }})
                    .subscribe((json_result) => {
                      console.log(json_result);
                      this.avgRatingGenre.chartDatasets[0].data = json_result['data']['avg_rating'];
                      this.avgRatingGenre.chartLabels = json_result['data']['genre'];
                    });

    }

}
