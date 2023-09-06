import { Component } from '@angular/core';
import {BackendService} from "./backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'AutoFlexcreatorUI';
  // constructor(private backendService: BackendService) { }
  //
  //
  // generateProject() {
  //   const projectName = (document.getElementById('projectName') as HTMLInputElement).value;
  //   const javaVersion = (document.getElementById('javaVersion') as HTMLInputElement).value;
  //
  //   const projectData = {
  //     projectName: projectName,
  //     javaVersion: javaVersion
  //   };
  //
  //
  //
  //   this.backendService.createProject(projectData).subscribe(
  //     response => {
  //       console.log('API response:', response);
  //       // Handle success, e.g., show a success message
  //     },
  //     error => {
  //       console.error('API error:', error);
  //       // Handle error, e.g., show an error message
  //     }
  //   );
  // }

}
