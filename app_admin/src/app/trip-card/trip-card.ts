import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip;

  constructor(
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip', trip.code]);
  }

  public deleteTrip(trip: Trip): void {
    if (confirm(`Are you sure you want to delete trip: ${trip.name}?`)) {
      this.tripDataService.deleteTrip(trip.code)
        .then(() => {
          console.log(`Trip ${trip.code} deleted`);
          // Refresh the page to show updated list after deletion
          window.location.reload(); 
        })
        .catch(err => console.error(err));
    }
  }
}
