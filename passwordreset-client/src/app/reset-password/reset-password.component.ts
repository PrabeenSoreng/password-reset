import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPwdForm: FormGroup;
  token: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params
      .subscribe(param => {
        this.token = param.token;
      });

    this.resetPwdForm = this.fb.group({
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    }, {validator: this.validatePassword.bind(this)});
  }

  get password() {
    return this.resetPwdForm.get('password');
  }

  get cpassword() {
    return this.resetPwdForm.get('cpassword');
  }

  onSubmit() {
    this.authService.resetPassword(this.resetPwdForm.value.password, this.token)
      .subscribe(data => {
        console.log(data);
      }, err => console.log(err));
  }

  validatePassword(pwdFormGroup: FormGroup) {
    const password = pwdFormGroup.get('password').value;
    const cpassword = pwdFormGroup.get('cpassword').value;

    if(cpassword.length === 0) return null;
    if(password !== cpassword) {
      return {
        doesNotMatch: true
      };
    }
    return null;
  }
}
