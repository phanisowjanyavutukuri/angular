import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  user: User = new User();
  paymentPlans;
  errorMessage = '';
  successMessage = '';
  constructor(private formBuilder: FormBuilder, private signupService: SignupService) { }

  ngOnInit() {
    console.log('hi');
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      userName: ['', [Validators.required, Validators.minLength(1)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.getPaymentPlans();
  }

  onTextBoxkeydown(event: any) {
    this.errorMessage = '';
  }

  getPaymentPlans() {
    this.signupService.getPaymentPlans().subscribe(data => {
      console.log(data.json());
      this.paymentPlans = data.json();
    });
  }
  onEnter(email,password){
    
  }

  registerUser() {
    console.log(this.user);
    this.signupService.registerUser(this.user).subscribe(data => {
      this.successMessage =  data.status;
      this.errorMessage = '';
    }, err => {
      this.errorMessage = err.json().status;
      this.successMessage = '';
    });
  }
}
