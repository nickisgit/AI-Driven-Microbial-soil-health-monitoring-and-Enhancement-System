document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.fade-in').forEach(el => {
      setTimeout(() => { el.style.opacity = 1; }, 500);
  });

  document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', function() {
          this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
      });
  });

  document.querySelectorAll('.counter').forEach(counter => {
      let count = 0;
      let target = +counter.getAttribute('data-count');
      let interval = setInterval(() => {
          if(count < target) {
              count++;
              counter.innerText = count;
          } else {
              clearInterval(interval);
          }
      }, 10);
  });
});