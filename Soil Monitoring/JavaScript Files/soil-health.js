document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("soilHealthValue").textContent = "85";

  document.getElementById("moistureLevel").textContent = "45%";
  document.getElementById("nutrientLevels").textContent = "N: 30, P: 20, K: 25";
  document.getElementById("phLevel").textContent = "6.8";
  document.getElementById("temperature").textContent = "22°C";
  document.getElementById("soilType").textContent = "Loamy Soil";
  document.getElementById("organicMatter").textContent = "5%";
  document.getElementById("salinityLevel").textContent = "2.5 dS/m";
  document.getElementById("microbialActivity").textContent = "High";
  document.getElementById("erosionRisk").textContent = "Moderate";
  document.getElementById("stability").textContent = "Stable";

  const ctx = document.getElementById("soilHealthChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      datasets: [
        {
          label: "Soil Health Index",
          data: [70, 75, 80, 78, 85, 90],
          borderColor: "green",
          backgroundColor: "rgba(0, 128, 0, 0.2)",
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  const historicalCtx = document
    .getElementById("historicalTrendsChart")
    .getContext("2d");
  new Chart(historicalCtx, {
    type: "bar",
    data: {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Soil Health Over Years",
          data: [65, 70, 75, 80, 85, 90],
          backgroundColor: "rgba(0, 0, 255, 0.5)",
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  const visualCtx = document
    .getElementById("historicalDataChart")
    .getContext("2d");
  new Chart(visualCtx, {
    type: "pie",
    data: {
      labels: ["Nitrogen", "Phosphorus", "Potassium"],
      datasets: [
        {
          data: [30, 20, 25],
          backgroundColor: ["red", "blue", "green"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
});
