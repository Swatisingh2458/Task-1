document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const fields = document.querySelectorAll("input[required]");
    let isValid = true;

    fields.forEach((field) => {
      const errorMessage = field.nextElementSibling;
      if (!field.value.trim()) {
        field.classList.add("error");

        if (
          !errorMessage ||
          !errorMessage.classList.contains("error-message")
        ) {
          const errorSpan = document.createElement("span");
          errorSpan.classList.add("error-message");
          errorSpan.textContent = "Field Required";
          field.parentNode.appendChild(errorSpan);
        }

        isValid = false;
      } else {
        field.classList.remove("error");

        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.remove();
        }
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields!");

      fields.forEach((field) => {
        if (!field.value.trim()) {
          field.focus();
          return;
        }
      });
      return;
    }

    const formContainer = document.querySelector(".container");
    const modal = document.getElementById("success-modal");
    const closeButton = modal.querySelector(".close-button");

    formContainer.style.display = "none";

    modal.classList.add("active");

    closeButton.addEventListener("click", function () {
      modal.classList.remove("active");
      closeButton.removeEventListener("click", arguments.callee);
      window.removeEventListener("click", closeModal);
    });

    function closeModal(event) {
      if (event.target === modal) {
        modal.classList.remove("active");
        window.removeEventListener("click", closeModal);
      }
    }
    window.addEventListener("click", closeModal);
  });
