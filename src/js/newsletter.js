document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");
  
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value;
      localStorage.setItem("newsletterEmail", email);
      
      alert("Thank you for subscribing to our newsletter!");
  
      emailInput.value = "";
    });
  });
  