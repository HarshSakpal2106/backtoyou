const routes = {
   "home": "pages/home.html",
   "lostpets": "pages/lostpets.html",
   "foundpets": "pages/foundpets.html",
   "howitworks": "pages/howitworks.html",
   "auth": "pages/auth.html",
   "report": "pages/report.html",
   "account": "pages/account.html"
};

// Auth state
let currentUser = null; // null = not logged in; object = user data from server

async function fetchCurrentUser() {
   try {
      const res = await fetch("backend/auth.php?action=me");
      const data = await res.json();
      currentUser = data.loggedIn ? data.user : null;
   } catch {
      currentUser = null;
   }
}

function isUserLoggedIn() {
   return currentUser !== null;
}

function getLoggedInUser() {
   return currentUser ? currentUser.email : null;
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

// Remember Me
function initRememberMe() {
   const emailInput = document.getElementById("userEmail");
   const rememberCheckbox = document.getElementById("rememberMe");
   if (!emailInput || !rememberCheckbox) return;
   
   const remembered = getCookie("rememberedEmail");
   if (remembered) {
      emailInput.value = remembered;
      rememberCheckbox.checked = true;
   }
}

function setCookie(name, value, days) {
   const expires = new Date(Date.now() + days * 864e5).toUTCString();
   document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
   return document.cookie.split('; ').reduce((acc, part) => {
      const [k, v] = part.split('=');
      return k === name ? decodeURIComponent(v) : acc;
   }, null);
}

function deleteCookie(name) {
   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// Page router
function loadPage(page) {
   const pageDiv = document.getElementById("page");
   
   if (page === "auth" && isUserLoggedIn()) page = "account";
   
   if ((page === "account" || page === "report") && !isUserLoggedIn()) {
      loadPage("auth");
      return;
   }
   
   const pageUrl = routes[page];
   if (!pageUrl) return;
   
   fetch(pageUrl)
      .then(r => { if (!r.ok) throw new Error("Page not found"); return r.text(); })
      .then(html => {
         pageDiv.innerHTML = html;
         
         if (page === "lostpets" || page === "foundpets") initLostPets();
         if (page === "report") initReportPage();
         if (page === "account") initAccountPage();
         if (page === "auth") initRememberMe();
      })
      .catch(err => {
         pageDiv.innerHTML = `<h1>Error 404</h1><p>${err.message}</p>`;
      });
}

// Bootstrap
window.addEventListener("DOMContentLoaded", async () => {
   await fetchCurrentUser();
   updateNav();
   loadPage("home");
   
   const hamburger = document.getElementById("hamburger");
   const menuNav = document.getElementById("menuNav");
   if (hamburger && menuNav) {
      hamburger.addEventListener("click", () => menuNav.classList.toggle("open"));
   }
});

// Nav clicks
document.getElementById("menuNavul").addEventListener("click", e => {
   e.preventDefault();
   const linkText = e.target.textContent.trim();
   
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

document.addEventListener("click", async (e) => {
   
   // Home page buttons
   if (e.target && e.target.id === "home-hero-reportBtn") {
      if (isUserLoggedIn()) loadPage("report");
      else { document.getElementById("login-alert-box").style.top = "10%";
         loadPage("auth"); }
   }
   if (e.target && e.target.id === "home-hiw-more-btn") loadPage("howitworks");
   if (e.target && e.target.id === "home-lost-pets-spotlight-btn") loadPage("lostpets");
   
   // Auth page toggles
   if (e.target.id === "switch-to-reg") {
      document.getElementById("login-container").style.display = "none";
      document.getElementById("reg-container").style.display = "block";
   }
   if (e.target.id === "switch-to-login") {
      document.getElementById("reg-container").style.display = "none";
      document.getElementById("login-container").style.display = "block";
   }
   
   // Modal close
   if (e.target.id === "lost-pet-close-btn") {
      const modal = document.getElementById("lost-pet-info-div");
      const modalContent = document.querySelector(".lost-pet-modal-content");
      modalContent.classList.add("fade-out");
      setTimeout(() => {
         modal.style.display = "none";
         modalContent.classList.remove("fade-out");
      }, 200);
   }
   
   // Login
   if (e.target.id === "login-submit-btn") {
      const email = document.getElementById("userEmail").value.trim();
      const password = document.getElementById("userPassword").value;
      const rememberMe = document.getElementById("rememberMe").checked;
      
      const btn = e.target;
      btn.disabled = true;
      btn.textContent = "Logging in…";
      
      const form = new FormData();
      form.append("action", "login");
      form.append("email", email);
      form.append("password", password);
      form.append("rememberMe", rememberMe ? "1" : "");
      
      try {
         const res = await fetch("backend/auth.php", { method: "POST", body: form });
         const data = await res.json();
         
         if (data.success) {
            currentUser = data.user;
            
            // Remember Me: store email in a plain cookie
            if (rememberMe) setCookie("rememberedEmail", email, 30);
            else deleteCookie("rememberedEmail");
            
            updateNav();
            loadPage("account");
         } else {
            alert(data.message || "Login failed.");
         }
      } catch {
         alert("Network error. Please try again.");
      } finally {
         btn.disabled = false;
         btn.textContent = "Login";
      }
   }
   
   // Logout
   if (e.target.id === "logout-btn") {
      const form = new FormData();
      form.append("action", "logout");
      await fetch("backend/auth.php", { method: "POST", body: form });
      currentUser = null;
      updateNav();
      loadPage("auth");
   }
   
   // Register
   if (e.target.id === "reg-submit-btn") {
      const name = document.getElementById("user-name").value.trim();
      const email = document.getElementById("user-email").value.trim();
      const phone = document.getElementById("user-phone").value.trim();
      const pincode = document.getElementById("user-pincode").value.trim();
      const password = document.getElementById("user-pass").value;
      
      if (!name || !email || !password) {
         alert("Please fill all required fields.");
         return;
      }
      
      const btn = e.target;
      btn.disabled = true;
      btn.textContent = "Creating account…";
      
      const form = new FormData();
      form.append("action", "register");
      form.append("name", name);
      form.append("email", email);
      form.append("phone", phone);
      form.append("pincode", pincode);
      form.append("password", password);
      
      try {
         const res = await fetch("backend/auth.php", { method: "POST", body: form });
         const data = await res.json();
         
         if (data.success) {
            alert("Account created successfully!");
            document.getElementById("reg-container").style.display = "none";
            document.getElementById("login-container").style.display = "block";
         } else {
            alert(data.message || "Registration failed.");
         }
      } catch {
         alert("Network error. Please try again.");
      } finally {
         btn.disabled = false;
         btn.textContent = "Create Account";
      }
   }
});

// Report toggle (Lost / Found slider)
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

// Account page
async function initAccountPage() {
   if (!currentUser) return;
   
   document.getElementById("account-name").textContent = currentUser.name;
   document.getElementById("account-email").textContent = currentUser.email;
   document.getElementById("account-phone").textContent = currentUser.phone || "Not provided";
   document.getElementById("account-pincode").textContent = currentUser.pincode || "Not provided";
   
   try {
      const res = await fetch("backend/pets.php?action=my_reports");
      const data = await res.json();
      if (!data.success) return;
      
      renderReportList(data.lost, document.getElementById("lost-reports-list"));
      renderReportList(data.found, document.getElementById("found-reports-list"));
   } catch {
   }
}

function renderReportList(reports, listEl) {
   if (!listEl) return;
   if (!reports || reports.length === 0) {
      listEl.innerHTML = "<li>No reports yet.</li>";
      return;
   }
   listEl.innerHTML = reports.map(pet => `
      <li class="account-report-item">
         <div class="account-report-info">
            <strong>${pet.name}</strong> (${pet.type}) — ${pet.date}
         </div>
         <button class="reunited-btn" data-pet-id="${pet.id}" data-pet-category="${pet.category}">
            <span>🎉 Mark as Reunited</span>
         </button>
      </li>
   `).join("");
   
   listEl.querySelectorAll(".reunited-btn").forEach(btn => {
      btn.addEventListener("click", () => removePetReport(btn.dataset.petId));
   });
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