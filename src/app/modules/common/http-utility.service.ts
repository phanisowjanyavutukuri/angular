import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import { UserUtilityService } from './user-utility.service'; 


@Injectable()
export class HttpUtilityService {

    baseUrl = environment.baseUrl;

    constructor(private http: Http, private userUtilityService: UserUtilityService) {

    }

    post(url: string, body: string, options?: RequestOptions) {
        options = this.setAuthHeader(options);
        return this.http.post(this.baseUrl+url, body, options)
            .map(res => {
                console.log('in map');
                return res.json();
            })
            .catch(res => (this.handleError(res)))
            .finally(() => {

                // Call stop loading bar if we have any.
            });

    }

    get(url: string, options?: RequestOptions) {
        // Call start loading bar if we have any.
        options = this.setAuthHeader(options);
        return this.http.get(this.baseUrl+url, options)
            .map(res => res)
            .catch(res => (this.handleError(res)))  
            .finally(() => {
                // Call stop loading bar if we have any.
            });
    }

    private handleError(response: Response) {
        let redirectPath = '';
        console.log(response);
        if (response.status === 401 || response.status === 403) {
            this.userUtilityService.removeFromSessionStore();
            redirectPath = '/';
            window.location.href = redirectPath;
        }
        return Observable.throw(response || 'Server error');
    }

    private setAuthHeader(reqOptions: RequestOptions):RequestOptions {
        if(!reqOptions) {
            reqOptions = new RequestOptions({
                headers: new Headers(),
            });
        }
        var token = sessionStorage.getItem('token'); 
        reqOptions.headers.append('Content-Type', 'application/json');
        if(token) {
            reqOptions.headers.append('Authorization','Bearer '+token);
        }
        return reqOptions;
    }

}