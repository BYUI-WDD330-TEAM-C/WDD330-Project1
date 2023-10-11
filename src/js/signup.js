document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    if (authenticateUser(loginEmail, loginPassword)) {
      window.location.href = "index.html";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  });

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const signupName = document.getElementById("signup-name").value;
    const signupEmail = document.getElementById("signup-email").value;
    const signupPassword = document.getElementById("signup-password").value;

    if (
      signupName.trim() === "" ||
      signupEmail.trim() === "" ||
      signupPassword.trim() === ""
    ) {
      alert("Please fill in all fields.");
    } else {
      const userRegistrationData = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      };

      alert("Registration successful!");

      window.location.href = "index.html";
    }
  });

  function authenticateUser(email, password) {
    const users = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    return user !== undefined;
  }
});
