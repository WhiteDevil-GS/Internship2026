let students = [];

function addStudent() {

let name = document.getElementById("name").value;
let math = parseInt(document.getElementById("math").value);
let science = parseInt(document.getElementById("science").value);
let english = parseInt(document.getElementById("english").value);

// Validation for marks (0 - 100)
if (math > 100 || science > 100 || english > 100) {
    alert("Marks cannot be greater than 100");
    return;
}

if (math < 0 || science < 0 || english < 0) {
    alert("Marks cannot be negative");
    return;
}

// Create student object
let student = {
    name: name,
    marks: {
        math: math,
        science: science,
        english: english
    }
};

students.push(student);

displayStudents();
clearForm();

}

// Calculate average
function calculateAverage(marks) {

let total = marks.math + marks.science + marks.english;
return total / 3;

}

// Display students with ranking
function displayStudents() {

let table = document.getElementById("studentTable");
table.innerHTML = "";

// Sort students by average (descending)
students.sort((a, b) => calculateAverage(b.marks) - calculateAverage(a.marks));

students.forEach((student, index) => {

let avg = calculateAverage(student.marks).toFixed(2);

let row = `
<tr>
<td>${index + 1}</td>
<td>${student.name}</td>
<td>${student.marks.math}</td>
<td>${student.marks.science}</td>
<td>${student.marks.english}</td>
<td>${avg}</td>
</tr>
`;

table.innerHTML += row;

});

}

function clearForm() {

document.getElementById("name").value = "";
document.getElementById("math").value = "";
document.getElementById("science").value = "";
document.getElementById("english").value = "";

}