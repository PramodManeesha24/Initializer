import {Component, Inject , ViewChild} from '@angular/core';
import { PopupDependencyService } from '../popup-dependency.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectCreatorComponent} from "../project-creator/project-creator.component";
import { DataService } from '../data.service';



@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.css']
})
export class DependencyComponent {


  constructor(private popupDependencyService: PopupDependencyService,
              private dataService: DataService,
              public popup: MatDialogRef<DependencyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProjectCreatorComponent) {  }
  // above is the constructor for the dependency component can access the popup dependency service


  selectedMainItem: string | null = null;
  itemDescription: string | null = null;
  selectedVersion: string | null = null;

  itemList: any[] = [
    {
      name: 'AutoFlex',
      description: 'AutoFlex is a keyword-driven test automation framework designed to facilitate seamless web application testing.',
      versions: ['Version 1.0', 'Version 2.0']
    },
    {
      name: 'Healanium Manager',
      description: 'The Healanium Manager library enables automated integration of Healanium into AutoFlex.',
      versions: ['Version 1.0', 'Version 2.0']
    },
    {
      name: 'Healanium Web',
      description: 'The Healanium web library offers automated self-healing capabilities for testing.',
      versions: ['Version 1.0', 'Version 2.0']
    }
    // Add more items here
  ];


  versionVisibility: { [key: string]: boolean } = {
    'AutoFlex': false,
    'Healanium Manager': false,
    'Healanium Web': false,
    // Add more items as needed
  };
  dependencies = [
    { name: 'AutoFlex', versions: ['v1.0', 'v2.0'] },
    { name: 'Healanium Manager', versions: ['v1.0', 'v2.0'] },
    { name: 'Healanium Web', versions: ['v1.0', 'v2.0'] },
  ];

  toggleVersions(item: string) {
    this.versionVisibility[item] = !this.versionVisibility[item];
  }

  isVersionsVisible(item: string) {
    return this.versionVisibility[item];
  }
  selectItem(item: string) {
    this.versionVisibility[item] = !this.versionVisibility[item];


  }

  selectVersion(mainItemName: string, description: string, version: string) {
    this.dataService.selectedMainItem = mainItemName;
    this.dataService.itemDescription = description;
    this.dataService.selectedVersion = version;




    // console.log('Selected item:', mainItemName);
    // console.log('Selected description:', description);
    // console.log('Selected version:', version);



    this.popup.close();

    // You can also add styling or other actions for the selected version here
  }
  selectDependency(dependency: any) {
    this.popupDependencyService.addDependency(dependency);
  }


}
