import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const donationList = document.getElementById("donation-list");

// Fetch donation activities from Firebase
async function loadDonations() {
    const querySnapshot = await getDocs(collection(db, "donations"));
    let content = "";
    
    querySnapshot.forEach((doc) => {
        const donation = doc.data();
        content += `
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h2 class="text-xl font-bold">${donation.title}</h2>
                <p class="text-gray-600">${donation.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <a href="donation-details.html?id=${doc.id}" class="text-blue-600">More Details</a>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded">Donate Now</button>
                </div>
            </div>
        `;
    });

    donationList.innerHTML = content;
}

// Load donations when the page loads
document.addEventListener("DOMContentLoaded", loadDonations);
