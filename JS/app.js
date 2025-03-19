  // Example: Retrieve the username from localStorage after a successful login.
  // In your actual implementation, ensure the username is stored upon login.
  const username = localStorage.getItem('username'); // e.g., localStorage.setItem('username', 'JohnDoe');
  
  if (username) {
    // Change the link text to the username if the user is logged in.
    document.getElementById('userLink').innerText = username;
  }


  document.getElementById("menu-toggle").addEventListener("click", function () {
    var menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
});