import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTripComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {
    this.addForm = this.formBuilder.group({
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
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        })
        .catch(error => {
          console.error('Error adding trip:', error);
        });
    }
  }
  get f() { return this.addForm.controls; }

  onCancel() {
    this.router.navigate(['']);
  }
}
