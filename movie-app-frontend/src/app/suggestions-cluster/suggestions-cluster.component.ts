import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Cluster } from 'src/app/classes/cluster';


@Component({
  selector: 'app-suggestions-cluster',
  templateUrl: './suggestions-cluster.component.html',
  styleUrls: ['./suggestions-cluster.component.css']
})
export class SuggestionsClusterComponent implements OnInit {

  suggestionList: Cluster[];

  constructor(private http: HttpClient,
              public authService: AuthService) {
    this.suggestionList = [];
  }


  ngOnInit(): void {

    if(this.authService.isLoggedIn()){
      this.getSuggestions();
    }

  }

  getSuggestions(): void{

    let headers = {'Authorization': 'Bearer ' + this.authService. token};

    this.http.get('/cluster/',
                  { headers: headers })
      .subscribe(json_result => {
        console.log(json_result);

        this.suggestionList = [];

        if(json_result['meta']['status'] == 'normal'){

          for(var i=0; i<json_result['data'].length; i++){
            this.suggestionList.push(new Cluster(json_result['data'][i]));
          }
        }

      }
    );
  }

}
