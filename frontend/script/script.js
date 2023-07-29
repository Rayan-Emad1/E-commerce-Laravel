const pages = {};

pages.headerFuctions = () => {
    pages.showFilter();
    pages.applyFilter();
    pages.userInfo();
}



pages.showFilter = () => {
    document.getElementById("filter-button").addEventListener("click", function() {
    const filterWindow = document.getElementById("filter-window");
    if (filterWindow.style.display === "none") {
      filterWindow.style.display = "flex";
    } else {
      filterWindow.style.display = "none";
    }
})}

pages.applyFilter = () => {
  document.getElementById("apply-filter-button").addEventListener("click", function() {

    let selectedCategory = document.getElementById("category-select").value;
    console.log("Selected category: " + selectedCategory);
    let filterWindow = document.getElementById("filter-window");
    filterWindow.style.display = "none";
  })
}

pages.userInfo = () => {
    const userInfoTab = document.querySelector('.user-info-tab');
    if (userInfoTab.style.display === 'none') {
      userInfoTab.style.display = 'block';
      pages.displayUserInfo();
    } else {
      userInfoTab.style.display = 'none';
    }
}

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
  }