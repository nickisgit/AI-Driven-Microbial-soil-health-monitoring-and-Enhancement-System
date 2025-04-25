document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.getElementById("postButton");
  const commentInput = document.getElementById("commentInput");
  const userNameInput = document.getElementById("userName");
  const commentsSection = document.getElementById("commentsSection");
  const clock = document.getElementById("clock");

  postButton.addEventListener("click", () => {
    const comment = commentInput.value.trim();
    const user = userNameInput.value.trim() || "Anonymous";

    if (comment) {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      const now = new Date().toLocaleString();
      commentDiv.innerHTML = `<strong>${user}</strong> (${now}):<br>${comment}`;
      commentsSection.prepend(commentDiv);
      commentInput.value = "";
    }
  });

  function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }

  setInterval(updateClock, 1000);
  updateClock(); // Initial run
});
