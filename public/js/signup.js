$(document).ready(function() {
  // Getting references to our form and input
  var signupBtn = $("#signup-btn");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var title = $("#title-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signupBtn.on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      title: title.val().trim()
    };
    console.log(userData);

    if (!userData.email || !userData.password || !userData.title) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.title);
    emailInput.val("");
    passwordInput.val("");
    title.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, title) {
    $.post("/api/signup", {
      email: email,
      password: password,
      title: title
    })
      .then(function(data) {
        let id = data.id;
        window.location.replace(`/dashboard/${id}`);
        console.log(data)
        // If there's an error, handle it by throwing up a bootstrap alert
      })
     
      .catch(handleLoginErr);
  }

  // $.post("/api/login", {
  //   email: email,
  //   password: password
  // })
  //   .then(function(res) {
  //     let id = res.id;
  //     window.location.replace(`/dashboard/${id}`);
  //     // If there's an error, log the error
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
