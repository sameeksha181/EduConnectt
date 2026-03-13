import { Component } from '@angular/core';
import { Student } from '../../models/Student';
 
@Component({
  selector: 'app-student-create',
  templateUrl: './studentcreate.component.html',
  styleUrls: ['./studentcreate.component.scss']
})
export class StudentCreateComponent {
  // Day-18 spec expects an instance
  student: Student = new Student();
 
  /**
   * Bind the date input as yyyy-MM-dd string and convert to Date in onSubmit().
   * (Do not use `new Date()` in the template; Angular templates disallow `new`.)
   */
  dob: string = '';
 
  // Keep messages initialized as null but ensure onSubmit sets exactly one
  errorMessage: string | null = null;
  successMessage: string | null = null;
 
  constructor() {}
 
  onSubmit(): void {
    // Reset messages every submit
    this.errorMessage = null;
    this.successMessage = null;
 
    // Move date string to Student as Date|null
    this.student.dateOfBirth = this.dob ? new Date(this.dob) : null;
 
    // Basic validations
    const nameOk = !!this.student.fullName && this.student.fullName.trim().length >= 2;
    // accept null or a valid date instance
    const dobOk = this.student.dateOfBirth === null || this.student.dateOfBirth instanceof Date;
    const contactOk = !!this.student.contactNumber && /^\d{10}$/.test(this.student.contactNumber);
    const emailOk = !!this.student.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.student.email);
    const addrOk = !!this.student.address && this.student.address.trim().length >= 5;
 
    if (!nameOk || !dobOk || !contactOk || !emailOk || !addrOk) {
      // Ensure the error message is definitely non-null/non-empty
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
 
    // Otherwise success — ensure successMessage is definitely non-null/non-empty
    this.successMessage = 'Student created successfully!';
  }
 
  resetForm(): void {
    this.student = new Student();
    this.dob = '';
    this.errorMessage = null;
    this.successMessage = null;
  }
}