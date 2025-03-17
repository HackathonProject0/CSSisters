// استيراد Firebase Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// إعدادات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDvSYWemw6Bu3FuT4xZ0-Ei9XyOb5Hqih0",
    authDomain: "hackathon-22011.firebaseapp.com",
    databaseURL: "https://hackathon-22011-default-rtdb.firebaseio.com",
    projectId: "hackathon-22011",
    storageBucket: "hackathon-22011.appspot.com",
    messagingSenderId: "143964082984",
    appId: "1:143964082984:web:ef075aa8454f6a4b90f61d",
    measurementId: "G-WVMW59PHRT"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  

// استهداف عناصر HTML
const donationList = document.getElementById("donation-list");
const addDonationBtn = document.getElementById("add-donation");
const searchInput = document.getElementById("search-input");
const locationButtons = document.querySelectorAll(".location-btn");

// Data store for all donations
let allDonations = [];
let activeFilter = "all";
let searchQuery = "";

function loadDonationsRealTime() {
    try {
        const donationsRef = ref(db, "donations");

        onValue(donationsRef, (snapshot) => {
            console.log("Real-time update detected!", snapshot.size);
            allDonations = [];
            
            // Load data from Firebase
            if (!snapshot.exists() || snapshot.size === 0) {
                // Create sample entries for display
                allDonations = [
                    {
                        title: "Ayyad Ceramic & Porcelain",
                        location: "Amman, Jordan",
                        description: "The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.",
                        image: "placeholder.jpg"
                    },
                    {
                        title: "Ayyad Ceramic & Porcelain",
                        location: "Zarqa, Jordan",
                        description: "The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.",
                        image: "placeholder.jpg"
                    },
                    {
                        title: "Ayyad Ceramic & Porcelain",
                        location: "Irbid, Jordan",
                        description: "The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.",
                        image: "placeholder.jpg"
                    }
                ];
            } else {
                snapshot.forEach((childSnapshot) => {
                    allDonations.push(childSnapshot.val());
                });
            }

            // Apply filters and search
            renderDonations();
        });
    } catch (error) {
        console.error("Failed to load donations:", error);
        
        // Fallback: Display sample cards if Firebase fails
        allDonations = [
            {
                title: "Ayyad Ceramic & Porcelain",
                location: "Amman, Jordan",
                description: "The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.",
                image: "placeholder.jpg"
            },
            {
                title: "Ayyad Ceramic & Porcelain",
                location: "Zarqa, Jordan",
                description: "The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.",
                image: "placeholder.jpg"
            },
            {
                title: "Ayyad Ceramic & Porcelain",
                location: "Irbid, Jordan",
                description: "The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.",
                image: "placeholder.jpg"
            }
        ];
        renderDonations();
    }
}

function renderDonations() {
    // Filter donations based on location and search query
    const filteredDonations = allDonations.filter(donation => {
        // Extract city from location (assuming format is "City, Country")
        const city = donation.location.split(',')[0].trim();
        
        // Location filter
        const locationMatch = activeFilter === "all" || 
                             city.toLowerCase() === activeFilter.toLowerCase();
        
        // Search filter - check if search query appears in title, description or location
        const searchMatch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           donation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           donation.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        return locationMatch && searchMatch;
    });

    // Generate HTML for filtered donations
    let content = "";
    if (filteredDonations.length === 0) {
        content = `<div class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
                    <p class="text-gray-500">No results found. Try adjusting your filters.</p>
                   </div>`;
    } else {
        filteredDonations.forEach(donation => {
            content += createCardHTML(donation);
        });
    }

    donationList.innerHTML = content;
}

function createCardHTML(donation) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
                <div class="mb-3">
                    <img src="${donation.image || 'placeholder.jpg'}" alt="${donation.title}" class="w-full h-48 object-cover rounded-md bg-gray-200">
                </div>
                <div class="mb-3">
                    <h2 class="text-lg font-bold">${donation.title || 'Ayyad Ceramic & Porcelain'}</h2>
                    <div class="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="text-sm text-gray-500">${donation.location || 'Amman, Jordan'}</span>
                    </div>
                    <div class="flex items-center mt-1.5">
                        <span class="text-yellow-400">★★★★</span><span class="text-gray-300">★</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">${donation.description || 'The largest ceramic and porcelain showroom in Jordan. The largest built-in electrical appliances showroom.'}</p>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <button class="p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                    <a href="#" class="px-4 py-2 border border-gray-800 rounded-md flex items-center text-sm">
                        View Location
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function addDonation() {
    const title = document.getElementById("donation-title").value;
    const description = document.getElementById("donation-description").value;
    const location = document.getElementById("donation-location").value || "Amman, Jordan";
    const image = document.getElementById("donation-image").value || "placeholder.jpg";

    if (title && description) {
        try {
            const donationsRef = ref(db, "donations");
            const newDonationRef = push(donationsRef);

            set(newDonationRef, {
                title: title,
                description: description,
                location: location,
                image: image,
                timestamp: Date.now(),
            });

            console.log("Donation added successfully!");
            // Clear fields
            document.getElementById("donation-title").value = "";
            document.getElementById("donation-description").value = "";
            document.getElementById("donation-location").value = "";
            document.getElementById("donation-image").value = "";
        } catch (error) {
            console.error("Error adding donation:", error);
        }
    } else {
        console.log("Title and description are required!");
    }
}

// Initialize search and filter functionality
function initializeSearchAndFilter() {
    // Search functionality
    searchInput.addEventListener("input", function() {
        searchQuery = this.value;
        renderDonations();
    });

    // Location filter functionality
    locationButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Update active filter
            const location = this.getAttribute("data-location");
            activeFilter = location;
            
            // Update button styles
            locationButtons.forEach(btn => {
                btn.classList.remove("bg-yellow-500", "text-white");
                btn.classList.add("bg-gray-100", "text-gray-800");
            });
            
            this.classList.remove("bg-gray-100", "text-gray-800");
            this.classList.add("bg-yellow-500", "text-white");
            
            // Render filtered donations
            renderDonations();
        });
    });
}

// Load data when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadDonationsRealTime();
    initializeSearchAndFilter();
});

// Add donation button event listener
if (addDonationBtn) {
    addDonationBtn.addEventListener("click", addDonation);
}