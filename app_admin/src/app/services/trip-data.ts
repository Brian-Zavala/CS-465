import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;

  public getTrips(): Promise<Trip[]> {
    return firstValueFrom(this.http.get<Trip[]>(this.tripUrl));
  }

  public getTrip(tripCode: string): Promise<Trip[]> {
    return firstValueFrom(this.http.get<Trip[]>(`${this.tripUrl}/${tripCode}`));
  }

  public addTrip(formData: Trip): Promise<Trip> {
    return firstValueFrom(this.http.post<Trip>(this.tripUrl, formData));
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    let tripCode = localStorage.getItem("tripCode");
    return firstValueFrom(this.http.put<Trip>(`${this.tripUrl}/${tripCode}`, formData));
  }

  public deleteTrip(tripCode: string): Promise<any> {
    return firstValueFrom(this.http.delete(`${this.tripUrl}/${tripCode}`));
  }
}
