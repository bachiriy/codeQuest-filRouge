import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { authReducer } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { challengesReducer } from './core/store/challenges/challenges.reducer';
import { ChallengesEffects } from './core/store/challenges/challenges.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavbarComponent,
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ auth: authReducer, challenges: challengesReducer }),
    EffectsModule.forRoot([AuthEffects, ChallengesEffects]),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
