import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';
import { TripCardComponent } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {

  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) { }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  ngOnInit(): void {
    this.tripDataService
      .getTrips()
      .then(foundTrips => {
        this.trips = foundTrips;
        if (foundTrips && foundTrips.length > 0) {
          this.message = '';
        } else {
          this.message = 'No trips found';
        }
      })
      .catch(err => {
        this.message = 'Error fetching trips';
        console.error('Catch block error:', err);
      });
  }

}
