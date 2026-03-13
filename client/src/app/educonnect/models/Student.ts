export class Student {
  constructor(
    public studentId: number = 0,
    public fullName: string = '',
    public dateOfBirth: Date | null = null,
    public contactNumber: string = '',
    public email: string = '',
    public address: string = ''
  ) {}
}
 
export class Teacher {
  constructor(
    public teacherId: number,
    public fullName: string,
    public contactNumber: string,
    public email: string,
    public subject: string,
    public yearsOfExperience: number
  ) {}
}