import {Component, Inject, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectCreatorComponent} from "../project-creator/project-creator.component";
import {DataService} from "../data.service";

@Component({
  selector: 'app-proceed-conformation',
  templateUrl: './proceed-conformation.component.html',
  styleUrls: ['./proceed-conformation.component.css']
})
export class ProceedConformationComponent implements OnInit {
  @ViewChild('confirmationPopup') confirmationPopup!: ElementRef;
  public messages: string[] = [];

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // if (data) {
    //   console.log('Data received from the backend:', data);
    //   this.messages = Object.values(data);
    // }

  }
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    // Check if the click is outside the popup
    if (this.confirmationPopup.nativeElement.contains(targetElement)) {
      // Click is inside the popup, do nothing
    } else {
      // Click is outside the popup, reset the messages
      this.resetMessages();
    }
  }

// Handle the "No" button click
  handleNoButtonClick() {
    this.resetMessages();
  }

  resetMessages() {
    this.messages = []; // Reset the messages array to an empty array
  }

  ngOnInit() {
    // this.dataService.updateMessages(this.messages);
    this.messages = this.dataService.messages;
  }




logMessages()
{
  console.log("message in proceed component", this.messages);
}

}
