const lostPets = [
    { id: "lost_demo_1", category: "lost", name: "Tommy", gender: "Male", type: "Dog", breed: "Belgian Malinois", location: "Kurla, Mumbai", date: "21-01-2026", time: "4:30 PM", lastSeenLandmark: "Near Kurla Station", description: "Very friendly, responds to his name. Wearing a red collar with a tag.", image: "/images/dog1.jpeg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_2", category: "lost", name: "Bruno", gender: "Male", type: "Dog", breed: "German Shepherd", location: "Andheri West, Mumbai", date: "19-01-2026", time: "7:00 PM", lastSeenLandmark: "Near Infinity Mall", description: "Large build, trained dog. May appear aggressive but is gentle with familiar people.", image: "/images/dog2.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_3", category: "lost", name: "Luna", gender: "Female", type: "Cat", breed: "Persian", location: "Thane West", date: "18-01-2026", time: "2:00 PM", lastSeenLandmark: "Near Viviana Mall", description: "White Persian cat with striking blue eyes. Strictly indoor pet, may be scared.", image: "/images/cat1.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_4", category: "lost", name: "Milo", gender: "Male", type: "Cat", breed: "Maine Coon", location: "Vashi, Navi Mumbai", date: "20-01-2026", time: "6:15 PM", lastSeenLandmark: "Near Inorbit Mall", description: "Brown long-haired cat with a very fluffy tail. Friendly and curious.", image: "/images/cat2.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_5", category: "lost", name: "Oreo", gender: "Male", type: "Rabbit", breed: "Dutch Rabbit", location: "Vasai East", date: "17-01-2026", time: "5:00 PM", lastSeenLandmark: "Near Vasai Bus Depot", description: "Black and white rabbit, very calm and friendly. Comes to you if you crouch down.", image: "/images/rabbit1.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_6", category: "lost", name: "Buddy", gender: "Male", type: "Dog", breed: "Golden Retriever", location: "Ghodbunder Road, Thane", date: "20-01-2026", time: "8:30 PM", lastSeenLandmark: "Near Hiranandani Estate", description: "Golden retriever, very playful and friendly. Loves fetch and responds to 'Buddy'.", image: "/images/dog3.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_7", category: "lost", name: "Simba", gender: "Male", type: "Cat", breed: "Tabby", location: "Bandra West, Mumbai", date: "22-01-2026", time: "10:00 AM", lastSeenLandmark: "Near Bandra Bandstand", description: "Orange tabby cat with a small notch on left ear. Very vocal, will meow back at you.", image: "/images/cat3.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_8", category: "lost", name: "Max", gender: "Male", type: "Dog", breed: "Beagle", location: "Mulund West, Mumbai", date: "23-01-2026", time: "9:00 AM", lastSeenLandmark: "Near Mulund Check Naka", description: "Small beagle with a brown, black and white coat. Very food motivated and friendly.", image: "/images/dog5.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_9", category: "lost", name: "Daisy", gender: "Female", type: "Dog", breed: "Pomeranian", location: "Borivali West, Mumbai", date: "24-01-2026", time: "11:30 AM", lastSeenLandmark: "Near Borivali Station", description: "Tiny cream-colored Pomeranian. Wearing a pink bow. Very timid around strangers.", image: "/images/dog6.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_10", category: "lost", name: "Shadow", gender: "Male", type: "Cat", breed: "Bombay", location: "Chembur, Mumbai", date: "25-01-2026", time: "8:00 PM", lastSeenLandmark: "Near RCF Colony Gate", description: "All-black Bombay cat with bright yellow eyes. Neutered male, microchipped.", image: "/images/cat4.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_11", category: "lost", name: "Pepper", gender: "Female", type: "Rabbit", breed: "Rex Rabbit", location: "Kalyan East", date: "23-01-2026", time: "3:00 PM", lastSeenLandmark: "Near Kalyan Railway Station", description: "Grey velvety Rex rabbit. Medium size, thumps when nervous. Escaped from backyard.", image: "/images/rabbit3.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_12", category: "lost", name: "Rocky", gender: "Male", type: "Dog", breed: "Rottweiler", location: "Airoli, Navi Mumbai", date: "26-01-2026", time: "6:00 AM", lastSeenLandmark: "Near Airoli Bridge", description: "Large Rottweiler with a blue ID tag. Well-trained, unlikely to bite. Loves belly rubs.", image: "/images/dog7.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_13", category: "lost", name: "Mittens", gender: "Female", type: "Cat", breed: "Calico", location: "Dombivli East", date: "27-01-2026", time: "5:00 PM", lastSeenLandmark: "Near Dombivli Station Market", description: "Tricolour calico with distinctive orange patch on forehead. Very shy, may hide.", image: "/images/cat5.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_14", category: "lost", name: "Charlie", gender: "Male", type: "Dog", breed: "Labrador Retriever", location: "Panvel, Navi Mumbai", date: "28-01-2026", time: "7:30 AM", lastSeenLandmark: "Near Panvel Bus Stand", description: "Black Labrador, 2 years old. Wearing a green collar. Very energetic and loves people.", image: "/images/dog8.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_15", category: "lost", name: "Tweety", gender: "Female", type: "Bird", breed: "Budgerigar", location: "Kandivali East, Mumbai", date: "29-01-2026", time: "12:00 PM", lastSeenLandmark: "Near Kandivali Metro Station", description: "Yellow and green budgie. Very chatty, knows a few words. Flew out of an open window.", image: "/images/bird3.jpg", reportedBy: "demo@back2you.com" },
    { id: "lost_demo_16", category: "lost", name: "Ginger", gender: "Female", type: "Cat", breed: "Domestic Shorthair", location: "Vikhroli, Mumbai", date: "30-01-2026", time: "9:00 PM", lastSeenLandmark: "Near Godrej Colony Gate", description: "Ginger and white cat, very affectionate. Spayed female, wearing a yellow bell collar.", image: "/images/cat6.jpg", reportedBy: "demo@back2you.com" },
];

const foundPets = [
    { id: "found_demo_1", category: "found", name: "Snowy", gender: "Female", type: "Rabbit", breed: "Angora", location: "Borivali East, Mumbai", date: "16-01-2026", time: "3:30 PM", lastSeenLandmark: "Near National Park Gate", description: "White fluffy rabbit found near the park gate. Seems well-fed and tamed, clearly a pet.", image: "/images/rabbit2.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_2", category: "found", name: "Kiwi", gender: "Female", type: "Bird", breed: "Lovebird", location: "Vasai West", date: "15-01-2026", time: "9:00 AM", lastSeenLandmark: "Near Vasai Beach", description: "Green lovebird found near the beach. Responds to whistles, clearly hand-raised.", image: "/images/bird1.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_3", category: "found", name: "Coco", gender: "Male", type: "Bird", breed: "Cockatiel", location: "Powai, Mumbai", date: "22-01-2026", time: "11:00 AM", lastSeenLandmark: "Near Powai Lake", description: "Grey cockatiel with yellow crest found near the lake. Hand-tamed, very calm.", image: "/images/bird2.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_4", category: "found", name: "Bella", gender: "Female", type: "Dog", breed: "Labrador Retriever", location: "Nerul, Navi Mumbai", date: "21-01-2026", time: "5:45 PM", lastSeenLandmark: "Near DY Patil Stadium", description: "Light brown Labrador wearing a blue collar. Very friendly and well-trained, knows commands.", image: "/images/dog4.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_5", category: "found", name: "Unknown", gender: "Male", type: "Dog", breed: "Indie / Mixed", location: "Thane West", date: "23-01-2026", time: "8:00 AM", lastSeenLandmark: "Near Thane Station Platform 1", description: "Brown and white mixed breed dog found near the station. Well-groomed, likely a pet.", image: "/images/dog9.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_6", category: "found", name: "Unknown", gender: "Female", type: "Cat", breed: "Siamese Mix", location: "Andheri East, Mumbai", date: "24-01-2026", time: "2:30 PM", lastSeenLandmark: "Near MIDC Metro Station", description: "Cream-coloured Siamese mix, blue eyes. Found hiding under a car. No collar but very tame.", image: "/images/cat7.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_7", category: "found", name: "Peanut", gender: "Male", type: "Rabbit", breed: "Holland Lop", location: "Mira Road", date: "25-01-2026", time: "4:00 PM", lastSeenLandmark: "Near Mira Road Market", description: "Small floppy-eared rabbit, light brown. Found in a garden. Very calm and tame.", image: "/images/rabbit4.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_8", category: "found", name: "Unknown", gender: "Male", type: "Dog", breed: "Pug", location: "Mulund East, Mumbai", date: "26-01-2026", time: "6:30 PM", lastSeenLandmark: "Near Mulund Garden", description: "Fawn pug with a green harness, no tag. Found sitting outside a building, waiting.", image: "/images/dog10.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_9", category: "found", name: "Unknown", gender: "Female", type: "Cat", breed: "Tabby", location: "Dombivli West", date: "27-01-2026", time: "10:00 PM", lastSeenLandmark: "Near Dombivli West Station", description: "Grey tabby found meowing near the station at night. Spayed, friendly, clearly someone's pet.", image: "/images/cat8.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_10", category: "found", name: "Polo", gender: "Male", type: "Dog", breed: "Dalmatian", location: "Kharghar, Navi Mumbai", date: "28-01-2026", time: "7:00 AM", lastSeenLandmark: "Near Central Park Kharghar", description: "Young Dalmatian found running loose in the park. Collar with name 'Polo' but no number.", image: "/images/dog11.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_11", category: "found", name: "Unknown", gender: "Male", type: "Bird", breed: "Indian Ringneck", location: "Bhayandar West", date: "29-01-2026", time: "8:30 AM", lastSeenLandmark: "Near Bhayandar Station", description: "Green ringneck parrot found perched on a shop sign. Tame, says a few words in Hindi.", image: "/images/bird4.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_12", category: "found", name: "Cookie", gender: "Female", type: "Dog", breed: "Cocker Spaniel", location: "Goregaon East, Mumbai", date: "30-01-2026", time: "5:00 PM", lastSeenLandmark: "Near Oberoi Mall", description: "Golden Cocker Spaniel with curly ears. Has a collar tag reading 'Cookie'.", image: "/images/dog12.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_13", category: "found", name: "Unknown", gender: "Female", type: "Rabbit", breed: "Lionhead", location: "Kalyan West", date: "31-01-2026", time: "3:00 PM", lastSeenLandmark: "Near Kalyan Bus Depot", description: "White lionhead rabbit with a fluffy mane. Found in a roadside bush, malnourished.", image: "/images/rabbit5.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_14", category: "found", name: "Unknown", gender: "Male", type: "Cat", breed: "Russian Blue Mix", location: "Chembur, Mumbai", date: "01-02-2026", time: "9:00 PM", lastSeenLandmark: "Near Diamond Garden", description: "Grey-blue cat with green eyes found in the garden. Neutered, very well-behaved.", image: "/images/cat9.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_15", category: "found", name: "Unknown", gender: "Male", type: "Dog", breed: "Shih Tzu", location: "Worli, Mumbai", date: "02-02-2026", time: "12:00 PM", lastSeenLandmark: "Near Worli Sea Face", description: "Small white Shih Tzu found near the seaface. Groomed recently, wearing a tiny red bow.", image: "/images/dog13.jpg", reportedBy: "demo@back2you.com" },
    { id: "found_demo_16", category: "found", name: "Sunny", gender: "Male", type: "Bird", breed: "Canary", location: "Santacruz West, Mumbai", date: "03-02-2026", time: "7:00 AM", lastSeenLandmark: "Near Santacruz Market", description: "Bright yellow canary found in a courtyard. In good health, sings beautifully.", image: "/images/bird5.jpg", reportedBy: "demo@back2you.com" },
];

function getUserReports() {
    return JSON.parse(localStorage.getItem("petReports")) || [];
}

function saveUserReports(reports) {
    localStorage.setItem("petReports", JSON.stringify(reports));
}

function getAllPetsByCategory(category) {
    const demoPets = category === "lost" ? lostPets : foundPets;
    const userReports = getUserReports().filter(p => p.category === category);
    return [...demoPets, ...userReports];
}

function getSelectedRadioValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : "All";
}

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
            <div class="lost-pets-card-img"><img src="${pet.image}" alt="${pet.name}" onerror="this.src='/images/default.jpg'"></div>
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

function removePetReport(petId, category) {
    if (!confirm("Mark this pet as reunited with its owner? This will remove the listing.")) return;
    
    let reports = getUserReports();
    reports = reports.filter(p => p.id !== petId);
    saveUserReports(reports);
    
    applyLostPetFilters();
    initAccountPage();
}

function applyLostPetFilters() {
    const h1Element = document.getElementById("lost-pets-h1");
    if (!h1Element) return;
    
    const isFoundPage = h1Element.innerText.toLowerCase().includes("found");
    const category = isFoundPage ? "found" : "lost";
    
    const allPets = getAllPetsByCategory(category);
    
    const nameFilter = document.getElementById("lost-pet-filter-name").value.toLowerCase().trim();
    const typeFilter = getSelectedRadioValue("lost-pet-filter-type");
    const genderFilter = getSelectedRadioValue("lost-pet-filter-gender");
    const locationFilter = document.getElementById("lost-pet-filter-location").value.toLowerCase().trim();
    
    const filtered = allPets.filter(pet => {
        const matchName = pet.name.toLowerCase().includes(nameFilter);
        const matchType = typeFilter === "All" || pet.type === typeFilter;
        const matchGender = genderFilter === "All" || pet.gender === genderFilter;
        const matchLocation = locationFilter === "" || pet.location.toLowerCase().includes(locationFilter);
        return matchName && matchType && matchGender && matchLocation;
    });
    
    renderLostPets(filtered, category);
}

function initLostPets() {
    applyLostPetFilters();
    if (typeof initAutocomplete === "function") initAutocomplete();
    
    const nameInput = document.getElementById("lost-pet-filter-name");
    if (nameInput) nameInput.addEventListener("input", applyLostPetFilters);
    
    document.querySelectorAll('input[name="lost-pet-filter-type"]').forEach(r => r.addEventListener("change", applyLostPetFilters));
    document.querySelectorAll('input[name="lost-pet-filter-gender"]').forEach(r => r.addEventListener("change", applyLostPetFilters));
    
    const locInput = document.getElementById("lost-pet-filter-location");
    if (locInput) locInput.addEventListener("input", applyLostPetFilters);
}

function initReportPage() {
    const lostForm = document.getElementById("lost-pet-form");
    const foundForm = document.getElementById("found-pet-form");
    if (typeof initAutocomplete === "function") initAutocomplete();
    
    function handleFormSubmit(form, category) {
        if (!form) return;
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const imageFile = formData.get("image");
            
            function saveReport(imageDataUrl) {
                const newPet = {
                    id: "user_" + Date.now(),
                    category: category,
                    name: formData.get("pet_name") || "Unknown",
                    gender: capitalizeFirst(formData.get("gender") || "Unknown"),
                    type: capitalizeFirst(formData.get("animal_type")),
                    breed: formData.get("breed") || "Unknown",
                    location: formData.get("location"),
                    lastSeenLandmark: formData.get("landmark") || "",
                    date: formatDate(formData.get("date")),
                    description: formData.get("description"),
                    image: imageDataUrl || "/images/default.jpg",
                    reportedBy: getLoggedInUser(),
                    reportedAt: new Date().toISOString()
                };
                
                let reports = getUserReports();
                reports.push(newPet);
                saveUserReports(reports);
                
                alert(`${capitalizeFirst(category)} pet reported successfully!`);
                loadPage(category + "pets");
            }
            
            if (imageFile && imageFile.size > 0) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    saveReport(ev.target.result);
                };
                reader.readAsDataURL(imageFile);
            } else {
                saveReport(null);
            }
        });
    }
    
    handleFormSubmit(lostForm, "lost");
    handleFormSubmit(foundForm, "found");
}

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
            <input type="text" id="contact-sender-name" placeholder="Your name" style="width:100%; margin-bottom:8px; padding:8px; box-sizing:border-box; border:1px solid #ccc; border-radius:6px;">
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
            statusEl.textContent = "Sending...";
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
            }).catch((err) => {
                console.error("EmailJS error:", err);
                statusEl.style.color = "red";
                statusEl.textContent = "Failed to send. Please try again later.";
                sendBtn.disabled = false;
            });
        });
    }
}