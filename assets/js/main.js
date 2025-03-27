/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});

/*=============== API ===============*/
/*=============== login register ===============*/

document.addEventListener("DOMContentLoaded", () => {
  // Select the login and register forms
  const loginForm = document.querySelector(".login form");
  const registerForm = document.querySelector(".register form");

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = loginForm.querySelector("input[type='email']").value;
      const password = loginForm.querySelector("input[type='password']").value;

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.success) {
          alert(data.message); // Success message
          console.log("Token:", data.data.accessToken); // Access token for use
          localStorage.setItem("accessToken", data.data.accessToken); // Store token
          // Redirect to another page (e.g., dashboard)
          window.location.href = "index.html";
        } else {
          alert(data.message || "Login failed!");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again!");
      }
    });
  }

  // Register Form Submission
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = registerForm.querySelector(
        "input[placeholder='Username']"
      ).value;
      const email = registerForm.querySelector("input[type='email']").value;
      const password = registerForm.querySelector(
        "input[type='password']"
      ).value;
      const confirmPassword = registerForm.querySelector(
        "input[placeholder='Confirm Password']"
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          }
        );

        const data = await response.json();

        if (data.success) {
          alert(data.message); // Success message
          console.log("Registered User ID:", data.data.id); // User ID
          // Redirect to login page
          window.location.href = "login-register.html";
        } else {
          alert(data.message || "Registration failed!");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again!");
      }
    });
  }
});

/*=============== dynamic header ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const authItem = document.getElementById("auth-item");
  const authLink = document.getElementById("auth-link");

  // Check if user is logged in
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // If logged in, show Logout
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.classList.add("logout-link");

    // Add logout functionality
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("accessToken"); // Remove token
      window.location.reload(); // Reload the page to update UI
    });
  } else {
    // If not logged in, show Login/Register
    authLink.textContent = "Login";
    authLink.href = "login-register.html";
    authLink.classList.remove("logout-link");
  }
});

/*=============== dynamic header ===============*/

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const totalProducts = document.getElementById("total-products");

  // Ensure that the elements exist before proceeding
  if (!productContainer || !totalProducts) {
    console.error("Required elements are missing in the DOM.");
    return;
  }

  // Fetch product data from the API
  fetch("http://localhost:5000/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const products = [data.data]; // Assuming you only have one product in the response. Adjust accordingly.
        console.log(products);
        totalProducts.textContent = `We found ${products.length} items for you!`; // Update the total products count

        // Loop through products and create HTML
        products.forEach((product) => {
          const productItem = document.createElement("div");
          productItem.classList.add("product__item");

          productItem.innerHTML = `
            <div class="product__banner">
              <a href="details.html?productId=${
                product.id
              }" class="product__images">
                <img
                  src="${product.imageUrl}"
                  alt="${product.name}"
                  class="product__img default"
                />
                <img
                  src="${product.imageUrl}"
                  alt="${product.name}"
                  class="product__img hover"
                />
              </a>
              <div class="product__actions">
                <a href="#" class="action__btn" aria-label="Quick View">
                  <i class="fi fi-rs-eye"></i>
                </a>
                <a href="#" class="action__btn" aria-label="Add to Wishlist">
                  <i class="fi fi-rs-heart"></i>
                </a>
                <a href="#" class="action__btn" aria-label="Compare">
                  <i class="fi fi-rs-shuffle"></i>
                </a>
              </div>
              <div class="product__badge light-pink">Hot</div>
            </div>
            <div class="product__content">
              <span class="product__category">Clothing</span>
              <a href="details.html?productId=${product.id}">
                <h3 class="product__title">${product.name}</h3>
              </a>
              <div class="product__rating">
                <i class="fi fi-rs-star"></i>
                <i class="fi fi-rs-star"></i>
                <i class="fi fi-rs-star"></i>
                <i class="fi fi-rs-star"></i>
                <i class="fi fi-rs-star"></i>
              </div>
              <div class="product__price flex">
                <span class="new__price">$${product.price}</span>
                <span class="old__price">$${(product.price + 10).toFixed(
                  2
                )}</span> <!-- Add your discount logic -->
              </div>
              <a
                href="#"
                class="action__btn cart__btn"
                aria-label="Add To Cart"
              >
                <i class="fi fi-rs-shopping-bag-add"></i>
              </a>
            </div>
          `;

          // Append the product item to the container
          productContainer.appendChild(productItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
});
