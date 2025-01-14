document
  .getElementById("submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const fields = document.querySelectorAll("input[required]");
    let isValid = true;

    document.querySelectorAll(".status-section").forEach((section) => {
      section.classList.remove("highlight-error");
      const errorMessage = section.querySelector(".status-error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    });

    fields.forEach((field) => {
      const errorMessage = field.nextElementSibling;

      if (field.name.startsWith("status")) {
        const row = field.closest("tr");
        const statusSection = row.querySelector("td:nth-child(4)");

        if (!document.querySelector(`input[name="${field.name}"]:checked`)) {
          // Highlight the status column of this specific row
          if (statusSection) {
            statusSection.classList.add("highlight-error");
          }

          if (!statusSection.querySelector(".status-error-message")) {
            const statusErrorMessage = document.createElement("span");
            statusErrorMessage.classList.add(
              "error-message",
              "status-error-message"
            );
            statusErrorMessage.textContent = "Please select a status";
            statusSection.appendChild(statusErrorMessage);
          }

          isValid = false;
        } else {
          if (statusSection) {
            statusSection.classList.remove("highlight-error");
            const statusErrorMessage = statusSection.querySelector(
              ".status-error-message"
            );
            if (statusErrorMessage) {
              statusErrorMessage.remove();
            }
          }
        }
      } else if (!field.value.trim() && !field.checked) {
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
        if (!field.value.trim() && !field.checked) {
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
