document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.getElementById("postButton");
  const commentInput = document.getElementById("commentInput");
  const discussionBox = document.getElementById("discussionBox");

  postButton.addEventListener("click", function () {
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
      const newComment = document.createElement("p");
      newComment.textContent = commentText;
      newComment.classList.add("fade-in-comment");

      discussionBox.appendChild(newComment);
      commentInput.value = "";

      discussionBox.scrollTop = discussionBox.scrollHeight;
    }
  });
});
