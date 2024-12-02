package org.example.managerstudent.service;

import org.example.managerstudent.entity.Student;
import org.example.managerstudent.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentByid(Long id) {
        return studentRepository.findAllById(id);
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setFullName(updatedStudent.getFullName());
                    student.setStudentCode(updatedStudent.getStudentCode());
                    student.setMarks(updatedStudent.getMarks());
                    student.setRanking(updatedStudent.getRanking());
                    return studentRepository.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
