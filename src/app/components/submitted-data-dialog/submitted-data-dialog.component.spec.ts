import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedDataDialogComponent } from './submitted-data-dialog.component';

describe('SubmittedDataDialogComponent', () => {
  let component: SubmittedDataDialogComponent;
  let fixture: ComponentFixture<SubmittedDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
