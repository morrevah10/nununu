import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NunuService } from '../../services/nunu.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  greetingMessage='';

  constructor(
    private formBuilder: FormBuilder,
    private nunuService: NunuService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.setGreetingMessage()
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    // if (this.loginForm.valid) {
    //   const email = this.loginForm.value.email;
    //   this.nunuService.login(email).subscribe(
    //     (response) => {
    //       if (response.authorized) {
    //         //move to order page 
    //         console.log("Authorized");
    //       } else {
    //         this.errorMessage = 'Unauthorized email. Please try again.';
    //       }
    //     },
    //     (error) => {
    //       console.error('Error:', error);
    //       this.errorMessage = 'An error occurred. Please try again later.';
    //     }
    //   );

    // }
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      if (this.nunuService.checkEmail(email)) {
        this.router.navigate(['/orders']);
        console.log("Authorized");
      } else {
        this.errorMessage = 'Invalid email. Please try again.';
      }
    }
  }


  setGreetingMessage(): void {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

     
      
      if (currentHour >= 5 && currentHour < 12) {
        this.greetingMessage = `בוקר טוב`;
      } else if (currentHour >= 12 && currentHour < 17) {
        this.greetingMessage = `צוהריים טובים`;
      } else if (currentHour >= 17 && currentHour < 20) {
        this.greetingMessage = `ערב טוב`;
      } else {
        this.greetingMessage = `לילה טוב`;
      }
     
  console.log('this.greetingMessage',this.greetingMessage)
  }


}
