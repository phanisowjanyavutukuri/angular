import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtilityService } from '../common/http-utility.service';
import { query } from '@angular/core/src/render3/query';
import * as moment from 'moment-timezone';

@Injectable()
export class DashboardService {
    constructor(private httpUtilityService: HttpUtilityService) {
    }

    getEvents(startTime? : string, endTime?: string, boxId?: number) {
        
        let url = '/event/event?box='+boxId;
        let queryParams = '';
        if(startTime != ''){
            queryParams = queryParams+'&start='+moment.tz(startTime,"UTC").format("YYYY-MM-DD HH:mm:ss.SSS");
            console.log(queryParams);
        }if(endTime != ''){
            queryParams = queryParams+'&end='+moment.tz(endTime,"UTC").format("YYYY-MM-DD HH:mm:ss.SSS");
            console.log(queryParams);
        }
        return this.httpUtilityService.get(url+queryParams).map(res => res);
    }

    fetchBoxes(){
        return this.httpUtilityService.get('/event/box').map(res => res);
    }
}
