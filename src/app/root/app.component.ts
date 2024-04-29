import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  responseData: any;

  constructor(
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
  }

}




