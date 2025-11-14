// async function loadReservation() {
//   try {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     const myReservations =
//       JSON.parse(localStorage.getItem("myReservations")) || [];
//     const container = document.querySelector("#myBookingsContainer");

//     /*------------ Check login state -------------*/
//     if (!currentUser) {
//       container.innerHTML = `
//                 <p class="text-red-400 text-lg">You must be logged in to view your reservations.</p>
//             `;
//       return;
//     }

//     /*------------ Filter reservations for current user -------------*/
//     let userReservations = myReservations.filter(
//       (res) => res.userID === currentUser.id
//     );

//     /*------------ Initial render function -------------*/
//     function showReservations() {
//       container.innerHTML = ""; // clear old content

//       /*------------ If user has no reservations -------------*/
//       if (userReservations.length === 0) {
//         container.innerHTML = `
//                     <p class="text-gray-400 text-lg">You don’t have any reservations yet.</p>
//                 `;
//         return;
//       }

//       userReservations.forEach((res) => {
//         const formattedDate = new Date(res.date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });

//         /*------------ Create reservation card -------------*/
//         const card = document.createElement("div");
//         card.className =
//           "relative mb-6 mt-2 p-5 rounded-xl bg-slate-900/40 border border-slate-700 shadow-xl";

//         card.setAttribute("data-reservation-id", res.reservationID);

//         card.innerHTML = `
//                     <!-- Reservation ID -->
//                     <div class="absolute top-4 right-4">
//                         <span class="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold px-3 py-1 rounded-full">
//                             #${res.reservationID}
//                         </span>
//                     </div>

//                     <!-- Reservation Details -->
//                     <div class="space-y-3">
//                         <!-- Date -->
//                         <div class="flex items-center text-gray-300">
//                             <i class="fas fa-calendar-alt text-neon-cyan mr-3 w-5"></i>
//                             <div>
//                                 <p class="text-xs text-gray-400">Departure Date</p>
//                                 <p class="font-semibold">${formattedDate}</p>
//                             </div>
//                         </div>

//                         <!-- Destination -->
//                         <div class="flex items-center text-gray-300">
//                             <i class="fas fa-map-marker-alt text-neon-blue mr-3 w-5"></i>
//                             <div>
//                                 <p class="text-xs text-gray-400">Destination</p>
//                                 <p class="font-semibold">${res.destination}</p>
//                             </div>
//                         </div>

//                         <!-- Price -->
//                         <div class="flex items-center text-gray-300">
//                             <i class="fas fa-dollar-sign text-neon-purple mr-3 w-5"></i>
//                             <div>
//                                 <p class="text-xs text-gray-400">Total Price</p>
//                                 <p class="font-semibold text-xl text-neon-blue">$${res.totalPrice}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <!-- Action Buttons -->
//                     <div class="grid grid-cols-3 gap-3 mt-4">
//                         <!-- Ticket Button -->
//                         <button class="ticketBtn bg-gradient-to-r from-neon-blue to-neon-cyan text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-neon-blue/30 flex flex-col items-center justify-center gap-1">
//                             <i class="fas fa-ticket-alt text-lg"></i>
//                             <span class="text-xs">Ticket</span>
//                         </button>

//                         <!-- Edit Button -->
//                         <button class="editBtn bg-gradient-to-r from-neon-purple to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-neon-purple/30 flex flex-col items-center justify-center gap-1">
//                             <i class="fas fa-edit text-lg"></i>
//                             <span class="text-xs">Edit</span>
//                         </button>

//                         <!-- Delete Button -->
//                         <button class="deleteReservation bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-red-500/30 flex flex-col items-center justify-center gap-1">
//                             <i class="fas fa-trash-alt text-lg"></i>
//                             <span class="text-red-300text-xs">Cancel</span>
//                         </button>
//                     </div>
//                 `;

//         container.appendChild(card);

//         /*------------ Attach delete functionality to the existing button -------------*/
//         const deleteBtn = card.querySelectorAll(".deleteReservation");
//         deleteBtn.forEach((del) => {
//           del.addEventListener("click", () => {
//             if (!confirm("Are you sure you want to Cancel this reservation?"))
//               return;

//             /*------------ Remove from localStorage ------------*/
//             const updatedList = myReservations.filter(
//               (r) => r.reservationID !== res.reservationID
//             );
//             localStorage.setItem("myReservations", JSON.stringify(updatedList));

//             /*------------ Update current user's list ------------*/
//             userReservations = updatedList.filter(
//               (r) => r.userID === currentUser.id
//             );

//             /*------------ Re-call reservations  after the update(delete) ------------*/
//             showReservations();
//           });
//         });

//         const editBtn = document.querySelectorAll(".editBtn");
//         editBtn.forEach((edit) => {
//           edit.addEventListener("click", () => {
//               openEditModal();
              
//             });
//         });
//     });
// }
// closeEditModal()
//     function openEditModal() {
//       document.getElementById("editModal").classList.remove("hidden");
//       document.body.style.overflow = "hidden"; // Prevent background scrolling
//     }

//     // Close modal
//     function closeEditModal() {
//       document.getElementById("editModal").classList.add("hidden");
//       document.body.style.overflow = "auto"; // Restore scrolling
//     }
//     /*------------ Initial call -------------*/
//     showReservations();
//   } catch (err) {
//     console.error("error", err);
//   }
// }

// loadReservation();

async function loadReservation() {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const myReservations = JSON.parse(localStorage.getItem("myReservations")) || [];
    const container = document.querySelector("#myBookingsContainer");

    /*------------ Check login state -------------*/
    if (!currentUser) {
      container.innerHTML = `
                <p class="text-red-400 text-lg">You must be logged in to view your reservations.</p>
            `;
      return;
    }

    /*------------ Filter reservations for current user -------------*/
    let userReservations = myReservations.filter(
      (res) => res.userID === currentUser.id
    );

    /*------------ Load destinations and accommodations data -------------*/
    let destinations = [];
    let accommodations = [];

    async function loadFormData() {
      try {
        // Load destinations
        const destResponse = await fetch('/data/destinations.json');
        destinations = await destResponse.json();
        
        // Load accommodations
        const accResponse = await fetch('/data/accommodations.json');
        accommodations = await accResponse.json();
      } catch (error) {
        console.error('Error loading form data:', error);
        // Fallback data
        destinations = [
          { id: "mars", name: "Mars Colony Alpha", basePrice: 15000 },
          { id: "moon", name: "The Moon", basePrice: 5000 },
          { id: "europa", name: "Europa Station", basePrice: 25000 },
          { id: "titan", name: "Titan Base", basePrice: 30000 }
        ];
        
        accommodations = [
          { id: "standard", name: "Standard Cabin", multiplier: 1.0 },
          { id: "luxury", name: "Luxury Suite", multiplier: 1.8 },
          { id: "zerog", name: "Zero-G Pod", multiplier: 2.5 }
        ];
      }
    }

    /*------------ Price calculation function (same as booking) -------------*/
    function calculateTotalPrice(destinationId, accommodationId, passengerCount) {
      const destination = destinations.find(d => d.id === destinationId);
      const accommodation = accommodations.find(a => a.id === accommodationId);
      
      if (!destination || !accommodation) return 0;
      
      const basePrice = destination.basePrice || 10000;
      const accommodationMultiplier = accommodation.multiplier || 1.0;
      
      return basePrice * accommodationMultiplier * passengerCount;
    }

    /*------------ Update price display -------------*/
    function updatePriceDisplay() {
      const destinationSelect = document.getElementById('editDestination');
      const accommodationRadios = document.querySelectorAll('input[name="editAccommodation"]');
      const passengerCount = document.querySelectorAll('#editPassengersList .passenger-item').length;
      
      const destinationId = destinationSelect?.value;
      const accommodationId = Array.from(accommodationRadios).find(radio => radio.checked)?.value;
      
      if (destinationId && accommodationId && passengerCount > 0) {
        const totalPrice = calculateTotalPrice(destinationId, accommodationId, passengerCount);
        const priceDisplay = document.getElementById('editTotalPrice');
        if (priceDisplay) {
          priceDisplay.textContent = `$${totalPrice.toLocaleString()}`;
        }
      }
    }

    /*------------ Initial render function -------------*/
    function showReservations() {
      container.innerHTML = ""; // clear old content

      /*------------ If user has no reservations -------------*/
      if (userReservations.length === 0) {
        container.innerHTML = `
                    <p class="text-gray-400 text-lg">You don't have any reservations yet.</p>
                `;
        return;
      }

      userReservations.forEach((res) => {
        const formattedDate = new Date(res.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        /*------------ Create reservation card -------------*/
        const card = document.createElement("div");
        card.className =
          "relative mb-6 mt-2 p-5 rounded-xl bg-slate-900/40 border border-slate-700 shadow-xl";

        card.setAttribute("data-reservation-id", res.reservationID);

        card.innerHTML = `
                    <!-- Reservation ID -->
                    <div class="absolute top-4 right-4">
                        <span class="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                            #${res.reservationID}
                        </span>
                    </div>

                    <!-- Reservation Details -->
                    <div class="space-y-3">
                        <!-- Date -->
                        <div class="flex items-center text-gray-300">
                            <i class="fas fa-calendar-alt text-neon-cyan mr-3 w-5"></i>
                            <div>
                                <p class="text-xs text-gray-400">Departure Date</p>
                                <p class="font-semibold">${formattedDate}</p>
                            </div>
                        </div>

                        <!-- Destination -->
                        <div class="flex items-center text-gray-300">
                            <i class="fas fa-map-marker-alt text-neon-blue mr-3 w-5"></i>
                            <div>
                                <p class="text-xs text-gray-400">Destination</p>
                                <p class="font-semibold">${res.destination}</p>
                            </div>
                        </div>

                        <!-- Price -->
                        <div class="flex items-center text-gray-300">
                            <i class="fas fa-dollar-sign text-neon-purple mr-3 w-5"></i>
                            <div>
                                <p class="text-xs text-gray-400">Total Price</p>
                                <p class="font-semibold text-xl text-neon-blue">$${res.totalPrice}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-3 gap-3 mt-4">
                        <!-- Ticket Button -->
                        <button class="ticketBtn bg-gradient-to-r from-neon-blue to-neon-cyan text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-neon-blue/30 flex flex-col items-center justify-center gap-1">
                            <i class="fas fa-ticket-alt text-lg"></i>
                            <span class="text-xs">Ticket</span>
                        </button>

                        <!-- Edit Button -->
                        <button class="editBtn bg-gradient-to-r from-neon-purple to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-neon-purple/30 flex flex-col items-center justify-center gap-1">
                            <i class="fas fa-edit text-lg"></i>
                            <span class="text-xs">Edit</span>
                        </button>

                        <!-- Delete Button -->
                        <button class="deleteReservation bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-red-500/30 flex flex-col items-center justify-center gap-1">
                            <i class="fas fa-trash-alt text-lg"></i>
                            <span class="text-red-300 text-xs">Cancel</span>
                        </button>
                    </div>
                `;

        container.appendChild(card);

        /*------------ Attach delete functionality to the existing button -------------*/
        const deleteBtn = card.querySelector(".deleteReservation");
        deleteBtn.addEventListener("click", () => {
          if (!confirm("Are you sure you want to Cancel this reservation?"))
            return;

          /*------------ Remove from localStorage ------------*/
          const updatedList = myReservations.filter(
            (r) => r.reservationID !== res.reservationID
          );
          localStorage.setItem("myReservations", JSON.stringify(updatedList));

          /*------------ Update current user's list ------------*/
          userReservations = updatedList.filter(
            (r) => r.userID === currentUser.id
          );

          /*------------ Re-call reservations  after the update(delete) ------------*/
          showReservations();
        });

        /*------------ Attach edit functionality -------------*/
        const editBtn = card.querySelector(".editBtn");
        editBtn.addEventListener("click", () => {
          openEditModal(res);
        });
      });
    }

    /*------------ Edit Modal Functions -------------*/
    function openEditModal(reservation) {
      // Create modal if it doesn't exist
      if (!document.getElementById("editModal")) {
        createEditModal();
      }

      // Populate form with reservation data
      setTimeout(() => {
        populateEditForm(reservation);
      }, 100);

      // Show modal
      document.getElementById("editModal").classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    function closeEditModal() {
      document.getElementById("editModal").classList.add("hidden");
      document.body.style.overflow = "auto";
    }

    function populateEditForm(reservation) {
      // Set destination
      const destinationSelect = document.getElementById('editDestination');
      if (destinationSelect) {
        const destinationOption = Array.from(destinationSelect.options).find(opt => 
          opt.textContent.includes(reservation.destination) || opt.value === reservation.destinationId
        );
        if (destinationOption) {
          destinationSelect.value = destinationOption.value;
        }
      }

      // Set accommodation
      const accommodationRadios = document.querySelectorAll('input[name="editAccommodation"]');
      accommodationRadios.forEach(radio => {
        if (radio.value === reservation.accommodation || radio.value === reservation.accommodationId) {
          radio.checked = true;
        }
      });

      // Set date
      const dateInput = document.getElementById('editDate');
      if (dateInput) {
        dateInput.value = reservation.date;
      }

      // Set passengers
      const passengersList = document.getElementById('editPassengersList');
      if (passengersList && reservation.passengers) {
        passengersList.innerHTML = '';
        reservation.passengers.forEach((passenger, index) => {
          addPassengerToForm(passenger, index + 1);
        });
      } else {
        // Create default passenger if none exist
        addPassengerToForm({
          firstName: currentUser.firstName || '',
          lastName: currentUser.lastName || '',
          email: currentUser.email || '',
          phone: currentUser.phone || ''
        }, 1);
      }

      // Update price
      updatePriceDisplay();

      // Store current reservation ID for update
      document.getElementById("editModal").setAttribute("data-reservation-id", reservation.reservationID);
    }

    function addPassengerToForm(passengerData = {}, passengerNumber) {
      const passengersList = document.getElementById('editPassengersList');
      if (!passengersList) return;

      const passengerDiv = document.createElement('div');
      passengerDiv.className = 'passenger-item bg-space-dark/70 rounded-lg p-4 border border-neon-blue/20';
      passengerDiv.innerHTML = `
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-semibold text-gray-300">Passenger #${passengerNumber}</h4>
          <button type="button" class="remove-passenger text-red-400 hover:text-red-300 transition-colors">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" placeholder="First Name" value="${passengerData.firstName || ''}" 
                 class="passenger-firstName bg-space-dark border border-neon-blue/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-blue transition-colors" required>
          <input type="text" placeholder="Last Name" value="${passengerData.lastName || ''}" 
                 class="passenger-lastName bg-space-dark border border-neon-blue/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-blue transition-colors" required>
          <input type="email" placeholder="Email" value="${passengerData.email || ''}" 
                 class="passenger-email bg-space-dark border border-neon-blue/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-blue transition-colors" required>
          <input type="tel" placeholder="Phone Number" value="${passengerData.phone || ''}" 
                 class="passenger-phone bg-space-dark border border-neon-blue/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-blue transition-colors">
        </div>
      `;

      passengersList.appendChild(passengerDiv);

      // Add remove event listener
      const removeBtn = passengerDiv.querySelector('.remove-passenger');
      removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('.passenger-item').length > 1) {
          passengerDiv.remove();
          updatePassengerNumbers();
          updatePriceDisplay();
        } else {
          alert('At least one passenger is required.');
        }
      });

      // Add input event listeners for real-time validation
      const inputs = passengerDiv.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', updatePriceDisplay);
      });
    }

    function updatePassengerNumbers() {
      const passengers = document.querySelectorAll('.passenger-item');
      passengers.forEach((passenger, index) => {
        const title = passenger.querySelector('h4');
        if (title) {
          title.textContent = `Passenger #${index + 1}`;
        }
      });
    }

    function createEditModal() {
      const modalHTML = `
        <div id="editModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 hidden">
          <div class="bg-gradient-to-b from-space-blue to-space-purple border-2 border-neon-blue/30 rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl shadow-neon-blue/20">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-neon-blue/30">
              <h2 class="font-orbitron text-3xl text-glow flex items-center gap-3">
                <i class="fas fa-edit text-neon-purple"></i>
                Edit Reservation
              </h2>
              <button onclick="closeEditModal()" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            <!-- Form Content -->
            <form id="editReservationForm" class="space-y-6">
              <!-- Journey Details Section -->
              <div class="bg-space-dark/50 rounded-xl p-6 border border-neon-blue/20">
                <h3 class="font-orbitron text-xl text-neon-blue mb-4 flex items-center gap-2">
                  <i class="fas fa-rocket"></i>
                  Journey Details
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Destination -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-300 mb-2">
                      <i class="fas fa-map-marker-alt text-neon-cyan mr-2"></i>
                      Destination
                    </label>
                    <select id="editDestination" required class="w-full bg-space-dark/70 border border-neon-blue/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors">
                      <option value="">Select Destination</option>
                    </select>
                  </div>
                  
                  <!-- Departure Date -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-300 mb-2">
                      <i class="fas fa-calendar-alt text-neon-cyan mr-2"></i>
                      Departure Date
                    </label>
                    <input type="date" id="editDate" required min="${new Date().toISOString().split('T')[0]}" 
                           class="w-full bg-space-dark/70 border border-neon-blue/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors">
                  </div>
                </div>
              </div>
              
              <!-- Accommodation Section -->
              <div class="bg-space-dark/50 rounded-xl p-6 border border-neon-blue/20">
                <h3 class="font-orbitron text-xl text-neon-blue mb-4 flex items-center gap-2">
                  <i class="fas fa-bed"></i>
                  Accommodation Type
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="editAccommodationOptions">
                  <!-- Accommodation options will be populated here -->
                </div>
              </div>
              
              <!-- Passengers Section -->
              <div class="bg-space-dark/50 rounded-xl p-6 border border-neon-blue/20">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-orbitron text-xl text-neon-blue flex items-center gap-2">
                    <i class="fas fa-users"></i>
                    Passengers
                  </h3>
                  <button type="button" id="addPassengerBtn" class="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                    <i class="fas fa-plus"></i>
                    Add Passenger
                  </button>
                </div>
                
                <div id="editPassengersList" class="space-y-4">
                  <!-- Passengers will be populated here -->
                </div>
              </div>

              <!-- Price Summary -->
              <div class="bg-space-dark/50 rounded-xl p-6 border border-neon-blue/20">
                <h3 class="font-orbitron text-xl text-neon-blue mb-4 flex items-center gap-2">
                  <i class="fas fa-dollar-sign"></i>
                  Price Summary
                </h3>
                <div class="text-center">
                  <p class="text-gray-400 text-sm">Total Price</p>
                  <p id="editTotalPrice" class="font-orbitron text-4xl text-neon-cyan my-2">$0</p>
                  <p class="text-gray-400 text-xs">Price updates automatically based on your selections</p>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex gap-4 pt-4">
                <button type="button" onclick="closeEditModal()" class="flex-1 border-2 border-gray-500 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-500/10 transition-all">
                  Cancel
                </button>
                <button type="submit" class="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-neon-blue/30">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHTML);

      // Populate form options
      populateFormOptions();

      // Add event listeners
      document.getElementById('addPassengerBtn').addEventListener('click', function() {
        addPassengerToForm({}, document.querySelectorAll('.passenger-item').length + 1);
      });

      document.getElementById('editReservationForm').addEventListener('submit', handleEditFormSubmit);
      
      // Add real-time update listeners
      document.getElementById('editDestination').addEventListener('change', updatePriceDisplay);
      document.getElementById('editDate').addEventListener('change', updatePriceDisplay);
      
      const accommodationContainer = document.getElementById('editAccommodationOptions');
      accommodationContainer.addEventListener('change', function(e) {
        if (e.target.name === 'editAccommodation') {
          updatePriceDisplay();
        }
      });
    }

    function populateFormOptions() {
      // Populate destinations
      const destinationSelect = document.getElementById('editDestination');
      destinations.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest.id;
        option.textContent = dest.name;
        destinationSelect.appendChild(option);
      });

      // Populate accommodations
      const accommodationContainer = document.getElementById('editAccommodationOptions');
      accommodations.forEach(acc => {
        const label = document.createElement('label');
        label.className = 'cursor-pointer';
        label.innerHTML = `
          <input type="radio" name="editAccommodation" value="${acc.id}" class="peer hidden">
          <div class="border-2 border-neon-blue/30 peer-checked:border-neon-blue peer-checked:bg-neon-blue/10 rounded-lg p-4 transition-all hover:border-neon-blue/50">
            <h4 class="font-orbitron text-lg mb-2">${acc.name}</h4>
            <p class="text-sm text-gray-400">${acc.description || 'Premium space accommodation'}</p>
            <p class="text-neon-cyan text-sm mt-2">${(acc.multiplier * 100).toFixed(0)}% of base price</p>
          </div>
        `;
        accommodationContainer.appendChild(label);
      });
    }

    function validateEditForm() {
      // Basic validation
      const destination = document.getElementById('editDestination').value;
      const date = document.getElementById('editDate').value;
      const accommodation = document.querySelector('input[name="editAccommodation"]:checked');
      const passengers = document.querySelectorAll('.passenger-item');
      
      if (!destination) {
        alert('Please select a destination.');
        return false;
      }
      
      if (!date) {
        alert('Please select a departure date.');
        return false;
      }
      
      if (!accommodation) {
        alert('Please select an accommodation type.');
        return false;
      }
      
      if (passengers.length === 0) {
        alert('Please add at least one passenger.');
        return false;
      }
      
      // Validate passenger data
      let allPassengersValid = true;
      passengers.forEach((passenger, index) => {
        const firstName = passenger.querySelector('.passenger-firstName').value.trim();
        const lastName = passenger.querySelector('.passenger-lastName').value.trim();
        const email = passenger.querySelector('.passenger-email').value.trim();
        
        if (!firstName || !lastName || !email) {
          alert(`Please fill in all required fields for Passenger #${index + 1}`);
          allPassengersValid = false;
        }
      });
      
      return allPassengersValid;
    }

    function handleEditFormSubmit(event) {
      event.preventDefault();

      if (!validateEditForm()) {
        return;
      }

      if (!confirm("Are you sure you want to update this reservation?")) {
        return;
      }

      // Get form data
      const reservationId = document.getElementById("editModal").getAttribute("data-reservation-id");
      const destinationId = document.getElementById('editDestination').value;
      const destination = destinations.find(d => d.id === destinationId)?.name || 'Unknown Destination';
      const date = document.getElementById('editDate').value;
      const accommodationId = document.querySelector('input[name="editAccommodation"]:checked').value;
      const accommodation = accommodations.find(a => a.id === accommodationId)?.name || 'Unknown Accommodation';
      
      // Get passengers data
      const passengers = [];
      document.querySelectorAll('.passenger-item').forEach(passenger => {
        passengers.push({
          firstName: passenger.querySelector('.passenger-firstName').value,
          lastName: passenger.querySelector('.passenger-lastName').value,
          email: passenger.querySelector('.passenger-email').value,
          phone: passenger.querySelector('.passenger-phone').value
        });
      });

      // Calculate new price
      const totalPrice = calculateTotalPrice(destinationId, accommodationId, passengers.length);

      // Update reservation in localStorage
      const myReservations = JSON.parse(localStorage.getItem("myReservations")) || [];
      const reservationIndex = myReservations.findIndex(res => res.reservationID === reservationId);

      if (reservationIndex !== -1) {
        myReservations[reservationIndex] = {
          ...myReservations[reservationIndex],
          destination,
          destinationId,
          date,
          accommodation,
          accommodationId,
          passengers,
          travelers: passengers.length,
          totalPrice
        };

        localStorage.setItem("myReservations", JSON.stringify(myReservations));
        
        // Show success message
        alert("Reservation updated successfully!");
        
        // Close modal and refresh view
        closeEditModal();
        showReservations();
      }
    }

    // Make closeEditModal available globally
    window.closeEditModal = closeEditModal;
    window.addPassenger = function() {
      addPassengerToForm({}, document.querySelectorAll('.passenger-item').length + 1);
    };

    /*------------ Initialize -------------*/
    await loadFormData();
    showReservations();
  } catch (err) {
    console.error("error", err);
  }
}

loadReservation();