import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Cluster } from 'src/app/classes/cluster';


@Component({
  selector: 'app-rated-movies-cluster',
  templateUrl: './rated-movies-cluster.component.html',
  styleUrls: ['./rated-movies-cluster.component.css']
})
export class RatedMoviesClusterComponent implements OnInit {

   clusterList: Cluster[];

  constructor(private http: HttpClient,
              public authService: AuthService) {
  }

  ngOnInit(): void {

    // query cluster if logged in
    if(this.authService.isLoggedIn()){
      this.getCluster();
    }

  }

  getCluster(): void {

    let headers = {}

    if(this.authService.isLoggedIn()){
      headers = {'Authorization': 'Bearer ' + this.authService.token }
    }

    this.http.get('/clustered_movies/',
                  { headers: headers })
      .subscribe(json_result => {

        // erase old results
        this.clusterList = [];

        if(json_result['meta']['status']=='normal'){

          for(var i=0; i<json_result['data'].length; i++){

            this.clusterList.push(new Cluster(json_result['data'][i]));

          }

        }

      }

    );
  }

  refreshCluster(): void{

    let headers = {'Authorization': 'Bearer ' + this.authService.token };

    this.http.get('/refresh_cluster/',
                  { headers: headers })
      .subscribe(json_result => {

        if(json_result['meta']['status'] == 'normal'){
          this.getCluster();
        }
      }
    );

  }

}
