import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpMessage: string = '';

  constructor(private http: HttpClient,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp(): void{

    let username = (<HTMLInputElement>document.getElementById('sign_up_username')).value;
    let pw_1 = (<HTMLInputElement>document.getElementById('sign_up_pw_1')).value;
    let pw_2 = (<HTMLInputElement>document.getElementById('sign_up_pw_2')).value;

    // check if pw_1 is equal to pw_2
    if( pw_1 != pw_2){
      document.getElementById('sign_up_result').style.color = 'red';
      this.signUpMessage = 'Passwords are not equal';
      return;
    }

    // password check
    let pw_accepted = true;
    if(pw_1.length < 8){
      pw_accepted = false;
    }

    if(!pw_accepted){
      document.getElementById('sign_up_result').style.color = 'red';
      this.signUpMessage = 'Password is not strong enough.'
      return;
    }

    // pw is accepted
    this.http.get('/sign-up/',
                  { params: {
                      'username': username,
                      'password': pw_1
                    }
                  })
      .subscribe(json_result => {
        console.log(json_result)
        if(json_result['meta']['status'] == 'exception'){
          document.getElementById('sign_up_result').style.color = 'red';
          this.signUpMessage = json_result['meta']['message'];
        }

        if(json_result['meta']['status'] == 'normal'){
          document.getElementById('sign_up_result').style.color = 'green';
          this.signUpMessage = 'Account created. Ready to sign in.'
        }
      }
    )

  }

}
