function getSelectedRadioValue(name) {
   const checked = document.querySelector(`input[name="${name}"]:checked`);
   return checked ? checked.value : "All";
}

// Fetch pets from DB with optional filters
async function fetchDBPets(category, filters = {}) {
   const params = new URLSearchParams({ action: "get_pets", category });
   if (filters.name) params.append("name", filters.name);
   if (filters.type && filters.type !== "All") params.append("type", filters.type);
   if (filters.gender && filters.gender !== "All") params.append("gender", filters.gender);
   if (filters.location) params.append("location", filters.location);
   
   try {
      const res = await fetch(`backend/pets.php?${params}`);
      const data = await res.json();
      return data.success ? data.pets : [];
   } catch {
      return [];
   }
}

// Render pet cards
function renderLostPets(pets, category) {
   const container = document.getElementById("lost-pets-card-container");
   if (!container) return;
   container.innerHTML = "";
   
   if (pets.length === 0) {
      container.innerHTML = `<p style="padding: 20px; color: #666;">No ${category} pets found matching your filters.</p>`;
      return;
   }
   
   pets.forEach(pet => {
      const card = document.createElement("div");
      card.className = "lost-pets-card";
      card.dataset.petId = pet.id;
      
      card.innerHTML = `
            <div class="lost-pets-card-img">
                <img src="${pet.image}" alt="${pet.name}" onerror="this.src='/images/default.jpg'">
            </div>
            <div class="lost-pets-card-text">
                <span class="lost-pet-name">${pet.name}</span>
                <span class="lost-pet-gender">${pet.gender} <span class="lost-pet-type">${pet.type}</span></span>
                <span class="lost-pet-breed">${pet.breed || "Unknown breed"}</span>
                <hr />
                <span class="lost-pet-loc">${pet.location}</span>
                <span class="lost-pet-date">${pet.date}</span>
                <button class="lost-pet-btn">View More</button>
            </div>`;
      
      container.appendChild(card);
      card.querySelector(".lost-pet-btn").addEventListener("click", () => showPetModal(pet));
   });
}

// Mark as Reunited
async function removePetReport(petId) {
   if (!confirm("Mark this pet as reunited with its owner? This will remove the listing.")) return;
   
   const form = new FormData();
   form.append("action", "mark_reunited");
   form.append("pet_id", petId);
   
   try {
      const res = await fetch("backend/pets.php", { method: "POST", body: form });
      const data = await res.json();
      if (data.success) {
         applyLostPetFilters();
         initAccountPage();
      } else {
         alert(data.message || "Could not mark as reunited.");
      }
   } catch {
      alert("Network error. Please try again.");
   }
}

// Re fetch after filter
async function applyLostPetFilters() {
   const h1Element = document.getElementById("lost-pets-h1");
   if (!h1Element) return;
   
   const isFoundPage = h1Element.innerText.toLowerCase().includes("found");
   const category = isFoundPage ? "found" : "lost";
   
   const nameFilter = document.getElementById("lost-pet-filter-name").value.toLowerCase().trim();
   const typeFilter = getSelectedRadioValue("lost-pet-filter-type");
   const genderFilter = getSelectedRadioValue("lost-pet-filter-gender");
   const locationFilter = document.getElementById("lost-pet-filter-location").value.toLowerCase().trim();
   
   const pets = await fetchDBPets(category, {
      name: nameFilter,
      type: typeFilter,
      gender: genderFilter,
      location: locationFilter,
   });
   
   renderLostPets(pets, category);
}

function initLostPets() {
   applyLostPetFilters();
   if (typeof initAutocomplete === "function") initAutocomplete();
   
   const nameInput = document.getElementById("lost-pet-filter-name");
   if (nameInput) nameInput.addEventListener("input", applyLostPetFilters);
   
   document.querySelectorAll('input[name="lost-pet-filter-type"]').forEach(r =>
      r.addEventListener("change", applyLostPetFilters));
   document.querySelectorAll('input[name="lost-pet-filter-gender"]').forEach(r =>
      r.addEventListener("change", applyLostPetFilters));
   
   const locInput = document.getElementById("lost-pet-filter-location");
   if (locInput) locInput.addEventListener("input", applyLostPetFilters);
}

// report form submission
function initReportPage() {
   const lostForm = document.getElementById("lost-pet-form");
   const foundForm = document.getElementById("found-pet-form");
   if (typeof initAutocomplete === "function") initAutocomplete();
   
   function handleFormSubmit(form, category) {
      if (!form) return;
      form.addEventListener("submit", async function(e) {
         e.preventDefault();
         
         const submitBtn = form.querySelector("button[type=submit]");
         const origText = submitBtn.textContent;
         submitBtn.disabled = true;
         submitBtn.textContent = "Submitting…";
         
         const formData = new FormData(form);
         formData.append("action", "submit_report");
         formData.append("category", category);
         
         try {
            const res = await fetch("backend/pets.php", { method: "POST", body: formData });
            const data = await res.json();
            
            if (data.success) {
               alert(data.message);
               loadPage(category + "pets");
            } else {
               alert(data.message || "Submission failed.");
            }
         } catch {
            alert("Network error. Please try again.");
         } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = origText;
         }
      });
   }
   
   handleFormSubmit(lostForm, "lost");
   handleFormSubmit(foundForm, "found");
}

// pets detail modal
function showPetModal(pet) {
   const modal = document.getElementById("lost-pet-info-div");
   const modalBody = document.getElementById("lost-pet-modal-body");
   if (!modal || !modalBody) return;
   
   const reporterEmail = pet.reportedBy || null;
   const isDemo = reporterEmail === "demo@back2you.com";
   
   const contactSection = isDemo ?
      `<button class="lost-pet-owner-contact-btn" disabled title="Demo listing — no real contact">Contact Reporter</button>` :
      reporterEmail ?
      `<button class="lost-pet-owner-contact-btn" id="contact-owner-btn" data-email="${reporterEmail}" data-pet="${encodeURIComponent(pet.name)}">Contact Reporter</button>` :
      `<p style="font-size:0.85rem; color:#888;">No contact info available.</p>`;
   
   modalBody.innerHTML = `
        <div class="lost-pet-modal-img">
            <img src="${pet.image}" alt="${pet.name}" onerror="this.src='/images/default.jpg'">
        </div>
        <div class="lost-pet-modal-text">
            <h2>${pet.name}</h2>
            <span><strong>Gender:</strong> ${pet.gender}</span>
            <span><strong>Type:</strong> ${pet.type}</span>
            <span><strong>Breed:</strong> ${pet.breed || "Unknown"}</span>
            <span><strong>Location:</strong> ${pet.location}</span>
            ${pet.lastSeenLandmark ? `<span><strong>Landmark:</strong> ${pet.lastSeenLandmark}</span>` : ""}
            <span><strong>Date:</strong> ${pet.date}</span>
            ${pet.time ? `<span><strong>Time:</strong> ${pet.time}</span>` : ""}
            <span><strong>Description:</strong> ${pet.description}</span>
        </div>
        ${contactSection}
        <div id="contact-form-area" style="display:none; margin-top: 15px; width: 100%;">
            <h3 style="margin-bottom: 8px;">Send a Message</h3>
            <input type="text"  id="contact-sender-name"  placeholder="Your name" style="width:100%; margin-bottom:8px; padding:8px; box-sizing:border-box; border:1px solid #ccc; border-radius:6px;">
            <input type="email" id="contact-sender-email" placeholder="Your email (so they can reply)" style="width:100%; margin-bottom:8px; padding:8px; box-sizing:border-box; border:1px solid #ccc; border-radius:6px;">
            <textarea id="contact-message" rows="4" placeholder="Write your message..." style="width:100%; padding:8px; box-sizing:border-box; border:1px solid #ccc; border-radius:6px;"></textarea>
            <button id="contact-send-btn" style="margin-top:10px;" data-to-email="${reporterEmail}" data-pet="${encodeURIComponent(pet.name)}">Send Message</button>
            <p id="contact-status" style="font-size:0.85rem; margin-top:6px; color:green;"></p>
        </div>
    `;
   
   modal.style.display = "flex";
   
   const contactBtn = document.getElementById("contact-owner-btn");
   if (contactBtn) {
      contactBtn.addEventListener("click", () => {
         const formArea = document.getElementById("contact-form-area");
         formArea.style.display = formArea.style.display === "none" ? "block" : "none";
      });
   }
   
   const sendBtn = document.getElementById("contact-send-btn");
   if (sendBtn) {
      sendBtn.addEventListener("click", () => {
         const senderName = document.getElementById("contact-sender-name").value.trim();
         const senderEmail = document.getElementById("contact-sender-email").value.trim();
         const message = document.getElementById("contact-message").value.trim();
         const toEmail = sendBtn.dataset.toEmail;
         const petName = decodeURIComponent(sendBtn.dataset.pet);
         const statusEl = document.getElementById("contact-status");
         
         if (!senderName || !senderEmail || !message) {
            statusEl.style.color = "red";
            statusEl.textContent = "Please fill in all fields.";
            return;
         }
         
         statusEl.style.color = "#888";
         statusEl.textContent = "Sending…";
         sendBtn.disabled = true;
         
         emailjs.send("service_back2you", "template_contact_owner", {
            to_email: toEmail,
            from_name: senderName,
            from_email: senderEmail,
            pet_name: petName,
            message: message
         }).then(() => {
            statusEl.style.color = "green";
            statusEl.textContent = "Message sent! The reporter will reply to your email.";
            sendBtn.disabled = false;
         }).catch(err => {
            console.error("EmailJS error:", err);
            statusEl.style.color = "red";
            statusEl.textContent = "Failed to send. Please try again later.";
            sendBtn.disabled = false;
         });
      });
   }
}