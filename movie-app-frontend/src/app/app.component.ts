import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllMoviesComponent } from './all-movies/all-movies.component'
// Test for Authentification
import { throwError } from 'rxjs';

// import { JwtHelperService } from '@auth0/angular-jwt';

// authentification test
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// package for star ratings



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'movie-app-frontend';

  constructor(
    private router: Router,
    public authService: AuthService,
    public http: HttpClient,
  ) {}

  ngOnInit() {}

  error: any;

  login(){

    let username = (<HTMLInputElement>document.getElementById('input_username')).value;
    let password = (<HTMLInputElement>document.getElementById('input_password')).value;
     this.authService.login(username, password).subscribe(
          success => console.log(success), //this.router.navigate(['list']),
          error => console.log(error)
     );

  };

  logout(): void {
    this.authService.logout();
  };

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }


  // ################ Sidenav #############################################

  openSidenav(): void {
    document.getElementById('mySidenav').style.width = '200px';
    document.getElementById('content').style.marginLeft = '200px';
  }

  closeSidenav(): void {
    document.getElementById('mySidenav').style.width = '0px';
    document.getElementById('content').style.marginLeft = '0px';
  }

}
