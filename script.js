/**
 * 360° Urban Resilience Hub
 * Interactive Logic: Search, Animations, Accordion, Theme, Toasts
 */

// --- DATA ---
const ewasteCenters = [
    { id: 1, name: "Eco-Recycle Tech Hub", address: "123 Green Avenue, Tech Park", phone: "1800-111-2345", email: "contact@ecorecycle.com", maps: "#" },
    { id: 2, name: "Green Battery Disposal", address: "45 Industrial Estate, Phase II", phone: "1800-222-3456", email: "help@greenbattery.com", maps: "#" },
    { id: 3, name: "City E-Waste Solutions", address: "78 Circular Road, City Center", phone: "1800-333-4567", email: "info@cityewaste.in", maps: "#" },
    { id: 4, name: "Safe Earth Recycling", address: "102 Eco Zone, Outskirts", phone: "1800-444-5678", email: "recycle@safeearth.com", maps: "#" },
    { id: 5, name: "Apex Electronics Recyclers", address: "22 Horizon Blvd, West Block", phone: "1800-555-6789", email: "support@apexrecycle.org", maps: "#" }
  ];
  
  const bloodBanks = [
    { name: "City General Hospital", location: "Central District", status: "Stock Available", link: "#" },
    { name: "Metro Care Center", location: "North Zone", status: "Limited Stock", link: "#" },
    { name: "LifeLine Blood Bank", location: "South Avenue", status: "Stock Available", link: "#" }
  ];
  
  const faqs = [
    { q: "Why is e-waste recycling crucial?", a: "Electronics contain toxic materials like lead, mercury, and cadmium. Improper disposal contaminates soil and water, posing severe health and environmental risks." },
    { q: "How should I handle a swollen battery?", a: "Never puncture or throw it in regular trash to avoid fire hazards. Place it in a non-flammable container (like sand) and transport it to a designated battery disposal hub." },
    { q: "Do these hubs charge a fee?", a: "Most certified e-waste hubs accept consumer electronics for free. Some even offer small incentives or discounts for bulk recycling." }
  ];
  
  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Icon based on type
    let icon = '<i class="fa-solid fa-info-circle" style="color:var(--primary)"></i>';
    if(type === 'success') icon = '<i class="fa-solid fa-check-circle" style="color:var(--ambulance)"></i>';
    if(type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color:var(--traffic)"></i>';
  
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);
  
    // Remove after 3.5s
    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3500);
  }
  
  // --- RENDER FUNCTIONS ---
  function renderEWaste(data) {
    const container = document.getElementById('ewaste-cards');
    container.innerHTML = '';
  
    if(data.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-box-open"></i>
          <h3>No centers found</h3>
          <p>Try searching for a different area or name.</p>
        </div>`;
      return;
    }
  
    data.forEach(center => {
      const card = document.createElement('div');
      card.className = 'interactive-card';
      const cleanPhone = center.phone.replace(/[^0-9+]/g, '');
      
      card.innerHTML = `
        <div class="card-title"><i class="fa-solid fa-microchip"></i> ${center.name}</div>
        <div class="card-info"><i class="fa-solid fa-location-dot"></i> ${center.address}</div>
        <div class="card-info"><i class="fa-solid fa-phone"></i> <a href="tel:${cleanPhone}" onclick="showToast('Calling ${center.name}...', 'success')">${center.phone}</a></div>
        <div class="card-info"><i class="fa-solid fa-envelope"></i> <a href="mailto:${center.email}">${center.email}</a></div>
        <a href="${center.maps}" target="_blank" class="card-btn sec" onclick="showToast('Opening map location...', 'info')">
          <i class="fa-solid fa-map"></i> Open in Maps
        </a>
      `;
      container.appendChild(card);
    });
  }
  
  function renderBloodBanks() {
    const container = document.getElementById('blood-cards');
    bloodBanks.forEach(bank => {
      const card = document.createElement('div');
      card.className = 'interactive-card';
      
      const statusColor = bank.status === "Limited Stock" ? "var(--traffic)" : "var(--ambulance)";
      
      card.innerHTML = `
        <div class="card-title" style="color:var(--fire)"><i class="fa-solid fa-hospital"></i> ${bank.name}</div>
        <div class="card-info"><i class="fa-solid fa-location-dot"></i> ${bank.location}</div>
        <div class="card-info"><i class="fa-solid fa-notes-medical"></i> <span style="font-weight:600; color:${statusColor}">${bank.status}</span></div>
        <a href="${bank.link}" class="card-btn" style="background: linear-gradient(135deg, var(--fire), #b91c1c);" onclick="showToast('Redirecting to official portal...', 'info')">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Check Availability
        </a>
      `;
      container.appendChild(card);
    });
  }
  
  function renderFAQ() {
    const container = document.getElementById('faq-accordion');
    faqs.forEach((faq, index) => {
      const item = document.createElement('div');
      item.className = 'accordion-item';
      
      item.innerHTML = `
        <button class="accordion-header" aria-expanded="false" aria-controls="faq-content-${index}">
          ${faq.q}
          <i class="fa-solid fa-chevron-down accordion-icon"></i>
        </button>
        <div class="accordion-body" id="faq-content-${index}">
          <div class="accordion-content">${faq.a}</div>
        </div>
      `;
      
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        document.querySelectorAll('.accordion-item').forEach(el => {
          el.classList.remove('active');
          el.querySelector('.accordion-body').style.maxHeight = null;
        });
        
        // Open clicked if it wasn't active
        if(!isActive) {
          item.classList.add('active');
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
      
      container.appendChild(item);
    });
  }
  
  // --- INITIALIZATION & EVENTS ---
  document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Remove Loader
    setTimeout(() => {
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      setTimeout(() => loader.style.visibility = 'hidden', 500);
      showToast('Welcome to the Resilience Hub!', 'success');
    }, 1200); // Artificial delay to show loader
  
    // 2. Set Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // 3. Render Content
    renderEWaste(ewasteCenters);
    renderBloodBanks();
    renderFAQ();
  
    // 4. E-Waste Search Logic
    const searchInput = document.getElementById('ewaste-search');
    const clearBtn = document.getElementById('clear-search');
    
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      clearBtn.style.display = val.length > 0 ? 'block' : 'none';
      
      const filtered = ewasteCenters.filter(c => 
        c.name.toLowerCase().includes(val) || c.address.toLowerCase().includes(val)
      );
      renderEWaste(filtered);
    });
  
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      renderEWaste(ewasteCenters);
      searchInput.focus();
    });
  
    // 5. Theme Toggle Logic
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', (e) => {
      if(e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        showToast('Switched to Light Mode', 'info');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        showToast('Switched to Dark Mode', 'info');
      }
    });
  
    // 6. Scroll Reveal Animation & Back-to-top
    const reveals = document.querySelectorAll('.reveal');
    const backToTop = document.getElementById('back-to-top');
  
    const handleScroll = () => {
      // Reveal elements
      const winHeight = window.innerHeight;
      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if(revealTop < winHeight - 100) {
          reveal.classList.add('active');
        }
      });
      
      // Back to top button
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger instantly on load
  
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
