import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { paysOlympique } from '../models/Olympic';
import { catchError, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<paysOlympique[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<paysOlympique[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        this.olympics$.next([]);
        return throwError(() => new Error(`Erreur lors du chargement des données initiales : ${error.message}`));
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable().pipe(
      filter(olympics$ => olympics$ && olympics$.length > 0)
    );
  }
}