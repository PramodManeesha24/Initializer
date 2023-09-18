import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProceedConformationComponent} from "./proceed-conformation/proceed-conformation.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: string[] = [];
  selectedMainItem: string | null = null;
  itemDescription: string | null = null;
  selectedVersion: string | null = null;
  private messagesSource = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSource.asObservable();

  constructor() { }
  hello(){
    console.log("hello from data service")
    console.log("selectedMainItem: ", this.selectedMainItem)
    console.log("itemDescription: ", this.itemDescription)
    console.log("selectedVersion: ", this.selectedVersion)
  }
  updateMessages(messages: string[]) {
    // this.messagesSource.next(messages);
    console.log("messages in data service", messages);
    this.messages = messages;
  }
}
