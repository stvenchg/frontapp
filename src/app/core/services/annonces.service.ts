import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Assurez-vous que le chemin d'accès est correct

@Injectable({
  providedIn: 'root',
})
export class AnnoncesService {
  private apiURL = 'http://localhost:8084/job/announce';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAnnonces(): Observable<any> {
    const authToken = this.authService.getAuthToken();

    if (!authToken) {
      // Gérer le cas où l'utilisateur n'est pas connecté ou le token n'est pas disponible
      return throwError(
        () => new Error('Authentication token is not available')
      );
    }

    const headers = new HttpHeaders({
      Authorization: authToken, // Utilisez directement le token stocké
      'Content-Type': 'application/json',
    });

    return this.http.get(this.apiURL, { headers: headers }).pipe(
      catchError((error) => {
        // Gestion simple des erreurs, pourrait être améliorée selon les besoins.
        return throwError(
          () => new Error('Something bad happened; please try again later.')
        );
      })
    );
  }
}
