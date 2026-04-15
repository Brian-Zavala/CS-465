import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
