import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreatorComponent } from './project-creator.component';

describe('ProjectCreatorComponent', () => {
  let component: ProjectCreatorComponent;
  let fixture: ComponentFixture<ProjectCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCreatorComponent]
    });
    fixture = TestBed.createComponent(ProjectCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
