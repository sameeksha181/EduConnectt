
// ============================================================================
// File: src/app/educonnect/educonnect.module.ts
// (If you’ve already imported ReactiveFormsModule earlier, keep as-is;
// just ensure EnrollmentComponent is declared.)
// ============================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Existing components
import { StudentCreateComponent } from './components/studentcreate/studentcreate.component';
import { TeacherArrayComponent } from './components/teacherarray/teacherarray.component';
import { TeacherCreateComponent } from './components/teachercreate/teachercreate.component';
import { CourseCreateComponent } from './components/coursecreate/coursecreate.component';

// New Day-20 component
import { EnrollmentComponent } from './components/enrollment/enrollment.component';

@NgModule({
  declarations: [
    StudentCreateComponent,
    TeacherArrayComponent,
    TeacherCreateComponent,
    CourseCreateComponent,
    EnrollmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EduconnectModule {}
