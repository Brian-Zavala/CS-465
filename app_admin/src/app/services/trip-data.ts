import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../models/storage';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;

  public getTrips(): Promise<Trip[]> {
    return firstValueFrom(this.http.get<Trip[]>(this.tripUrl));
  }

  public getTrip(tripCode: string): Promise<Trip[]> {
    return firstValueFrom(this.http.get<Trip[]>(`${this.tripUrl}/${tripCode}`));
  }

  public addTrip(formData: Trip): Promise<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return firstValueFrom(this.http.post<Trip>(this.tripUrl, formData, httpOptions));
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    let tripCode = localStorage.getItem("tripCode");
    return firstValueFrom(this.http.put<Trip>(`${this.tripUrl}/${tripCode}`, formData, httpOptions));
  }

  public deleteTrip(tripCode: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return firstValueFrom(this.http.delete(`${this.tripUrl}/${tripCode}`, httpOptions));
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http.post<AuthResponse>(url, user);
  }
}
