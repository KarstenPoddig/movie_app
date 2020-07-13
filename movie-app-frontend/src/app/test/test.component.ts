import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  rating = 3.5;

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  test(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    });

    this.http.get("/test_drf/", {headers: headers}).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

  test_2(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.token
    });

    this.http.get("/test_2/", {headers: headers}).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

  rate(rating): void{
    console.log('Test')
  }
}
