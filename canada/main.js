document.addEventListener("DOMContentLoaded", function() {
    // Define a variable to keep track of the total marks
    let totalMarks = 0;
    // Get all the province groups with the class "province" inside the SVG
    const provinces = document.querySelectorAll("svg .province");
  
    // Add click event listeners to each province group
    provinces.forEach(province => {
      province.addEventListener("click", function() {
        const dataLevelSelect = document.getElementById("data-level-select");
        const selectedDataLevel = dataLevelSelect.value;
  
        if (this.getAttribute("data-clicked") === "true") {
            // If the province was previously clicked, subtract marks
            switch (selectedDataLevel) {
              case "data_level_3":
                totalMarks -= 3;
                break;
              case "data_level_2":
                totalMarks -= 2;
                break;
              case "data_level_1":
                totalMarks -= 1;
                break;
              default:
                break;
            }
        
            this.style.fill = "#fefee9";
            this.removeAttribute("data-clicked");
        }
        else {
            // If the province was not previously clicked, add marks
            switch (selectedDataLevel) {
              case "data_level_3":
                totalMarks += 3;
                break;
              case "data_level_2":
                totalMarks += 2;
                break;
              case "data_level_1":
                totalMarks += 1;
                break;
              default:
                break;
            }
        
            this.style.fill = getFillColorByDataLevel(selectedDataLevel);
            this.setAttribute("data-clicked", "true");
        }
        updateTotalMarksDisplay();
      });
  
      // Add hover effect
      province.addEventListener("mouseenter", function() {
        const dataLevelSelect = document.getElementById("data-level-select");
        const selectedDataLevel = dataLevelSelect.value;
        if (this.getAttribute("data-clicked") !== "true") {
          this.style.fill = getFillColorByDataLevel(selectedDataLevel);
        }
      });
  
      province.addEventListener("mouseleave", function() {
        if (this.getAttribute("data-clicked") !== "true") {
          this.style.fill = "#fefee9"; // Revert to the original fill color on mouse leave (optional)
        }
      });
    });

    function updateTotalMarksDisplay() {
        const totalMarksElement = document.getElementById("total-marks");
        totalMarksElement.textContent = `Total Marks: ${totalMarks}`;
      }
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
  