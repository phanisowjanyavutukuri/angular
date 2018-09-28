import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtilityService } from '../common/http-utility.service';

@Injectable()
export class SignupService {
    constructor(private httpUtilityService: HttpUtilityService) {
    }

    registerUser(user) {
        return this.httpUtilityService.post('/user/registration', user).map(res => res);
    }

    getPaymentPlans(){
        return this.httpUtilityService.get("/user/paymentplan").map(res => res);
    }

}
