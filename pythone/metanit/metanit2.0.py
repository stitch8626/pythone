class Employee:
    def do(self):
        print("Employee works")
  
class Student:
    def do(self):
        print("Student studies")
  
  
# class WorkingStudent(Student,Employee):
class WorkingStudent(Employee, Student):
    pass
 
print(WorkingStudent.mro())