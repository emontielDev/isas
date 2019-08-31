import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Validators
import { CustomValidators } from 'ng2-validation';

// Jquery
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = formBuilder.group({
      email: [null, [Validators.required, CustomValidators.email]],
      password: [null, Validators.required],
      remember: [false]
    });
  }

  ngOnInit() {
  }

  close() {
    $('#loginform').slideDown();
    $('#recoverform').fadeOut();
  }

  forgotPassword(): void {
    $('#loginform').slideUp();
    $('#recoverform').fadeIn();
  }

  ingresar() {
    if (!this.loginForm.valid) {
      return;
    }

    this.router.navigate(['/home']);
  }
}
