document.addEventListener("DOMContentLoaded", function () {
  // Define a variable to keep track of the total marks
  let totalMarks = 0;
  const districts = document.querySelectorAll("svg .district");

  districts.forEach((district) => {
    // Initialize custom attribute to store the number of marks for each district
    district.setAttribute("data-marks", "0");

    district.addEventListener("click", function () {
      const dataLevelSelect = document.getElementById("data-level-select");
      const selectedDataLevel = dataLevelSelect.value;

      // Get the current marks for this district
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

      // Update the district's fill color based on the selected data level
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
    totalMarksElement.textContent = `總分：${totalMarks}/54`;
  }

  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", function () {
    // Set all districts' marks to 0
    districts.forEach((district) => {
      district.setAttribute("data-marks", "0");
      district.style.fill = "#fefee9"; // Reset the fill color to default
      district.removeAttribute("data-clicked");
      district.removeAttribute("data-level");
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
      return "#03406D";
    case "data_level_2":
      return "#196F92";
    case "data_level_1":
      return "#69B3BB";
    case "data_level_0":
      return "#lightblue";
    default:
      return "#lightblue";
  }
}

// Function to toggle between light and dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Toggle the button text based on the current mode
  const toggleModeButton = document.getElementById("toggle-mode-button");
  if (body.classList.contains("dark-mode")) {
    toggleModeButton.textContent = "光";
  } else {
    toggleModeButton.textContent = "暗";
  }
}

// Add event listener to the button
const toggleModeButton = document.getElementById("toggle-mode-button");
toggleModeButton.addEventListener("click", toggleDarkMode);
