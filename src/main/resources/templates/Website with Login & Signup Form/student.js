// API base URL
const API_URL = 'http://localhost:8080/api/students';

// Utility function to fetch all students and update the table
function fetchStudents() {
    fetch(API_URL)
        .then(response => response.json())
        .then(students => {
            const tableBody = document.querySelector('#studentsTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.fullName}</td>
                    <td>${student.studentCode}</td>
                    <td>${student.marks}</td>
                    <td>${student.ranking}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching students:', error));
}

// Handle add student
document.getElementById('addStudentButton').addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const studentCode = document.getElementById('studentCode').value;
    const marks = document.getElementById('marks').value;
    const ranking = document.getElementById('ranking').value;

    const studentData = { fullName, studentCode, marks, ranking };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
        .then(response => response.json())
        .then(() => {
            fetchStudents(); // Refresh the student list after adding
            alert('Student added successfully!');
        })
        .catch(error => console.error('Error adding student:', error));
});

// Handle update student
document.getElementById('updateStudentButton').addEventListener('click', () => {
    const id = document.getElementById('searchId').value;
    if (!id) {
        alert('Please enter the Student ID to update');
        return;
    }

    const fullName = document.getElementById('fullName').value;
    const studentCode = document.getElementById('studentCode').value;
    const marks = document.getElementById('marks').value;
    const ranking = document.getElementById('ranking').value;

    const studentData = { fullName, studentCode, marks, ranking };

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
        .then(response => response.json())
        .then(() => {
            fetchStudents(); // Refresh the student list after updating
            alert('Student updated successfully!');
        })
        .catch(error => console.error('Error updating student:', error));
});

// Handle delete student
document.getElementById('deleteStudentButton').addEventListener('click', () => {
    const id = document.getElementById('searchId').value;
    if (!id) {
        alert('Please enter the Student ID to delete');
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            fetchStudents(); // Refresh the student list after deletion
            alert('Student deleted successfully!');
        })
        .catch(error => console.error('Error deleting student:', error));
});

// Handle search by ID
document.getElementById('searchByIdButton').addEventListener('click', () => {
    const id = document.getElementById('searchId').value;
    if (!id) {
        alert('Please enter the Student ID to search');
        return;
    }

    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(student => {
            const tableBody = document.querySelector('#studentsTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.studentCode}</td>
                <td>${student.marks}</td>
                <td>${student.ranking}</td>
            `;
            tableBody.appendChild(row);
        })
        .catch(error => {
            console.error('Error searching student by ID:', error);
            alert('Student not found.');
        });
});

// Initial fetch of students when the page loads
document.addEventListener('DOMContentLoaded', fetchStudents);
