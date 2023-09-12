import { Component } from '@angular/core';
import { PopupDependencyService } from '../popup-dependency.service';



@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.css']
})
export class DependencyComponent {

  constructor(private popupDependencyService: PopupDependencyService) {
  }

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

    // Handle the selection logic here (e.g., add the selected item to a list)
    // For demonstration purposes, let's log the selected item to the console
    console.log('Selected item:', item);
  }
  selectDependency(dependency: any) {
    this.popupDependencyService.addDependency(dependency);
  }


}
