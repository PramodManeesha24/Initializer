import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMainItem: string | null = null;
  itemDescription: string | null = null;
  selectedVersion: string | null = null;


  constructor() { }
  hello(){
    console.log("hello from data service")
    console.log("selectedMainItem: ", this.selectedMainItem)
    console.log("itemDescription: ", this.itemDescription)
    console.log("selectedVersion: ", this.selectedVersion)
  }

}
