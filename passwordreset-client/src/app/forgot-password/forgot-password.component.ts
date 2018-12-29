import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.forgotPwdForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  get email() {
    return this.forgotPwdForm.get('email');
  }

  onSubmit() {
    console.log(this.forgotPwdForm);
  }

}
