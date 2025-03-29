import { Injectable } from "@angular/core";
import { Challenge } from "../models/challenge.model";
import { Observable, catchError, map, of, tap, throwError } from "rxjs";
import { environment } from "@env/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) {}
    private handleError(error: HttpErrorResponse) {
        if (typeof error.error === 'string') {
            return throwError(() => error.error);
        }
        if (error.error?.message) {
            return throwError(() => error.error.message);
        }
        if (error?.message) {
            return throwError(() => error.message);
        }
        return throwError(() => 'An unexpected error occurred');
    }

    getChallenges(): Observable<Challenge[]> {
      return this.http.get<Challenge[]>(`${this.apiUrl}/user/challenges`).pipe(
        map(response => response || []), // Convert null/undefined to empty array
        catchError(this.handleError)
      );
    }
}
