import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.forgotPwdForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  get email() {
    return this.forgotPwdForm.get('email');
  }

  onSubmit() {
    //console.log(this.forgotPwdForm);

    if(this.forgotPwdForm.valid) {
      const email = this.forgotPwdForm.value.email;
      this.authService.forgotPassword(email)
        .subscribe(data => {
          console.log(data);
        }, err => console.log(err));
    }
  }

}
