import { Component, OnInit, Input } from '@angular/core';
import { UserUtilityService } from '../common/user-utility.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  title = 'webApp';
  isLoggedIn: boolean;
  userMenu = false;
  userFirstname = 'User';
  constructor(private userUtilityService: UserUtilityService, private headerService: HeaderService){}

  ngOnInit(){
    this.isLoggedIn = this.userUtilityService.isUserLoggedIn();
    if(this.isLoggedIn) {
      this.getUserFirstName();
    }
  }

  openUserMenu() {
    this.userMenu = true;
  }

  logout() {
    this.headerService.logoutUser().subscribe(data => {
      this.userUtilityService.removeFromSessionStore();
            var redirectPath = '/login';
            window.location.href = redirectPath;
    });
  }

  getUserFirstName() {
    this.headerService.getName().subscribe(data => {
      this.userFirstname = data.firstname;
    });
  }

}
