import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPwdForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
    console.log(this.resetPwdForm);
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
