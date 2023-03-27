import { Component, ViewChild } from "@angular/core";
import { SharerService } from "../sharer.service";
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { firstValueFrom,lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ClrModal } from '@clr/angular';


interface IeventList{
  eventName: string
  eventCategory: string
  //description: string
}
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  @ViewChild('myModal', { static: true }) myModal: ClrModal | undefined;
  eventName = '';
  //description = 'Intro to Software Engineering'
  eventCategory = '';
  eventDate : Date | undefined;
  startDate : Date | undefined;
  endDate : Date | undefined;
  recurringEvent = false;
  public eventList: IeventList[] =[]

  reset() {
    this.eventName = '';
    //this.description = '';
    this.eventCategory = '';
    // Hide and reset the form
    this.eventDate  = undefined;
    this.startDate  = undefined;
    this.endDate  = undefined;
    this.recurringEvent = false;
    // add code to reset button group
  }

  async addEvent(){
    this.basic = false;
    console.log("Name: " + this.eventName + " Category: " + this.eventCategory + " Date: " + this.eventDate);
    // this.sharerService.addEvent(this.eventDate, this.eventName);
    firstValueFrom(this.httpClient.post('/api/addEvent',{
      eventName: this.eventName,
      eventCategory: this.eventCategory
      //description: this.description
    }))
    this.reset();
  }
  async loadEvents(){
    const userList = await this.httpClient
    .get<IeventList[]>('/api/viewEvents')
    this.eventList = await lastValueFrom(userList)

   }

  constructor(private httpClient:HttpClient,private sharerService:SharerService) { }

  // eventNames: string = '';
  //eventCategory: string = '';
  basic: boolean = false;
  colorHSL: string = this.sharerService.getAccentHSL();
  // eventDate: DateTime = DateTime.now();

  // submit() {
  //   this.basic = false;
  //   console.log("name: " + this.eventName + " cat: " + this.eventCategory + " date: " + this.eventDate.toFormat("yyyy-MM-dd") + " time: " + this.eventDate.toFormat("HH:mm:ss"));
  // }
}
