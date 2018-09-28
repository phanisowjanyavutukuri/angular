import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http, RequestMethod } from '@angular/http';
import { HttpUtilityService } from '../common/http-utility.service';

@Injectable()
export class LoginService {
	constructor(private httpUtilityService: HttpUtilityService) {
	}

	login(user) {
		const headers = new Headers();
		var reqUser = {
			username: user.email,
			password: user.password
		}
		const requestoptions = new RequestOptions({
            headers: headers,
		});
		return this.httpUtilityService.post('/auth/login', JSON.stringify(reqUser), requestoptions).map(res => res);
	}

}