// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DynamicFormService {
//   private formData = new BehaviorSubject<any>(null);
//   formData$ = this.formData.asObservable();

//   setFormData(data: any) {
//     this.formData.next(data);
//   }
// }
import { Injectable } from '@angular/core';
import { FormField } from '../models/form-field.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private formFields: FormField[] = [];
  private formFieldsSubject = new BehaviorSubject<FormField[]>([]); // Make it reactive

  updateFields(fields: FormField[]) {
    this.formFieldsSubject.next(fields); // 🔥 Update form preview in real-time
  }
  setFormFields(fields: FormField[]) {
    this.formFields = [...fields]; // Store a new array to avoid reference issues
    this.formFieldsSubject.next(this.formFields); // Update Subject for real-time sync
    console.log("✔ Form Fields Set in Service: ", this.formFields);
  }


  getFormFieldsObservable() {
    return this.formFieldsSubject.asObservable(); // Observable for real-time data update
  }

  removeField(fieldId: number) {
    this.formFields = this.formFields.filter(field => field.id !== fieldId);
    this.formFieldsSubject.next(this.formFields);
  }
  saveFormTemplate(templateName: string) {
    if (!this.formFields.length) {
      console.error('No fields to save!');
      return;
    }
    localStorage.setItem(`formTemplate-${templateName}`, JSON.stringify(this.formFields));
    console.log(`✔ Form template '${templateName}' saved!`);
  }

  loadFormTemplate(templateName: string) {
    const savedData = localStorage.getItem(`formTemplate-${templateName}`);
    if (savedData) {
      this.formFields = JSON.parse(savedData);
      this.formFieldsSubject.next(this.formFields);
      console.log(`✔ Form template '${templateName}' loaded!`);
    } else {
      console.warn('⚠ Template not found!');
    }
  }

  getAllTemplates(): string[] {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('formTemplate-'))
      .map(key => key.replace('formTemplate-', ''));
  }

  getFormFields(): FormField[] {
    return this.formFields;
  }
}
