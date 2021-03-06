import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { RatedMoviesComponent } from './rated-movies/rated-movies.component';
import { RatedMoviesClusterComponent } from './rated-movies-cluster/rated-movies-cluster.component';
import { RatedMoviesStatisticsComponent } from './rated-movies-statistics/rated-movies-statistics.component';
import { SuggestionsClusterComponent } from './suggestions-cluster/suggestions-cluster.component';
import { SuggestionsSimilarMoviesComponent } from './suggestions-similar-movies/suggestions-similar-movies.component';
import { SuggestionsActorsComponent } from './suggestions-actors/suggestions-actors.component';
// Tests for Login
import { FormsModule } from '@angular/forms';    // add this
import { AuthService, AuthInterceptor, AuthGuard } from './auth.service';

// package for autocomplete
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// package for graphics
import { ChartsModule } from 'ng2-charts';
import { QualityOfProfileComponent } from './quality-of-profile/quality-of-profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// package for rating



const appRoutes: Routes = [
  { path: 'all-movies', component: AllMoviesComponent },
  { path: 'rated-movies', component: RatedMoviesComponent },
  { path: 'rated-movies-cluster', component: RatedMoviesClusterComponent },
  { path: 'rated-movies-statistics', component: RatedMoviesStatisticsComponent },
  { path: 'suggestions-cluster', component: SuggestionsClusterComponent },
  { path: 'suggestions-similar-movies', component: SuggestionsSimilarMoviesComponent },
  { path: 'suggestions-actors', component: SuggestionsActorsComponent },
  { path: 'sign-up', component: SignUpComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    AllMoviesComponent,
    RatedMoviesComponent,
    RatedMoviesClusterComponent,
    RatedMoviesStatisticsComponent,
    SuggestionsClusterComponent,
    SuggestionsSimilarMoviesComponent,
    SuggestionsActorsComponent,
    QualityOfProfileComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,

    ChartsModule,

    NgbModule

  ],
  exports: [RouterModule],
  providers: [AllMoviesComponent,
              AuthService,
              AuthGuard,
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
