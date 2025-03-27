import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormField } from 'src/app/models/form-field.model';
import { DynamicFormService } from 'src/app/services/dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  fields: FormField[] = [];
  fieldId = 0;
  formCreated = false;

  constructor(
    private router: Router,
    private formBuilderService: DynamicFormService,
    private _snackBar: MatSnackBar) {
    this.formBuilderService.getFormFieldsObservable().subscribe(fields => {
      this.fields = fields;
    });
  }

  addField(type: string) {
    const newField: FormField = {
      id: ++this.fieldId,
      type,
      label: '',
      placeholder:
        type === 'text' ? '' :
          type === 'textarea' ? '' :
            type === 'select' ? '' : '',
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? [] : undefined,
      selectedValue: null
    };
    // If the field is a checkbox, ensure options array is empty initially
    if (type === 'checkbox') {
      newField.options = [];
    }
    this.fields.push(newField);
    if (this.formCreated) {
      this.formBuilderService.setFormFields([...this.fields]); //Update form only if it's already created
    }
  }

  removeField(id: number) {
    this.fields = this.fields.filter(field => field.id !== id);

    if (this.formCreated) {
      this.formBuilderService.removeField(id); // Ensure form updates dynamically
    }
    // 🔹 If all fields are removed, reset formCreated & show "Generate Form" button
    if (this.fields.length === 0) {
      this.formCreated = false;
    }
  }

  addOption(field: FormField, value: string) {
    if (value.trim()) {
      field.options?.push(value);
    }
  }

  removeOption(field: FormField, index: number) {
    field.options?.splice(index, 1);
  }



  validateFormBeforeGeneration() {
    let isValid = true;
    for (let field of this.fields) {
      if ((field.type === 'text' || field.type === 'textarea') && (!field.label || !field.placeholder)) {
        isValid = false;
      } else if ((field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') && (!field.options || field.options.length === 0)) {
        isValid = false;
      }
    }
    if (!isValid) {
      this.showSnackbar('❌ Please add labels, placeholders, and options before generating the form!', 'error');
      return;
    }
    this.generateForm()
  }
  generateForm() {
    this.formCreated = true;
    this.formBuilderService.setFormFields([...this.fields]); // we send a new array
    this.router.navigate(['/form-preview']);
  }
  drop(event: CdkDragDrop<FormField[]>) {
    if (!this.formCreated) {
      this.showSnackbar('⚠️ Please generate the form before using drag and drop!', 'error');
      return;
    }
    moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    this.formBuilderService.setFormFields([...this.fields]); // Update service
    // Force Change Detection (if needed)
    setTimeout(() => {
      this.fields = [...this.fields];
    }, 0);
  }

  private showSnackbar(message: string, type: 'success' | 'error' = 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'error' ? 'snackbar-error' : 'snackbar-success',
    });
  }
  saveTemplate() {
    const templateName = prompt('Enter template name:');
    if (templateName) {
      this.formBuilderService.saveFormTemplate(templateName);
      alert(`✅ Template '${templateName}' saved!`);
    }
  }

  loadTemplate() {
    const templates = this.formBuilderService.getAllTemplates();
    if (templates.length === 0) {
      alert('⚠ No saved templates found!');
      return;
    }

    const templateName = prompt(`Enter template name to load: \n${templates.join(', ')}`);
    if (templateName && templates.includes(templateName)) {
      this.formBuilderService.loadFormTemplate(templateName);
    } else {
      alert('❌ Template not found!');
    }
  }
  clearForm() {
    this.fields = [];  // Remove all form fields
    this.formCreated = false;  // Reset form creation state
    this.fieldId = 0;  // Reset field ID counter
    this.formBuilderService.setFormFields([]); // Clear stored form fields
    this.showSnackbar('🗑️ Form cleared successfully!', 'success');
  }
  
}
