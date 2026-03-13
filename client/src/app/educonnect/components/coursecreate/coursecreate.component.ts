
// src/app/educonnect/components/coursecreate/coursecreate.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type Course = {
  courseId: number;
  courseName: string;
  description: string;
  teacherId: number | null;
};

@Component({
  selector: 'app-course-create',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.scss']
})
export class CourseCreateComponent {
  courseForm: FormGroup;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      courseId: [0],
      courseName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(500)]],
      // IMPORTANT: default must be null to satisfy test
      teacherId: [null, [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  get f() { return this.courseForm.controls; }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.courseForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      Object.values(this.courseForm.controls).forEach(c => c.markAsTouched());
      return;
    }

    const course: Course = {
      courseId: Number(this.f['courseId'].value),
      courseName: this.f['courseName'].value,
      description: this.f['description'].value,
      teacherId: this.f['teacherId'].value !== null ? Number(this.f['teacherId'].value) : null
    };

    // Set message first for deterministic tests
    this.successMessage = 'Course created successfully!';
    console.log('Course payload:', course);
  }

  resetForm(): void {
    this.courseForm.reset({
      courseId: 0,
      courseName: '',
      description: '',
      teacherId: null   // reset to null (not empty string)
    });
    this.successMessage = null;
    this.errorMessage = null;
  }
}
