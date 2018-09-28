import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http, RequestMethod } from '@angular/http';
import { HttpUtilityService } from '../common/http-utility.service';
import { UserUtilityService } from '../common/user-utility.service';

@Injectable()
export class HeaderService {
	constructor(private httpUtilityService: HttpUtilityService, private userUtilityService: UserUtilityService) {
	}

	getName() {
		var username = this.userUtilityService.getUsernameFromSessionStore();
		return this.httpUtilityService.get('/user/user?email='+username).map(res => res.json());
    }
    
    logoutUser() {
        return this.httpUtilityService.get('/auth/signout').map(res => res.json());
    }

}