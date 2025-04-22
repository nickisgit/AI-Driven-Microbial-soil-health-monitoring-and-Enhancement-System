const timePeriodDropdown = document.getElementById("timePeriod");

let labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
let phLevels = [6.5, 6.8, 6.4, 6.7, 6.9, 7.0, 6.6];
let moistureLevels = [40, 42, 38, 45, 47, 43, 41];
let nitrogen = [50, 52, 48, 55, 57, 53, 51];
let phosphorus = [30, 32, 28, 35, 37, 33, 31];
let potassium = [20, 22, 18, 25, 27, 23, 21];
let temperature = [25, 26, 24, 27, 28, 25, 26];
let humidity = [60, 62, 58, 65, 67, 63, 61];

// Initialize Charts
const ctx1 = document.getElementById("comparisonChart").getContext("2d");
const ctx2 = document.getElementById("npkChart").getContext("2d");
const ctx3 = document.getElementById("tempHumidityChart").getContext("2d");

let comparisonChart = new Chart(ctx1, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "pH Levels",
        data: phLevels,
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Moisture (%)",
        data: moistureLevels,
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderWidth: 2,
      },
    ],
  },
  options: { responsive: true, maintainAspectRatio: false },
});

let npkChart = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      { label: "Nitrogen", data: nitrogen, backgroundColor: "#2ecc71" },
      { label: "Phosphorus", data: phosphorus, backgroundColor: "#f1c40f" },
      { label: "Potassium", data: potassium, backgroundColor: "#e67e22" },
    ],
  },
  options: { responsive: true, maintainAspectRatio: false },
});

let tempHumidityChart = new Chart(ctx3, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperature,
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Humidity (%)",
        data: humidity,
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderWidth: 2,
      },
    ],
  },
  options: { responsive: true, maintainAspectRatio: false },
});

function updateComparisonCharts() {
  let selectedPeriod = timePeriodDropdown.value;

  if (selectedPeriod == "30") {
    labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  } else if (selectedPeriod == "90") {
    labels = ["Month 1", "Month 2", "Month 3"];
  }

  comparisonChart.data.labels = labels;
  npkChart.data.labels = labels;
  tempHumidityChart.data.labels = labels;

  comparisonChart.update();
  npkChart.update();
  tempHumidityChart.update();
}
