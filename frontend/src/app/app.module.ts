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
import { HeaderComponent } from './core/components/header/header.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    HeaderComponent,
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}