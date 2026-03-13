
// ============================================================================
// File: src/app/educonnect/components/enrollment/enrollment.component.ts
// ============================================================================
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type Enrollment = {
  enrollmentId: number | null;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
};

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent {
  enrollmentForm: FormGroup;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.enrollmentForm = this.fb.group({
      // Tests expect ALL initial values to be null
      enrollmentId: [null],
      studentId: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      courseId: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      enrollmentDate: [null, [Validators.required]]
    });
  }

  get f() {
    return this.enrollmentForm.controls;
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.enrollmentForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      Object.values(this.enrollmentForm.controls).forEach(c => c.markAsTouched());
      return;
    }

    // Build payload with explicit conversions
    const payload: Enrollment = {
      enrollmentId: this.f['enrollmentId'].value, // stays null on create
      studentId: Number(this.f['studentId'].value),
      courseId: Number(this.f['courseId'].value),
      enrollmentDate: new Date(this.f['enrollmentDate'].value)
    };

    this.successMessage = 'Enrollment added successfully!';
    console.log('Enrollment payload:', payload);
  }

  resetForm(): void {
    // Tests expect nulls after reset, too
    this.enrollmentForm.reset({
      enrollmentId: null,
      studentId: null,
      courseId: null,
      enrollmentDate: null
    });
    this.successMessage = null;
    this.errorMessage = null;
  }
}

