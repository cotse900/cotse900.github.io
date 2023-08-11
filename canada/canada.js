document.addEventListener("DOMContentLoaded", function () {
  let totalMarks = 0;
  const provinces = document.querySelectorAll("svg .province");
  const totalMarksElement = document.getElementById("total-marks");
  const toggleModeButton = document.getElementById("toggle-mode-button");
  const toggleLanguageButton = document.getElementById(
    "toggle-language-button",
  );

  function updateTotalMarksDisplay() {
    totalMarksElement.textContent = totalMarks;
  }

  function updateFillColor(province, dataLevel) {
    province.style.fill = getFillColorByDataLevel(dataLevel);
  }

  provinces.forEach((province) => {
    province.setAttribute("data-marks", "0");

    province.addEventListener("click", function () {
      const dataLevelSelect = document.getElementById("data-level-select");
      const selectedDataLevel = dataLevelSelect.value;
      const currentMarks = parseInt(this.getAttribute("data-marks"));

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

      totalMarks =
        totalMarks - currentMarks + parseInt(this.getAttribute("data-marks"));
      updateFillColor(province, selectedDataLevel);
      this.toggleAttribute("data-clicked");
      updateTotalMarksDisplay();
    });
  });

  function updateLanguage(lang) {
    const elementsWithLangAttribute = document.querySelectorAll(
      "[data-lang-en], [data-lang-fr], [data-lang-zh]",
    );
    elementsWithLangAttribute.forEach((element) => {
      const key =
        element.getAttribute(`data-lang-${lang}`) ||
        element.getAttribute("data-lang-en");
      element.textContent = key;
    });
  }

  toggleLanguageButton.addEventListener("click", function () {
    const currentLanguage = document.documentElement.lang || "zh";
    const languages = ["en", "fr", "zh"];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    document.documentElement.lang = nextLanguage;
    updateLanguage(nextLanguage);
  });

  function getFillColorByDataLevel(dataLevel) {
    switch (dataLevel) {
      case "data_level_3":
        return "green";
      case "data_level_2":
        return "yellow";
      case "data_level_1":
        return "orange";
      case "data_level_0":
      default:
        return "#fefee9";
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  toggleModeButton.addEventListener("click", function () {
    toggleDarkMode();
    updateLanguage(document.documentElement.lang);
  });

  const initialLanguage = document.documentElement.lang;
  if (initialLanguage) {
    updateLanguage(initialLanguage);
  }
});
