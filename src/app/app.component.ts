import { Component, OnInit } from '@angular/core';
import { UserUtilityService } from './modules/common/user-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample';
  isLoggedIn = false;

  constructor(private userUtilityService: UserUtilityService) {}

  ngOnInit() {
    // console.log('hi');
    this.isLoggedIn = this.userUtilityService.isUserLoggedIn();
  }
}
