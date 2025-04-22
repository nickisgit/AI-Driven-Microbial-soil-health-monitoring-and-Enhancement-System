document.addEventListener("DOMContentLoaded", function() {
    updateData();
    setInterval(updateData, 5000);
});

// Generate random data
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update all data
function updateData() {
    let soilHealth = getRandomValue(20, 100);
    let microbialActivity = getRandomValue(20, 100);

    document.getElementById("soilHealthValue").innerText = soilHealth;
    document.getElementById("microbialActivityValue").innerText = microbialActivity;

    updateChart(soilHealthChart, soilHealth);
    updateChart(microbialActivityChart, microbialActivity);
    updateComparisonChart(soilHealth, microbialActivity);
    updateRecommendations(soilHealth, microbialActivity);
}

// Update Chart Data
function updateChart(chart, newValue) {
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(newValue);

    if (chart.data.labels.length > 5) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}

// Update Comparison Chart
function updateComparisonChart(soilHealth, microbialActivity) {
    comparisonChart.data.datasets[0].data = [soilHealth, microbialActivity];
    comparisonChart.update();
}

// Update Recommendations
function updateRecommendations(soilHealth, microbialActivity) {
    let recommendationText = document.getElementById("recommendationText");
    
    if (soilHealth < 40) {
        recommendationText.innerText = "Add organic compost to improve soil health.";
    } else if (microbialActivity < 40) {
        recommendationText.innerText = "Increase microbial diversity using biofertilizers.";
    } else {
        recommendationText.innerText = "Soil is healthy. Maintain current practices.";
    }
}

// Apply Nutrients
function applyNutrients() {
    alert("Nutrients added!");
}

// Apply Water
function applyWater() {
    alert("Water added!");
}

// Initialize Charts
let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true }
    }
};

let soilHealthChart = new Chart(document.getElementById("soilHealthChart"), {
    type: "line",
    data: { labels: [], datasets: [{ label: "Soil Health Index", borderColor: "green", data: [], fill: false }] },
    options: chartOptions
});

let microbialActivityChart = new Chart(document.getElementById("microbialActivityChart"), {
    type: "line",
    data: { labels: [], datasets: [{ label: "Microbial Activity", borderColor: "orange", data: [], fill: false }] },
    options: chartOptions
});

let comparisonChart = new Chart(document.getElementById("comparisonChart"), {
    type: "bar",
    data: { labels: ["Soil Health", "Microbial Activity"], datasets: [{ label: "Current Readings", backgroundColor: ["green", "orange"], data: [0, 0] }] },
    options: chartOptions
});
