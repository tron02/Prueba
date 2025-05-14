const students = [];

const form = document.getElementById("studentForm");
const promedioDiv = document.getElementById("average");
const tableBody = document.querySelector("#studentsTable tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener valores
  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const date = document.getElementById("date").value.trim();
  const gradeValue = document.getElementById("grade").value.trim();
  const grade = parseFloat(gradeValue);

  // Limpiar errores
  clearErrors();

  let hasError = false;

  if (!name) {
    showError("errorName", "El nombre es obligatorio.");
    hasError = true;
  }

  if (!lastName) {
    showError("errorLastName", "El apellido es obligatorio.");
    hasError = true;
  }

  if (!date) {
    showError("errorDate", "La fecha es obligatoria.");
    hasError = true;
  }

  if (!gradeValue || isNaN(grade) || grade < 1 || grade > 7) {
    showError("errorGrade", "La nota debe estar entre 1.0 y 7.0.");
    hasError = true;
  }

  if (hasError) return;

  const student = { name, lastName, date, grade };
  students.push(student);
  addStudentToTable(student);
  actualizarPromedio();
  form.reset();
});

function addStudentToTable(student) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.date}</td>
    <td>${student.grade.toFixed(1)}</td>
  `;
  tableBody.appendChild(row);
}

function actualizarPromedio() {
  const total = students.reduce((sum, student) => sum + student.grade, 0);
  const promedio = (total / students.length).toFixed(2);
  promedioDiv.textContent = `Promedio General del curso: ${promedio}`;
}

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((e) => (e.textContent = ""));
}
