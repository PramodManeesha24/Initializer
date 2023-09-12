import {Component, Inject} from '@angular/core';
import { PopupDependencyService } from '../popup-dependency.service';
import { BackendService } from '../backend.service';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AppModule} from "../app.module";

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.css'],
})
export class ProjectCreatorComponent {
  constructor(private backendService: BackendService,
              private popupDependencyService:PopupDependencyService
  ) { }
  javaVersions: number[] = [17, 18, 19, 20];

  isPopupVisible: boolean = false;
  showPopup() {
    // const popup = this.popupDependencyService.open(PopupDependencyService);
    console.log("show popup method called")
    return this.isPopupVisible = true;
  }
  hidePopup() {
    this.isPopupVisible = false;
  }


  // openPopup(content: any) {
  //   this.showPopup = true;
  //   this.modalService.open(content, { centered: true }); // Use NgbModal to open the popup
  // }
  //
  //
  // addDependency(dependency: any) {
  //   this.popupDependencyService.addDependency(dependency);
  //   this.showPopup = false; // Close the popup
  // }
  onJavaVersionChange() {

    const javaVersionString = (document.getElementById('javaVersion') as HTMLInputElement);
    javaVersionString.style.color = '';

  }
  checkValues(){


    const alphabeticRegex = /^[a-zA-Z0-9-_()\[\]{}]+$/
    const projectName = (document.getElementById('projectName') as HTMLInputElement);
    const javaVersionString = (document.getElementById('javaVersion') as HTMLInputElement);
    const packageName = (document.getElementById('packageName') as HTMLInputElement);
    const javaVersion = parseInt(javaVersionString.value);
    const generatingMessage = (document.getElementById('generatingMessage') as HTMLInputElement);
    const downloadingMessage = (document.getElementById('downloadingMessage') as HTMLInputElement);
    const doneMessage = (document.getElementById('doneMessage') as HTMLInputElement);


    //
    // const group = document.getElementById('group');
    // const artifact = document.getElementById('artifact');
    //
    //
    // group.addEventListener('input', updatePackageName);
    // artifact.addEventListener('input', updatePackageName);
    //
    // function updatePackageName() {
    //   const groupValue = group.nodeValue
    // }




    generatingMessage.style.display = 'none';
    downloadingMessage.style.display = 'none';
    doneMessage.style.display = 'none';


    let allFilled = true;
    if (projectName.value === '') {
      projectName.placeholder = ' * Project name is required';
      projectName.style.borderColor = 'red';
      projectName.classList.add('error-placeholder');

      allFilled = false;
    }
    else if (!alphabeticRegex.test(projectName.value))  {
      projectName.value = '';
      projectName.placeholder = ' * Invalid characters in project name';
      projectName.style.borderColor = 'red';
      projectName.classList.add('error-placeholder');
      allFilled = false;
    }
    else {
      projectName.style.borderColor = '';
      projectName.placeholder = '';
    }


    if (javaVersionString.value === '') {
      javaVersionString.style.color = 'red';
      javaVersionString.style.borderColor = 'red';
      allFilled = false;
    }else if (javaVersion < 17 || javaVersion > 20) {
      javaVersionString.placeholder = ' * Java version must be between 8 and 15';
      allFilled = false;
    }
    else {
      javaVersionString.placeholder = '';
      javaVersionString.style.borderColor = '';
    }

    if(!this.packageNameValidation(packageName.value)){
      packageName.value = '';
      packageName.placeholder = ' * Invalid package name';
      packageName.style.borderColor = 'red';
      packageName.classList.add('error-placeholder');
      allFilled = false;
    }

    if (allFilled) {
      this.generateProject();
    }



  }

  packageNameValidation(packageName : string) {

     const alphabeticRegex = /^[a-z.]+$/
     for (let i = 0; i < packageName.length; i++) {
       if (!alphabeticRegex.test(packageName[i])) {
         return false;
       }
     }
     return true;
  }


  generateProject() {

    const generatingMessage = (document.getElementById('generatingMessage') as HTMLInputElement);
    const downloadingMessage = (document.getElementById('downloadingMessage') as HTMLInputElement);
    const doneMessage = (document.getElementById('doneMessage') as HTMLInputElement);
    const generateButton = (document.getElementById('generateButton') as HTMLInputElement);
    const projectName = (document.getElementById('projectName') as HTMLInputElement).value;
    const javaVersion = (document.getElementById('javaVersion') as HTMLInputElement).value;
    const packageName = (document.getElementById('packageName') as HTMLInputElement).value;

    const projectData = {
      projectName: projectName,
      javaVersion: javaVersion,
      packageName: packageName
    };

    generateButton.disabled = true;
    this.makeVisible(generatingMessage);
    this.backendService.createProject(projectData).subscribe(

      response => {
        console.log('API response:', response);

        this.makeUnVisible(generatingMessage);
        this.makeVisible(downloadingMessage);

        this.backendService.downloadZip(projectName);
        this.makeUnVisible(downloadingMessage);
        generateButton.disabled = false;
        this.makeVisible(doneMessage);


        this.onDeleteProject(projectName);


        // Handle success, e.g., show a success message
      },
      error => {
        console.error('API error:', error);
        // Handle error, e.g., show an error message
      }

    );


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


  makeVisible(Element: HTMLInputElement) {
    console.log("visible method called")
    console.log(Element)
    Element.style.display = 'block';

  }
  makeUnVisible(Element: HTMLInputElement) {
    console.log("UnVisible method called")
    Element.style.display = 'none';

  }

  creatingMessage() {

  }



}
