import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-quality-of-profile',
  templateUrl: './quality-of-profile.component.html',
  styleUrls: ['./quality-of-profile.component.css']
})
export class QualityOfProfileComponent implements OnInit {

  status: string = '';
  note: string = '';
  nr_rated_movies: number = 0;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus(): void{

    let headers = {'Authorization': 'Bearer ' + this.authService.token }

    this.http.get('/quality_of_profile/',
                  { headers: headers })
      .subscribe(json_result => {
        this.status = json_result['data']['status'];
        this.note = json_result['data']['note']
        this.nr_rated_movies = json_result['data']['nr_rated_movies'];
      })
  }

}
