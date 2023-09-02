document.addEventListener("DOMContentLoaded", function () {
  const regions = document.querySelectorAll(".region");
  const paintBlueButton = document.getElementById("paint-blue-button");
  const paintYellowButton = document.getElementById("paint-yellow-button");
  let currentColor = "lightgray";
  const regionNameElement = document.getElementById("region-name");
  const resetButtonElement = document.getElementById("reset-button");
  const paintRegionsButton = document.getElementById("paint-regions-button");
  const randomButton = document.getElementById("random-button");

  function paintRegion(region) {
    regions.forEach((r) => r.classList.remove("selected"));

    region.classList.add("selected");

    region.style.fill = currentColor;
    region.style.fillOpacity = 1;

    const regionName = region.getAttribute("data-region-name");
    regionNameElement.textContent = regionName;
  }

  paintBlueButton.addEventListener("click", function () {
    currentColor = "#0056B9";
  });

  paintYellowButton.addEventListener("click", function () {
    currentColor = "#FFD800";
  });

  regions.forEach((region) => {
    region.addEventListener("click", function () {
      paintRegion(region);
    });
  });

  function resetRegions() {
    regions.forEach((region) => {
      region.classList.remove("selected");
      region.style.fill = "lightgray";
      region.style.fillOpacity = 1;
    });
    regionNameElement.style.display = "none";
  }

  paintRegionsButton.addEventListener("click", function () {
    regions.forEach((region) => {
      const paintColor = region.getAttribute("data-paint-color");
  
      if (paintColor === "blue") {
        region.style.fill = "#0056B9";
      } else if (paintColor === "yellow") {
        region.style.fill = "#FFD800";
      }
    });
  });

  randomButton.addEventListener("click", function () {
    regions.forEach((region) => {
      const randomColor = Math.random() < 0.5 ? "#0056B9" : "#FFD800";
  
      region.style.fill = randomColor;
    });
  });

  resetButtonElement.addEventListener("click", resetRegions);

  regions.forEach((region) => {
    region.addEventListener("mouseenter", function () {
      const regionName = region.getAttribute("data-region-name");
      regionNameElement.textContent = regionName;
      regionNameElement.style.display = "block";
    });

    region.addEventListener("mouseleave", function () {
      regionNameElement.style.display = "none";
    });
  });

  const toggleModeButton = document.getElementById("toggle-mode-button");

  toggleModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
