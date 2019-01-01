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
    });
  }

  onSubmit() {
    
  }

}
