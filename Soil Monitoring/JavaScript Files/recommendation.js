document.addEventListener("DOMContentLoaded", function() {
  // Random Recommendations
  const recommendations = [
      "Use compost and organic matter to enrich soil fertility.",
      "Maintain a balanced pH level between 6.0 - 7.0 for optimal plant growth.",
      "Avoid over-fertilization to prevent nutrient runoff and soil degradation.",
      "Rotate crops regularly to prevent soil depletion.",
      "Use mulch to retain soil moisture and reduce weeds.",
      "Encourage earthworms and microbial activity for better soil aeration."
  ];
  
  document.getElementById("recommendationText").innerText = 
      recommendations[Math.floor(Math.random() * recommendations.length)];

  const ctx = document.getElementById('soilChart').getContext('2d');
  
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Organic Matter', 'Microbial Activity'],
          datasets: [{
              label: 'Soil Nutrient Levels (%)',
              data: [80, 60, 70, 50, 65], // Sample Data
              backgroundColor: ['#27ae60', '#2980b9', '#f39c12', '#8e44ad', '#e74c3c']
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100
              }
          }
      }
  });
});
