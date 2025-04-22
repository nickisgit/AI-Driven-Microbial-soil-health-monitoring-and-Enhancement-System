document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Your message has been sent! We will get back to you soon.");
    });

  document.querySelector(".chat-button").addEventListener("click", function () {
    alert("Live chat feature is coming soon!");
  });
});
