const pages = {};

pages.base_url = 'http://127.0.0.1:8000/api/'

// Log-PAGE
pages.logPageFunctions = () => {
  pages.signupPage();
  pages.signup();
  pages.signin();
  pages.showPassword()
}

// MAIN-PAGE
pages.mainPageFunctions = () => {
  pages.headerFuctions();
  pages.cardFuctions();
}

pages.signupPage = () => {
  const signup_btn = document.getElementById("signup-page");
  signup_btn.addEventListener("click", function(e){
    e.preventDefault()
    document.getElementById("signin-form").style.display = "none"
    document.getElementById("signup-form").style.display = "flex"
  })

}

pages.signup = () => {
  const signup_btn = document.getElementById("signup-btn");
  signup_btn.addEventListener("click", function(e){
    e.preventDefault();

    const first_name_val = document.getElementById("first-name-input").value;
    const last_name_val = document.getElementById("last-name-input").value;
    const email_val = document.getElementById("email-input").value;
    const password_val = document.getElementById("password-input").value;
    const ver_password_val = document.getElementById("ver-pass-input").value;

    if (
      password_val == ver_password_val &&
      first_name_val &&
      last_name_val &&
      email_val &&
      password_val &&
      ver_password_val
    ) {
      const signup_data = new FormData();
      signup_data.append("first_name", first_name_val);
      signup_data.append("last_name", last_name_val);
      signup_data.append("email", email_val);
      signup_data.append("password", password_val);

      fetch(pages.base_url + "signup", {
        method: "POST",
        body: signup_data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "Customer registered successfully") {
            window.location.href = "main-page.html";
            console.log("signup")
          }else{console.log(data.message)}
        })
        .catch((error) => console.log(error));
    }else{console.log("Missing input")}
  })
}

pages.signin = () => {
  const signin_btn = document.getElementById("signin");

  signin_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    const pass_data = new FormData();
    pass_data.append("email",email);
    pass_data.append("password", password);

    fetch(pages.base_url + "signin", {
      method: "POST",
      body: pass_data,
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.status == "logged in") {
            localStorage.setItem("first_name", data.user.first_name);
            localStorage.setItem("last_name", data.user.last_name);
            localStorage.setItem("user_id", data.user.id_customer);
            if(data.role == "admin"){
              window.location.href = "admin.html"
            }else{
              window.location.href = "main-page.html"
            }
          }
        })
        .catch((error) => console.log("Error In Email API: ", error))
  })
}

pages.showPassword = () => {
  const password = document.getElementById("signin-password")
  const showPasswordCheckbox = document.getElementById("showPassword");
  showPasswordCheckbox.addEventListener("change", function () {
    if (showPasswordCheckbox.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
}

pages.headerFuctions = () => {
    pages.showFilter();
    pages.applyFilter();
    pages.userInfo();
    pages.showCart();
}

pages.cardFuctions = () => {
  pages.likeProduct();
}

pages.showFilter = () => {
    document.getElementById("filter-button").addEventListener("click", function() {
    const filterWindow = document.getElementById("filter-window");
    if (filterWindow.style.display === "none") {
      filterWindow.style.display = "flex";
    } else {
      filterWindow.style.display = "none";
    }
  })
};

pages.applyFilter = () => {
  document.getElementById("apply-filter-button").addEventListener("click", function() {

    let selectedCategory = document.getElementById("category-select").value;
    console.log("Selected category: " + selectedCategory);
    let filterWindow = document.getElementById("filter-window");
    filterWindow.style.display = "none";
  })
};

pages.userInfo = () => {
    const userInfoTab = document.querySelector('.user-info-tab');
    if (userInfoTab.style.display === 'none') {
      userInfoTab.style.display = 'block';
      pages.displayUserInfo();
    } else {
      userInfoTab.style.display = 'none';
    }
};

pages.displayUserInfo = () => {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const email = localStorage.getItem("email");
  
  
    const fullNameElement = document.getElementById("full-name-disp");
    const emailElement = document.getElementById("email-disp");
  
    fullNameElement.textContent = `${firstName} ${lastName}`; 
    emailElement.textContent = `Email: ${email}`;
};

pages.logOut = () => {
    localStorage.clear();
    window.location.href = "index.html";
};

pages.showCart = () => {
  document.getElementById("cart-icon").addEventListener("click" , function(){
    document.getElementById("product-cards-container").style.display = "none";
    document.getElementById("cart-cards-container").style.display = "flex";
  })
}

pages.likeProduct = () => {
  let liked = document.getElementById("like-icon");
  let unliked = document.getElementById("unlike-icon");
  
  let likedDisplay = window.getComputedStyle(liked).display;
  let unlikedDisplay = window.getComputedStyle(unliked).display;

  if (likedDisplay === "block" && unlikedDisplay === "none") {
    liked.style.display = "none";
    unliked.style.display = "block";
  } else {
    liked.style.display = "block";
    unliked.style.display = "none";
  }
};
