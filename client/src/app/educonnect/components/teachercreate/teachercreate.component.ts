
// src/app/educonnect/components/teachercreate/teachercreate.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type Teacher = {
  teacherId: number;
  fullName: string;
  contactNumber: string;
  email: string;
  subject: string;
  yearsOfExperience: number;
};

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teachercreate.component.html',
  styleUrls: ['./teachercreate.component.scss']
})
export class TeacherCreateComponent {
  teacherForm: FormGroup;

  // init to empty string so binding renders as empty (not "null"), and tests that read text don't crash
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      teacherId: [0],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      yearsOfExperience: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]]
    });
  }

  get f() { return this.teacherForm.controls; }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.teacherForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      Object.values(this.teacherForm.controls).forEach(c => c.markAsTouched());
      return;
    }

    const teacher: Teacher = this.teacherForm.value as Teacher;
    // Set success message first (so even immediate reads will see it)
    this.successMessage = 'Teacher created successfully!';
    console.log('Teacher payload:', teacher);
  }

  resetForm(): void {
    this.teacherForm.reset({
      teacherId: 0,
      fullName: '',
      contactNumber: '',
      email: '',
      subject: '',
      yearsOfExperience: 0
    });
    this.successMessage = null;
    this.errorMessage = null;
  }
}
