const LOCATIONIQ_KEY = "pk.821e25d91a15018adcf5ad31ee22fa3a";

// waits a bit before firing so we don't spam the API on every keypress
function debounce(fn, delay) {
   let timer;
   return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
   };
}

function attachAutocomplete(inputId, dropdownId, onSelect) {
   const input = document.getElementById(inputId);
   const dropdown = document.getElementById(dropdownId);
   
   if (!input || !dropdown) return;
   
   const fetchSuggestions = debounce(async (query) => {
      if (query.length < 3) {
         dropdown.innerHTML = "";
         dropdown.style.display = "none";
         return;
      }
      
      try {
         // india only results
         const url = `https://us1.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(query)}&countrycodes=in&limit=6&format=json`;
         const res = await fetch(url);
         const data = await res.json();
         
         dropdown.innerHTML = "";
         
         if (!Array.isArray(data) || data.length === 0) {
            dropdown.style.display = "none";
            return;
         }
         
         data.forEach(place => {
            const parts = place.display_name.split(",");
            const shortName = parts.slice(0, 3).map(p => p.trim()).join(", ");
            
            const li = document.createElement("li");
            li.className = "autocomplete-item";
            li.textContent = shortName;
            li.addEventListener("mousedown", (e) => {
               e.preventDefault();
               input.value = shortName;
               dropdown.innerHTML = "";
               dropdown.style.display = "none";
               if (onSelect) onSelect(shortName);
            });
            dropdown.appendChild(li);
         });
         
         dropdown.style.display = "block";
         
      } catch (err) {
         console.error("LocationIQ error:", err);
         dropdown.style.display = "none";
      }
   }, 350);
   
   input.addEventListener("input", () => fetchSuggestions(input.value.trim()));
   
   input.addEventListener("blur", () => {
      setTimeout(() => {
         dropdown.style.display = "none";
      }, 150);
   });
   
   input.addEventListener("focus", () => {
      if (dropdown.children.length > 0) dropdown.style.display = "block";
   });
}

function initAutocomplete() {
   attachAutocomplete("lost-location-input", "lost-location-dropdown");
   attachAutocomplete("found-location-input", "found-location-dropdown");
   
   // re-run filters when user picks a location from the filter sidebar
   attachAutocomplete("lost-pet-filter-location", "filter-location-dropdown", () => {
      if (typeof applyLostPetFilters === "function") applyLostPetFilters();
   });
}