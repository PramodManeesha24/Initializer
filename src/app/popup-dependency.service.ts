import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupDependencyService {

  selectedDependencies: any[] = [];

  addDependency(dependency: any) {
    this.selectedDependencies.push(dependency);
  }


}
