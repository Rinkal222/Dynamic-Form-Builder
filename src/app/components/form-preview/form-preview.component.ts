import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormField } from 'src/app/models/form-field.model';
import { DynamicFormService } from 'src/app/services/dynamic-form.service';
import { SubmittedDataDialogComponent } from '../submitted-data-dialog/submitted-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css'],
})
export class FormPreviewComponent implements OnInit {

  fields: FormField[] = [];
  dynamicForm!: FormGroup;
  formCreated: boolean = false;
  selectedCheckboxValues: { [key: string]: string[] } = {};

  constructor(
    private formBuilder: FormBuilder,
    private formBuilderService: DynamicFormService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.formBuilderService.getFormFieldsObservable().subscribe((fields: FormField[]) => {
      this.fields = fields;
      this.formCreated = fields.length > 0;
      let formGroupConfig: any = {};

      this.fields.forEach(field => {
        if (field.type === 'checkbox' || field.type === 'select') {
          formGroupConfig[field.label] = field.required ? [[], Validators.required] : [[]];
        } else {
          formGroupConfig[field.label] = field.required ? ['', Validators.required] : [''];
        }
      });
      this.dynamicForm = this.formBuilder.group(formGroupConfig);
    });
  }

  updateCheckboxValue(label: string, option: string, event: any) {
    const control = this.dynamicForm.get(label);
    let selectedOptions = [...(this.dynamicForm.get(label)?.value || [])];
    if (event.target.checked) {
      if (!selectedOptions.includes(option)) {
        selectedOptions.push(option);
      }
    } else {
      selectedOptions = selectedOptions.filter(val => val !== option);
    }
    this.dynamicForm.get(label)?.setValue(selectedOptions);
    this.dynamicForm.get(label)?.updateValueAndValidity();
    control?.markAsTouched();
  }

  // Dropdown Selection Change
  onDropdownChange(fieldName: string) {
    const control = this.dynamicForm.get(fieldName);
    control?.markAsTouched();
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      this.showSnackbar('❌ Please fill all required fields!', 'error');
      return;
    }
    let formData = this.dynamicForm.value;
    // Merge checkbox selections into form data
    for (let key in this.selectedCheckboxValues) {
      formData[key] = this.selectedCheckboxValues[key];
    }
    // Show data in dialog box
    this.dialog.open(SubmittedDataDialogComponent, {
      width: '40%',
      data: formData
    });
    this.showSnackbar('✅ Form submitted successfully!');
  }

  private showSnackbar(message: string, type: 'success' | 'error' = 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'error' ? 'snackbar-error' : 'snackbar-success',
    });
  }
}