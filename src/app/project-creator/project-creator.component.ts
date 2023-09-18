import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {BackendService} from '../backend.service';
import {DataService} from "../data.service";
import {MatDialog} from '@angular/material/dialog';
import {DependencyComponent} from "../dependency/dependency.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {ProceedConformationComponent} from "../proceed-conformation/proceed-conformation.component";

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-project-creator',
  templateUrl: './project-creator.component.html',
  styleUrls: ['./project-creator.component.css'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('initial => rotated', animate('500ms ease-in')),
      transition('rotated => initial', animate('0ms'))

    ]),
  ],
})
export class ProjectCreatorComponent {


  constructor(private backendService: BackendService,
              public dialog: MatDialog,

              private dataService: DataService,
  ) { }
  javaVersions: number[] = [17, 18, 19, 20];
  rotationState = 'initial';
  isPopupVisible: boolean = false;
  isDependencyAdded: boolean = false;

  public static itemLists: any[] = [];
  selectedItems: any[] = [];
  proceedMessagesList: string[] = [];
  autoFlexVersions: string[] | undefined = [];
  healaniumManagerVersions: string[] | undefined = [];

  ngOnInit(): void {
    const versions: any = this.backendService.getVersions().subscribe(

      response => {

        console.log('API response for versions :', response);
        this.autoFlexVersions = response["AutoFlex"];
        this.healaniumManagerVersions = response["Helanium Manager"];

      },
      error => {
        console.error('API error:', error);
      }
    );
  }

  selectedItem() {
    // Access the data from the service
    const mainItem = this.dataService.selectedMainItem;
    const description = this.dataService.itemDescription;
    const version = this.dataService.selectedVersion;
    const existingItemIndex = this.selectedItems.findIndex(item => item.name === mainItem);
    if (mainItem != null || description != null || version != null) {
      this.isDependencyAdded = true;
    }



    if (existingItemIndex !== -1) {
      // If the item already exists, update its version and description
      ProjectCreatorComponent.itemLists[existingItemIndex].description = description;
      ProjectCreatorComponent.itemLists[existingItemIndex].version = version;
      this.selectedItems[existingItemIndex].description = description;
      this.selectedItems[existingItemIndex].version = version;
    } else {
      // If the item doesn't exist, add a new item to selectedItems
      const newItem = {
        name: mainItem,
        description: description,
        version: version
      };
      this.selectedItems.push(newItem);
      ProjectCreatorComponent.itemLists.push(newItem);
      for (const item of this.selectedItems) {
        console.log('Name:', item.name);
        console.log('Description:', item.description);
        console.log('Version:', item.version);
        console.log('---'); // Add a separator if needed
      }
    }
  }

  rotate() {
    const projectName = (document.getElementById('projectName') as HTMLInputElement);
    const javaVersionString = (document.getElementById('javaVersion') as HTMLInputElement);

    const javaVersion = parseInt(javaVersionString.value);



    const customDependency = (document.getElementById('custom-dependency-text') as HTMLInputElement);


    this.rotationState = this.rotationState === 'initial' ? 'rotated' : 'initial';
    this.rotationState = 'initial';
    projectName.value = '';
    javaVersionString.value = '';
    customDependency.value = '';
    ProjectCreatorComponent.itemLists = [];
    this.selectedItems = [];
    this.isDependencyAdded = false;

    const emptyMessages: string[] = [];
    this.dataService.updateMessages(emptyMessages);


    // Toggle the rotation state to 'rotated'
    setTimeout(() => {
      this.rotationState = 'rotated';
    }, 10);

  }


  showPopup(): void {

    const versions: any = this.backendService.getVersions().subscribe(

      response => {

        console.log('API response for versions :', response);
        const autoFlexVersions: string[] | undefined = response["AutoFlex"];
        const healaniumManagerVersions: string[] | undefined = response["Helanium Manager"];


        const dialogRef = this.dialog.open(DependencyComponent, {
          data: response  // Pass the data as 'data' property
        });

        this.isPopupVisible = true;

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.selectedItem();
        });
      },
      error => {
        console.error('API error:', error);
      }
    );


  }

  hidePopup() {
    this.isPopupVisible = false;
  }




  removeItem(itemToRemove: any): void {
    // Find the index of the item to remove in the selectedItems array
    const indexToRemove = this.selectedItems.indexOf(itemToRemove);

    // Check if the item was found in the array
    if (indexToRemove !== -1) {
      // Remove the item from the selectedItems array
      this.selectedItems.splice(indexToRemove, 1);
      ProjectCreatorComponent.itemLists.splice(indexToRemove, 1);
      if (ProjectCreatorComponent.itemLists.length === 0) {
        this.isDependencyAdded = false;
      }
    }
  }


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
    const customDependency = (document.getElementById('custom-dependency-text') as HTMLInputElement);

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
    if (customDependency.value !== '') {

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
    if (customDependency.value !== '') {
      const customDependencyControl = new FormControl('', mavenDependencyValidator());
      customDependencyControl.setValue(customDependency.value);

      if (customDependencyControl.hasError('invalidMavenDependency')) {
        console.log('Invalid Maven Dependency');
        customDependency.value = '';
        customDependency.placeholder = ' * Invalid Maven Dependency';
        customDependency.style.borderColor = 'red';
        customDependency.classList.add('error-placeholder');
        allFilled = false;
      } else {
        console.log('Valid Maven Dependency');
      }
    }


    if (allFilled) {
      const versions: any = this.backendService.getLatestVersion().subscribe(
      response => {

        console.log("versions " , response)
        const mapData: Map<string, number> = new Map(Object.entries(response));
        // Accessing a specific value by key (e.g., "AutoFlex")
        const autoFlexVersions: number | undefined = mapData.get("AutoFlex");
        const healaniumManagerVersions: number | undefined = mapData.get("Healanium Manager");
        if (!this.selectedItems.some(item => item.name === 'AutoFlex')) {
          const text1 = 'AutoFlex version is not selected. Proceed with Latest version ' + autoFlexVersions;
          this.proceedMessagesList.push(text1);
        }
        if (!this.selectedItems.some(item => item.name === 'Healanium Manager')) {
          const text2 = 'Healanium Manager version is not selected. Proceed with Latest version ' + healaniumManagerVersions;
          this.proceedMessagesList.push(text2);
        }

        if (this.proceedMessagesList.length > 0) {
          this.proceedMessage()
        }
      },
      error => {
        console.error('API error:', error);
      });

        // this.generateProject();
    }

  }
  proceedMessage(){
    console.log("proceed message " , this.proceedMessagesList)
    this.dataService.updateMessages(this.proceedMessagesList);
    const dialogRef = this.dialog.open(ProceedConformationComponent, {});

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
    const customDependency = (document.getElementById('custom-dependency-text') as HTMLInputElement);


    const projectData = {
      projectName: projectName,
      javaVersion: javaVersion,
      packageName: packageName,
      dependencies: ProjectCreatorComponent.itemLists,
      dependencies1: this.selectedItems,
      customDependency: customDependency.value
    };

    generateButton.disabled = true;
    this.makeVisible(generatingMessage);
    this.backendService.createProject(projectData).subscribe(

      response => {
        console.log('API response for create project:', response);
        this.makeUnVisible(generatingMessage);
        this.makeVisible(downloadingMessage);
        this.backendService.downloadZip(projectName);
        this.makeUnVisible(downloadingMessage);
        generateButton.disabled = false;
        this.makeVisible(doneMessage);
        this.onDeleteProject(projectName);

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
export function mavenDependencyValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = /^<dependency>((.|\n)*?)<\/dependency>/.test(control.value) ||
    /^<.*?>\n<dependency>((.|\n)*?)<\/dependency>/.test(control.value);
    return valid ? null : {'invalidMavenDependency': {value: control.value}};
  };
}
