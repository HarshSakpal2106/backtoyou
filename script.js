const routes = {
   "home": "pages/home.html",
   "lostpets": "pages/lostpets.html",
   "foundpets": "pages/foundpets.html",
   "howitworks": "pages/howitworks.html",
   "auth": "pages/auth.html",
   "report": "pages/report.html",
   "account": "pages/account.html"
};

function getLoggedInUser() {
   return localStorage.getItem("loggedInUser");
}

function isUserLoggedIn() {
   return !!localStorage.getItem("loggedInUser");
}

function updateNav() {
   const navList = document.getElementById("menuNavul");
   const lastLi = navList.querySelector("li:last-child a");
   
   if (isUserLoggedIn()) {
      lastLi.innerHTML = `Account`;
   } else {
      lastLi.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket" style="margin-right: 10px"></i>Login`;
   }
}

// ── Remember Me: restore saved email after auth page loads ──────────────────
function initRememberMe() {
   const rememberedEmail = localStorage.getItem("rememberedEmail");
   const emailInput = document.getElementById("userEmail");
   const rememberCheckbox = document.getElementById("rememberMe");
   
   if (!emailInput || !rememberCheckbox) return;
   
   if (rememberedEmail) {
      emailInput.value = rememberedEmail;
      rememberCheckbox.checked = true;
   }
}
// ───────────────────────────────────────────────────────────────────────────

function loadPage(page) {
   const pageDiv = document.getElementById("page");
   
   if (page === "auth" && isUserLoggedIn()) {
      page = "account";
   }
   
   if ((page === "account" || page === "report") && !isUserLoggedIn()) {
      loadPage("auth");
      return;
   }
   
   const pageUrl = routes[page];
   if (!pageUrl) return;
   
   fetch(pageUrl)
      .then(response => {
         if (!response.ok) throw new Error("Page not found");
         return response.text();
      })
      .then(html => {
         pageDiv.innerHTML = html;
         
         if (page === "lostpets" || page === "foundpets") {
            initLostPets();
         }
         
         if (page === "report") {
            initReportPage();
         }
         
         if (page === "account") {
            initAccountPage();
         }
         
         // ── Remember Me: run after auth page HTML is injected ──────────
         if (page === "auth") {
            initRememberMe();
         }
         // ──────────────────────────────────────────────────────────────
      })
      .catch(err => {
         pageDiv.innerHTML = `<h1>Error 404</h1><p>${err.message}</p>`;
      });
}

window.addEventListener("DOMContentLoaded", () => {
   updateNav();
   loadPage("home");
   
   // hamburger menu toggle for mobile
   const hamburger = document.getElementById("hamburger");
   const menuNav = document.getElementById("menuNav");
   if (hamburger && menuNav) {
      hamburger.addEventListener("click", () => {
         menuNav.classList.toggle("open");
      });
   }
});

document.getElementById("menuNavul").addEventListener("click", e => {
   e.preventDefault();
   const linkText = e.target.textContent.trim();
   
   // close mobile menu when a link is clicked
   const menuNav = document.getElementById("menuNav");
   if (menuNav) menuNav.classList.remove("open");
   
   switch (linkText) {
      case "Home":
         loadPage("home");
         break;
      case "Found Pets":
         loadPage("foundpets");
         break;
      case "Lost Pets":
         loadPage("lostpets");
         break;
      case "How it works":
         loadPage("howitworks");
         break;
      case "Login":
         loadPage("auth");
         break;
      case "Account":
         loadPage("account");
         break;
   }
});

document.getElementById("reportPetBtn").addEventListener("click", () => {
   if (isUserLoggedIn()) {
      loadPage("report");
   } else {
      document.getElementById("login-alert-box").style.top = "10%";
      loadPage("auth");
   }
});

document.getElementById("login-alert-box-close-btn").addEventListener("click", () => {
   document.getElementById("login-alert-box").style.top = "-110%";
});

document.addEventListener("click", (e) => {
   
   if (e.target && e.target.id === "home-hero-reportBtn") {
      if (isUserLoggedIn()) loadPage("report");
      else {
         document.getElementById("login-alert-box").style.top = "10%";
         loadPage("auth");
      }
   }
   
   if (e.target && e.target.id === "home-hiw-more-btn") loadPage("howitworks");
   if (e.target && e.target.id === "home-lost-pets-spotlight-btn") loadPage("lostpets");
   
   if (e.target.id === "switch-to-reg") {
      document.getElementById("login-container").style.display = "none";
      document.getElementById("reg-container").style.display = "block";
   }
   
   if (e.target.id === "switch-to-login") {
      document.getElementById("reg-container").style.display = "none";
      document.getElementById("login-container").style.display = "block";
   }
   
   if (e.target.id === "lost-pet-close-btn") {
      const modal = document.getElementById("lost-pet-info-div");
      const modalContent = document.querySelector(".lost-pet-modal-content");
      modalContent.classList.add("fade-out");
      setTimeout(() => {
         modal.style.display = "none";
         modalContent.classList.remove("fade-out");
      }, 200);
   }
   
   if (e.target.id === "login-submit-btn") {
      const email = document.getElementById("userEmail").value.trim();
      const password = document.getElementById("userPassword").value;
      const rememberMe = document.getElementById("rememberMe").checked; // ── Remember Me
      const storedUser = localStorage.getItem("user_" + email);
      
      if (!storedUser) {
         alert("User not found");
         return;
      }
      
      const userObj = JSON.parse(storedUser);
      if (userObj.password !== password) {
         alert("Incorrect password");
         return;
      }
      
      // ── Remember Me: save or clear the remembered email ────────────────
      if (rememberMe) {
         localStorage.setItem("rememberedEmail", email);
      } else {
         localStorage.removeItem("rememberedEmail");
      }
      // ──────────────────────────────────────────────────────────────────
      
      localStorage.setItem("loggedInUser", email);
      alert("Login successful!");
      updateNav();
      loadPage("account");
   }
   
   if (e.target.id === "logout-btn") {
      localStorage.removeItem("loggedInUser");
      updateNav();
      loadPage("auth");
   }
   
   if (e.target.id === "reg-submit-btn") {
      const name = document.getElementById("user-name").value.trim();
      const email = document.getElementById("user-email").value.trim();
      const phone = document.getElementById("user-phone").value.trim();
      const pincode = document.getElementById("user-pincode").value.trim();
      const password = document.getElementById("user-pass").value;
      
      if (!name || !email || !password) {
         alert("Please fill all required fields");
         return;
      }
      
      if (localStorage.getItem("user_" + email)) {
         alert("User already exists");
         return;
      }
      
      const user = { name, email, phone, pincode, password };
      localStorage.setItem("user_" + email, JSON.stringify(user));
      alert("Account created successfully!");
      document.getElementById("reg-container").style.display = "none";
      document.getElementById("login-container").style.display = "block";
   }
});

document.addEventListener("change", (e) => {
   if (e.target.id !== "toggle") return;
   
   const lost = document.getElementById("report-lost-container");
   const found = document.getElementById("report-found-container");
   
   if (!lost || !found) return;
   
   if (e.target.checked) {
      lost.style.transform = "translateX(calc(-100% - 50px))";
      found.style.transform = "translateX(calc(0% - 50px))";
   } else {
      lost.style.transform = "translateX(0%)";
      found.style.transform = "translateX(100%)";
   }
});

function initAccountPage() {
   const loggedInEmail = localStorage.getItem("loggedInUser");
   const userData = localStorage.getItem("user_" + loggedInEmail);
   
   if (!userData) return;
   const user = JSON.parse(userData);
   
   document.getElementById("account-name").textContent = user.name;
   document.getElementById("account-email").textContent = user.email;
   document.getElementById("account-phone").textContent = user.phone || "Not provided";
   document.getElementById("account-pincode").textContent = user.pincode || "Not provided";
   
   const allReports = JSON.parse(localStorage.getItem("petReports")) || [];
   const userReports = allReports.filter(report => report.reportedBy === loggedInEmail);
   
   const lostReports = userReports.filter(r => r.category === "lost");
   const foundReports = userReports.filter(r => r.category === "found");
   
   const lostList = document.getElementById("lost-reports-list");
   const foundList = document.getElementById("found-reports-list");
   
   function renderReportList(reports, listEl) {
      if (!listEl) return;
      if (reports.length === 0) {
         listEl.innerHTML = "<li>No reports yet.</li>";
         return;
      }
      listEl.innerHTML = reports.map(pet => `
         <li class="account-report-item">
            <div class="account-report-info">
               <strong>${pet.name}</strong> (${pet.type}) — ${pet.date}
            </div>
            <button class="reunited-btn" data-pet-id="${pet.id}" data-pet-category="${pet.category}">
               <span>
                  🎉 Mark as Reunited
               </span>
            </button>
         </li>
      `).join("");
      
      listEl.querySelectorAll(".reunited-btn").forEach(btn => {
         btn.addEventListener("click", () => {
            const petId = btn.dataset.petId;
            const category = btn.dataset.petCategory;
            removePetReport(petId, category);
         });
      });
   }
   
   renderReportList(lostReports, lostList);
   renderReportList(foundReports, foundList);
}


function capitalizeFirst(str) {
   if (!str) return "";
   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDate(dateStr) {
   if (!dateStr) return "";
   const [year, month, day] = dateStr.split("-");
   return `${day}-${month}-${year}`;
}