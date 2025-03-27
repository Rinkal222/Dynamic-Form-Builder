import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path: '', component: DynamicFormComponent }, // Default Route
  {
    path: 'form-preview', component: FormPreviewComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
