document.addEventListener("DOMContentLoaded", function () {
  const ctx = document
    .getElementById("microbialActivityChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Beneficial Bacteria", "Fungi", "Protozoa", "Harmful Bacteria"],
      datasets: [
        {
          label: "Microbial Activity (%)",
          data: [70, 60, 50, 20],
          backgroundColor: ["#2ecc71", "#3498db", "#9b59b6", "#e74c3c"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });

  document.getElementById("microbialActivityValue").innerText =
    Math.floor(Math.random() * 100) + "%";
});
