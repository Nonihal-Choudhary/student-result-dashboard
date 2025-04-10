// Sample Student Data
const students = [
    { roll: 1, name: "Amit", maths: 85, science: 90, english: 80 },
    { roll: 2, name: "Sneha", maths: 78, science: 88, english: 92 },
    { roll: 3, name: "Rahul", maths: 65, science: 70, english: 75 },
    { roll: 4, name: "Pooja", maths: 95, science: 89, english: 91 },
    { roll: 5, name: "Ankit", maths: 50, science: 60, english: 55 },
  ];
  
  document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();
    renderTable(keyword);
  });
  
  // 📋 Function to calculate grade
  function calculateGrade(percentage) {
    if (percentage >= 90) return "A+";
    else if (percentage >= 80) return "A";
    else if (percentage >= 70) return "B";
    else if (percentage >= 60) return "C";
    else if (percentage >= 50) return "D";
    else return "F";
  }
  
  // 🧾 Render table based on data
  function renderTable(keyword = "") {
    const tbody = document.getElementById("student-table-body");
    tbody.innerHTML = "";
  
    students
      .filter((student) => {
        const nameMatch = student.name.toLowerCase().includes(keyword);
        const rollMatch = student.roll.toString().includes(keyword);
        return nameMatch || rollMatch;
      })
      .forEach((student) => {
        const total = student.maths + student.science + student.english;
        const percentage = (total / 3).toFixed(2);
        const grade = calculateGrade(percentage);
  
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.roll}</td>
          <td>${student.name}</td>
          <td>${student.maths}</td>
          <td>${student.science}</td>
          <td>${student.english}</td>
          <td>${total}</td>
          <td>${percentage}%</td>
          <td>${grade}</td>
        `;
        tbody.appendChild(row);
      });
  }
  
  // 📊 Chart for subject-wise average marks
  function renderChart() {
    const totalStudents = students.length;
  
    let totalMaths = 0,
      totalScience = 0,
      totalEnglish = 0;
  
    students.forEach((student) => {
      totalMaths += student.maths;
      totalScience += student.science;
      totalEnglish += student.english;
    });
  
    const avgMaths = (totalMaths / totalStudents).toFixed(2);
    const avgScience = (totalScience / totalStudents).toFixed(2);
    const avgEnglish = (totalEnglish / totalStudents).toFixed(2);
  
    const ctx = document.getElementById("marksChart").getContext("2d");
  
    // Destroy previous chart if it exists
    if (window.myChart) {
      window.myChart.destroy();
    }
  
    // Draw new chart
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Maths", "Science", "English"],
        datasets: [
          {
            label: "Average Marks",
            data: [avgMaths, avgScience, avgEnglish],
            backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }
  
  // ✅ Add New Student via Form
  document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload
  
    const roll = parseInt(document.getElementById("rollInput").value);
    const name = document.getElementById("nameInput").value;
    const maths = parseInt(document.getElementById("mathsInput").value);
    const science = parseInt(document.getElementById("scienceInput").value);
    const english = parseInt(document.getElementById("englishInput").value);
  
    // Push to students array
    students.push({ roll, name, maths, science, english });
  
    // Refresh table and chart
    renderTable(document.getElementById("searchInput").value);
    renderChart();
  
    // Clear input fields
    document.getElementById("studentForm").reset();
  
    // ✅ Show toast after successful submission
    showToast("✅ Student added successfully!");
  });
  
  // 🔁 Initial render
  renderTable();
  renderChart();
  
  // 📥 Download table data as CSV
  document.getElementById("downloadCSVBtn").addEventListener("click", function () {
    let csvContent = "Roll,Name,Maths,Science,English,Total,Percentage,Grade\n";
  
    students.forEach(student => {
      const total = student.maths + student.science + student.english;
      const percentage = (total / 3).toFixed(2);
      const grade = calculateGrade(percentage);
  
      const row = `${student.roll},${student.name},${student.maths},${student.science},${student.english},${total},${percentage}%,${grade}`;
      csvContent += row + "\n";
    });
  
    // CSV file creation
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "student_results.csv");
    link.click();
  });
  
  // 🔔 Toast message function
  function showToast(message, color = "#2ecc71") {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.backgroundColor = color;
    toast.className = "show";
  
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }
  