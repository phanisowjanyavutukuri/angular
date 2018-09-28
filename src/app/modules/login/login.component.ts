import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserUtilityService } from '../common/user-utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  user: User = new User();
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private userUtilityService: UserUtilityService) { }

  ngOnInit() {
    this.shouldShowDashboard();
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onTextBoxkeydown(event: any) {
    this.errorMessage = '';
  }

  login() {
    this.loginService.login(this.user).subscribe(data => {
      this.userUtilityService.addTokenAndUsername(data.token,this.user.email);
      this.shouldShowDashboard(true);
    },err=> {
      this.errorMessage = err.json().status;
    })
  }

  shouldShowDashboard(skipCheck = false) {
    if(skipCheck || sessionStorage.getItem('token') !== null) {
      var redirectPath = '/dashboard';
      window.location.href = redirectPath;
    }
  }

}
