const pages = {};

pages.base_url = 'http://127.0.0.1:8000/api/'

// Log-PAGE
pages.logPageFunctions = () => {
  pages.signupPage();
  pages.signup();
  pages.signin();
  pages.showPassword();
  pages.displayUserInfo();
}

// MAIN-PAGE
pages.mainPageFunctions = () => {
  pages.headerFuctions();
  pages.fetchProducts();
  pages.fetchCustomerProducts();
  pages.cardFuctions();
}

pages.AdminPageFunctions = () =>{
  pages.showFilter();
  pages.applyFilter();
  pages.userInfo();
  pages.fetchCategories();
  pages.fetchProducts();
}

pages.headerFuctions = () => {
  pages.showFilter();
  pages.applyFilter();
  pages.userInfo();
  pages.showProducts();
  pages.showCart();
  pages.showLike();
  pages.fetchCategories();
}

pages.cardFuctions = () => {
// pages.likeProduct();
//pages.addToLike();
//pages.addToCart();
}


///////
/////
///

class Product {
  constructor(id,title,description,category_name,product_image=null){
    this.product_id = id;
    this.product_title = title;
    this.product_description = description;
    this.product_category_name = category_name;
    this.product_image = product_image;
  }

  displayProductCard() {
    return `
      <div class="card" data-id = "${this.product_id}" >
        <img class="unlike-icon" id="unlike-icon" src="assets/unliked.png" onclick= "pages.addToLike(${this.product_id})" alt="Like Button">
        <img class="like-icon" id="like-icon" src="assets/liked.png"  alt="Like Button">
          <div class="imgBx">
              <img src="http://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png" alt="nike-air-shoe">
          </div>
          <div class="contentBx">
              <h2>${this.product_title}</h2>
              <div class="product-description">
                  <p>${this.product_description}</p>
              </div>
              <div class="category-container">
                <img src="assets/category-icon.png" alt="category icon" class="category-icon">
                <div class="product-category">${this.product_category_name}</div>
              </div>
              <button onclick= "pages.addToCart(${this.product_id})">Add to Cart</button>
          </div>
      </div>
    `;
  }

}


class ProductAdmin {
  constructor(id,title,description,category_name,product_image=null){
    this.product_id = id;
    this.product_title = title;
    this.product_description = description;
    this.product_category_name = category_name;
    this.product_image = product_image;
  }

  displayProductCard() {
    return `
      <div class="card" data-id = "${this.product_id}">
        <img class="unlike-icon" id="delete-icon" src="assets/delete.png"  alt="Like Button" onclick="pages.deleteProduct(${this.product_id})" >
        <div class="imgBx">
            <img src="http://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png" alt="nike-air-shoe">
        </div>
        <div class="contentBx">
            <h2>${this.product_title}</h2>
            <div class="product-description">
                <p>${this.product_description}</p>
            </div>
            <div class="category-container">
              <img src="assets/category-icon.png" alt="category icon" class="category-icon">
              <div class="product-category">${this.product_category_name}</div>
            </div>
            <button onclick="pages.editshowmodule(${this.product_id})" >Edit Product</button>
        </div>
      </div>
    `;
  }

}


///
////
///////




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
            localStorage.setItem("first_name", data.customer.first_name);
            localStorage.setItem("last_name", data.customer.last_name);
            localStorage.setItem("email", data.customer.email);
            localStorage.setItem("role", data.role);
            localStorage.setItem("id_customer", data.customer.id);
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
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("role", data.role);
            if(data.role == "admin"){
              localStorage.setItem("id_admin", data.user.id_admin);
              window.location.href = "admin.html"
            }else{
              localStorage.setItem("id_customer", data.user.id_customer);
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
  document.getElementById("search-icon").addEventListener("click", function() {
    let selected_category = document.getElementById("category-select").value;
    let selected_title = document.getElementById("search-bar").value

    pages.fetchProduct(selected_category,selected_title);

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
  
    fullNameElement.textContent = `${firstName} ${lastName}` 
    emailElement.textContent = `Email: ${email}`;
};

pages.logOut = () => {
    localStorage.clear();
    window.location.href = "index.html";
};

pages.showProducts = () => {
  document.getElementById("product-cards-show").addEventListener("click" , function(){
    document.getElementById("product-cards-container").style.display = "flex";
    document.getElementById("liked-cards-container").style.display = "none";
    document.getElementById("cart-cards-container").style.display = "none";
  })
}

pages.showCart = () => {
  document.getElementById("cart-icon").addEventListener("click" , function(){
    document.getElementById("product-cards-container").style.display = "none";
    document.getElementById("liked-cards-container").style.display = "none";
    document.getElementById("cart-cards-container").style.display = "flex";
  })
}

pages.showLike = () => {
  document.getElementById("like-cards").addEventListener("click" , function(){
    document.getElementById("product-cards-container").style.display = "none";
    document.getElementById("liked-cards-container").style.display = "flex";
    document.getElementById("cart-cards-container").style.display = "none";
  })
}

pages.likeProduct = () => {
  let liked = document.querySelector("like-icon");
  let unliked = document.querySelector("unlike-icon");
  
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

pages.fetchProducts = () => {
    fetch(pages.base_url + "products")
    .then((response) => response.json())
    .then((data) => {
      if (data.products && Array.isArray(data.products)) {
        const role = localStorage.getItem("role")
        if (role === "admin"){
          pages.displayProductsAdmin(data.products);

        }else{
          pages.displayProducts(data.products);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

pages.fetchProduct = (selected_category = "" ,selected_title ="") => {

  const search = new FormData();
  search.append ("category" , selected_category)
  search.append ("title" , selected_title)

  fetch(pages.base_url + "get-product" , {
    method : "POST",
    body : search,
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.products && Array.isArray(data.products)) {
      const role = localStorage.getItem("role")
      if (role === "admin"){
        pages.displayProductsAdmin(data.products);

      }else{
        pages.displayProducts(data.products);
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });

}

pages.displayProducts = (productArray, container = 'product-cards-container') => {
  const productCardsContainer = document.getElementById(container);

  let productCardsHTML = '';
  productArray.forEach((productData) => {
    const productInstance = new Product(
      productData.id,
      productData.title,
      productData.description,
      productData.category_name
      // You can pass the product_image here if needed
    );

    productCardsHTML += productInstance.displayProductCard();
  });

  productCardsContainer.innerHTML = productCardsHTML;
}

pages.displayProductsAdmin = (productArray) => {
  const productCardsContainer = document.getElementById("product-cards-container");

  let productCardsHTML = '';
  productArray.forEach((productData) => {
    const productInstance = new ProductAdmin(
      productData.id,
      productData.title,
      productData.description,
      productData.category_name
      // You can pass the product_image here if needed
    );

    productCardsHTML += productInstance.displayProductCard();
  });

  productCardsContainer.innerHTML += productCardsHTML;
}

pages.addToCart = (product_id) => {
  const customer_id = localStorage.getItem("id_customer");
  const cart_iteam = new FormData();
  cart_iteam.append ("product_id" , product_id)
  cart_iteam.append ("customer_id" , customer_id)

  fetch(pages.base_url + "add-to-cart" , {
    method : "POST",
    body : cart_iteam,
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message == "Product added to cart successfully") {
      console.log(data.message)
      location.reload() 
    }else{console.log(data.message)}
  })
  .catch((error) => {
    console.log(error);
  });
}

pages.addToLike = (product_id) => {
  const customer_id = localStorage.getItem("id_customer");
  const like_iteam = new FormData();
  like_iteam.append ("product_id" , product_id)
  like_iteam.append ("customer_id" , customer_id)

  fetch(pages.base_url + "add-to-liked" , {
    method : "POST",
    body : like_iteam,
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message == "Product added to liked table successfully") {
      console.log(data.message)
      location.reload() 
    }else{console.log(data.message)}
  })
  .catch((error) => {
    console.log(error);
  });
  

}

pages.fetchCustomerProducts = () => {
  const customer_id = localStorage.getItem("id_customer");
  const customer_iteam = new FormData();
  customer_iteam.append ("customer_id" , customer_id)

  fetch(pages.base_url + "get-customer-products" , {
    method : "POST",
    body : customer_iteam,
  })
  .then((response) => response.json())
  .then((data) => {
    pages.displayProducts(data.cart_list, 'cart-cards-container');
    pages.displayProducts(data.liked_list, 'liked-cards-container');
    
  })
  .catch((error) => {
    console.log(error);
  });

}

pages.fetchCategories = () => {

  fetch(pages.base_url + "categories")
    .then((response) => response.json())
    .then((data) => {
      const categorySelect = document.getElementById('category-select');
      categorySelect.innerHTML = '<option value="">All</option>';

      data.categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
      })

    })
    .catch((error) => {
      console.log(error);
    });
  
}

pages.createProduct = () => {
  const title = document.getElementById("newp-title")
  const description = document.getElementById("newp-description")
  const category = document.getElementById("newp-category")

  const new_product = new FormData();
  new_product.append("title" , title.value)
  new_product.append("description" , description.value)
  new_product.append("category_name" , category.value)

  fetch(pages.base_url + "create" , {
    method : "POST",
    body : new_product,
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
    title.innerText = ''
    description.innerText = ''
    category.innerText = ''
    location.reload() 
  })
  .catch((error) => {
    console.log(error);
  });
}

pages.editshowmodule = (id) =>{
  document.getElementById("editModal").style.display = "block";
  localStorage.setItem('editIteam', id)
} 
pages.editProduct = () => {
  const id = localStorage.getItem('editIteam')
  const new_title =document.getElementById("edit-title").value
  const new_desc =document.getElementById("edit-description").value
  const new_cat =document.getElementById("edit-category").value

  const new_info = new FormData();
  new_info.append('id' , id)
  new_info.append('title' , new_title)
  new_info.append('description' , new_desc)
  new_info.append('category_name' , new_cat)

  fetch(pages.base_url + "update" , {
    method : "POST",
    body : new_info,
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
    location.reload() 
  })
  .catch((error) => {
    console.log(error);
  });
  
}

pages.deleteProduct = (id) => {

  const del_product = new FormData();
  del_product.append("id" , id)

  fetch(pages.base_url + "destroy" , {
    method : "POST",
    body : del_product,
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
    location.reload() 
  })
  .catch((error) => {
    console.log(error);
  });
  
}

pages.closeEditModal= () => {
  document.getElementById("editModal").style.display = "none";
}