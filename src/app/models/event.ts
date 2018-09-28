import { Location } from './location';

export class Event {
    public timestamp: string;
    public eventType: String;
    public value: Number;
    public locationDTO: Location;

    constructor() {
        this.timestamp = '';
        this.eventType = '';
        // this.value = ;
        this.locationDTO = new Location();
    }
}

export class SearchCriteria {
    public startTime: string;
    public endTime: string;
    public boxId: number;
    public event: string;
    constructor(){
        this.startTime = '';
        this.endTime = '';
        this.boxId = 0;
        this.event = '';
    }
}
