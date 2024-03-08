import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:8082/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiURL, {}, { headers: headers, responseType: 'text' })
      .pipe(
        map((token: string) => {
          // Ici, on suppose que le token est retourné directement dans le corps de la réponse.
          // Sauvegarder le token dans localStorage ou selon votre mécanisme de stockage préféré.
          localStorage.setItem('authToken', token);
          return token;
        }),
        catchError((error) => {
          // Gestion simple des erreurs, pourrait être améliorée selon les besoins.
          return throwError(
            () => new Error('Something bad happened; please try again later.')
          );
        })
      );
  }

  // Méthode pour récupérer le token stocké
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
