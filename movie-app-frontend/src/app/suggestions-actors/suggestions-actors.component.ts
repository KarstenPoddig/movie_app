import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ClusterActor } from 'src/app/classes/cluster.actor';


@Component({
  selector: 'app-suggestions-actors',
  templateUrl: './suggestions-actors.component.html',
  styleUrls: ['./suggestions-actors.component.css']
})
export class SuggestionsActorsComponent implements OnInit {

  suggestionList: ClusterActor[];

  constructor(private http: HttpClient,
              public authService: AuthService) {
    this.suggestionList = [];
  }

  ngOnInit(): void {

    if(this.authService.isLoggedIn()){
      this.getSuggestion();
    }

  }

  getSuggestion(): void{

    let headers = {'Authorization': 'Bearer ' + this.authService.token};

    this.http.get('/actor/',
                  { headers: headers })
      .subscribe(json_result => {
        console.log(json_result);

        this.suggestionList = [];

        if(json_result['meta']['status'] == 'normal'){

          for(var i=0; i<json_result['data'].length; i++){
            this.suggestionList.push(new ClusterActor(json_result['data'][i]));
          }

        }
      }
    )
  }

}
