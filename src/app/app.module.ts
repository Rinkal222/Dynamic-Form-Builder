import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule}from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { DynamicFormService } from './services/dynamic-form.service';
import { SubmittedDataDialogComponent } from './components/submitted-data-dialog/submitted-data-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    FormPreviewComponent,
    SubmittedDataDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DynamicFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
