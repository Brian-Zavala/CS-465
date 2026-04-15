import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let tripCode = this.route.snapshot.paramMap.get('tripCode');
    if (!tripCode) {
      alert("No tripCode provided in the URL!");
      this.router.navigate(['']);
      return;
    }
    console.log('tripCode: ' + tripCode);

    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        let trip = data[0];
        const date = new Date(trip.start);
        const formattedDate = date.toISOString().substring(0, 10);

        this.editForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: formattedDate,
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description
        });
      })
      .catch(error => {
        console.error('Error fetching trip:', error);
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        })
        .catch(error => {
          console.error('Error updating trip:', error);
        });
    }
  }
  get f() { return this.editForm.controls; }

  onCancel() {
    this.router.navigate(['']);
  }
}
