import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard] },
  { path: 'edit-trip/:tripCode', component: EditTripComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'trip-listing', component: TripListingComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];
