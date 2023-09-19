import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProceedConformationComponent} from "./proceed-conformation/proceed-conformation.component";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: string[] = [];
  selectedMainItem: string | null = null;
  itemDescription: string | null = null;
  selectedVersion: string | null = null;
  projectData = {};
  private messagesSource = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSource.asObservable();

  constructor(private backendService: BackendService) {  }
  hello(){
    console.log("hello from data service")
    console.log("selectedMainItem: ", this.selectedMainItem)
    console.log("itemDescription: ", this.itemDescription)
    console.log("selectedVersion: ", this.selectedVersion)
  }
  updateMessages(messages: string[], projectData: any) {
    // this.messagesSource.next(messages);
    console.log("messages in data service", messages);
    this.messages = messages;
    this.projectData = projectData;
  }

  generateProject(){
    const projectName = (document.getElementById('projectName') as HTMLInputElement);
    const generatingMessage = (document.getElementById('generatingMessage') as HTMLInputElement);
    const downloadingMessage = (document.getElementById('downloadingMessage') as HTMLInputElement);
    const doneMessage = (document.getElementById('doneMessage') as HTMLInputElement);
    const generateButton = (document.getElementById('generateButton') as HTMLInputElement);

    console.log ("project name", projectName.value);
    console.log("project data", this.projectData);

    generateButton.disabled = true;
    this.makeVisible(generatingMessage);
    this.backendService.createProject(this.projectData).subscribe(

      response => {
        console.log('API response for create project:', response);
        this.makeUnVisible(generatingMessage);
        this.makeVisible(downloadingMessage);
        this.backendService.downloadZip(projectName.value);
        this.makeUnVisible(downloadingMessage);
        generateButton.disabled = false;
        this.makeVisible(doneMessage);
        this.onDeleteProject(projectName.value);

      },
      error => {
        console.error('API error:', error);
        // Handle error, e.g., show an error message
      }

    );
  }
  makeVisible(Element: HTMLInputElement) {
    console.log("visible method called")
    console.log(Element)
    Element.style.display = 'block';

  }
  makeUnVisible(Element: HTMLInputElement) {
    console.log("UnVisible method called")
    Element.style.display = 'none';

  }
  onDeleteProject(projectName: string) {

    this.backendService.deleteProject(projectName).subscribe(
      () => {
        console.log('Project deleted successfully');
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
}
