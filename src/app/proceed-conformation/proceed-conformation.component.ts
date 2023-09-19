import {Component, Inject, EventEmitter, Output, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectCreatorComponent} from "../project-creator/project-creator.component";
import {DataService} from "../data.service";

@Component({
  selector: 'app-proceed-conformation',
  templateUrl: './proceed-conformation.component.html',
  styleUrls: ['./proceed-conformation.component.css']
})
export class ProceedConformationComponent  {
  // @ViewChild('confirmationPopup') confirmationPopup!: ElementRef;

  public messages: string[] = [];

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    // this.dataService.updateMessages(this.messages);
    this.messages = this.dataService.messages;
    console.log("messages in proceed component", this.messages);
  }
  proceed(): void{
    console.log("proceed");
    this.dataService.generateProject();
  }
}
