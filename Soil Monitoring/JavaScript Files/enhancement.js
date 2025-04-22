const ctx = document.getElementById("soilEnhancementChart").getContext("2d");

const soilHealthChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["pH", "Moisture", "Nutrients", "Microbes"],
    datasets: [
      {
        label: "Soil Health Levels",
        data: [6.5, 45, 80, 60],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"],
        borderColor: "#333",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

window.applyNutrients = function () {
  let nutrientValue = parseInt(document.getElementById("nutrientInput").value);
  if (!isNaN(nutrientValue) && nutrientValue >= 0) {
    soilData.datasets[0].data[0] = Math.min(100, nutrientValue);
    soilChart.update();
  }
};

window.applyWater = function () {
  let waterValue = parseInt(document.getElementById("waterInput").value);
  if (!isNaN(waterValue) && waterValue >= 0) {
    soilData.datasets[0].data[1] = Math.min(100, waterValue);
    soilChart.update();
  }
};

window.updatePH = function () {
  let phValue = parseFloat(document.getElementById("phInput").value);
  document.getElementById("phValue").innerText = phValue.toFixed(1);
};

window.applyPH = function () {
  let phValue = parseFloat(document.getElementById("phInput").value);
  soilData.datasets[0].data[2] = phValue;
  soilChart.update();
};
