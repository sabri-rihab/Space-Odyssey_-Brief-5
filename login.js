async function CheckLogIn() {
  try {
    const res = await fetch("./users.json");
    const users = await res.json();

    const emailInput = document.getElementById("email_input");
    const passwordInput = document.getElementById("password_input");
    const loginBtn = document.querySelector("#loginBtn");
    const welcome = document.querySelector(".welcome");
    const state = document.getElementById("loginState");
    const booking = document.querySelector("#booking");

    // Check current user on page load
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.login === "true") {
      if (state) state.textContent = "Logout";
      if (welcome) welcome.textContent = `Welcome, ${currentUser.name}!`;
    }

    // check if login before accessing booking

    // Login logic
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const user = users.find(
          (user) =>
            user.id === emailInput.value &&
            user.password === passwordInput.value
        );

        if (!user) {
          document.querySelector(".errorLogin").innerHTML =
            "Invalid email or password. Please try again.";
          passwordInput.value = "";
        } else {
          user.login = "true";
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.href = "index.html";
        }
      });
    }
    state.addEventListener("click", (e) => {
      if (state.textContent === "Logout") {
        if (window.confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("currentUser");
          state.textContent = "Login";
        } else {
          e.preventDefault();
        }
      }
    });
    console.log(currentUser);


  if (booking) {
      booking.addEventListener("click", (e) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        // Check if user exists AND is logged in
        if (!currentUser || currentUser.login !== "true") {
          e.preventDefault();
          alert("You must log in first to make a reservation.");
          window.location.href = "login.html";
          return false; // Prevent navigation
        }
        // If user is logged in, allow the click to proceed naturally
      });
    } else {
      console.log("Booking element not found");
    }
  } catch (error) {
    console.error("Error loading users", error);
  }
}
CheckLogIn();
