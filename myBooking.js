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

        /*------------ Initial render function -------------*/
        function RenderReservations() {
            container.innerHTML = ""; // clear old content

            /*------------ If user has no reservations -------------*/
            if (userReservations.length === 0) {
                container.innerHTML = `
                    <p class="text-gray-400 text-lg">You don’t have any reservations yet.</p>
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
                card.className = "mb-6 mt-2 p-5 rounded-xl bg-slate-900/40 border border-slate-700 shadow-xl";
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
                            <span class="text-xs">Delete</span>
                        </button>
                    </div>
                `;

                container.appendChild(card);

                /*------------ Attach delete functionality to the existing button -------------*/
                const deleteBtn = card.querySelector(".deleteReservation");
                deleteBtn.addEventListener("click", () => {
                    if (!confirm("Are you sure you want to delete this reservation?")) return;

                    /*------------ Remove from localStorage ------------*/
                    const updatedList = myReservations.filter(
                        (r) => r.reservationID !== res.reservationID
                    );
                    localStorage.setItem("myReservations", JSON.stringify(updatedList));

                    /*------------ Update current user's list ------------*/
                    // userReservations = updatedList.filter(
                    //     (r) => r.userID === currentUser.id
                    // );

                    /*------------ Re-render reservations ------------*/
                    RenderReservations();
                });
            });
        }

        /*------------ Initial render -------------*/
        RenderReservations();
    } catch (err) {
        console.error("error", err);
    }
}

loadReservation();
