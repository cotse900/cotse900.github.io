document.addEventListener("DOMContentLoaded", function () {
  // Define a variable to keep track of the total marks
  let totalMarks = 0;
  // Get all the province groups with the class "province" inside the SVG
  const provinces = document.querySelectorAll("svg .province");

  provinces.forEach((province) => {
    // Initialize custom attribute to store the number of marks for each province
    province.setAttribute("data-marks", "0");

    province.addEventListener("click", function () {
      const dataLevelSelect = document.getElementById("data-level-select");
      const selectedDataLevel = dataLevelSelect.value;

      // Get the current marks for this province
      const currentMarks = parseInt(this.getAttribute("data-marks"));

      // Set the data-marks attribute based on the selected data level
      switch (selectedDataLevel) {
        case "data_level_3":
          this.setAttribute("data-marks", "3");
          break;
        case "data_level_2":
          this.setAttribute("data-marks", "2");
          break;
        case "data_level_1":
          this.setAttribute("data-marks", "1");
          break;
        default:
          this.setAttribute("data-marks", "0");
          break;
      }

      // Update the total marks by subtracting the previous marks and adding the new marks
      totalMarks =
        totalMarks - currentMarks + parseInt(this.getAttribute("data-marks"));

      // Update the province's fill color based on the selected data level
      this.style.fill = getFillColorByDataLevel(selectedDataLevel);

      // Toggle the data-clicked attribute
      if (this.getAttribute("data-clicked") === "true") {
        this.removeAttribute("data-clicked");
      } else {
        this.setAttribute("data-clicked", "true");
      }

      updateTotalMarksDisplay();
    });
  });

  function updateTotalMarksDisplay() {
    const totalMarksElement = document.getElementById("total-marks");
    totalMarksElement.textContent = `Total Marks: ${totalMarks}`;
  }

  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", function () {
    // Set all provinces' marks to 0
    provinces.forEach((province) => {
      province.setAttribute("data-marks", "0");
      province.style.fill = "#fefee9"; // Reset the fill color to default
      province.removeAttribute("data-clicked");
      province.removeAttribute("data-level");
    });

    // Reset the total marks to 0
    totalMarks = 0;

    // Update the total marks display
    updateTotalMarksDisplay();
  });
});

// Function to get the fill color based on data level
function getFillColorByDataLevel(dataLevel) {
  // Replace this switch statement with the appropriate color logic based on data level
  switch (dataLevel) {
    case "data_level_3":
      return "green";
    case "data_level_2":
      return "yellow";
    case "data_level_1":
      return "orange";
    case "data_level_0":
      return "#fefee9";
    default:
      return "#fefee9";
  }
}

// Function to toggle between light and dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Toggle the button text based on the current mode
  const toggleModeButton = document.getElementById("toggle-mode-button");
  if (body.classList.contains("dark-mode")) {
    toggleModeButton.textContent = "Light";
  } else {
    toggleModeButton.textContent = "Dark";
  }
}

// Add event listener to the button
const toggleModeButton = document.getElementById("toggle-mode-button");
toggleModeButton.addEventListener("click", toggleDarkMode);
