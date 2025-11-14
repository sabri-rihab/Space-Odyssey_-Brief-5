async function reservationTicket() {
  try {
    /* ---- GET DATA FROM LOCAL STORAGE ---- */
    const myReservations = JSON.parse(localStorage.getItem("myReservations")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // if no reservation found → stop function
    if (!myReservations.length || !currentUser) return;

    /* ---- GET THE MOST RECENT RESERVATION FOR THE LOGGED USER ---- */
    const userReservations = myReservations.filter(
      (res) => res.userID === currentUser.id
    );

    if (!userReservations.length) return;

    const reservation = userReservations[userReservations.length - 1]; // last reservation

    /* ---- CALLING HTML ELEMENTS ---- */
    const ticketID = document.getElementById("ticketID");
    const ticketDate = document.getElementById("ticketDate");
    const ticketDestination = document.getElementById("ticketDestination");
    const ticketTravelDays = document.getElementById("ticketTravelDays");
    const activitiesContainer = document.getElementById("ActivitiesContainer");
    const ticketAccomodation = document.getElementById("ticketAccomodation");
    const featuresContainer = document.getElementById("featuresContainer");
    const passengersTable = document.getElementById("passengersTable");
    const ticketPrice = document.getElementById("ticketPrice");

    /* ---- LOADING destination.json AND accommodations.json ---- */
    const destRes = await fetch("destination.json");
    const destinations_data = await destRes.json();

    const accRes = await fetch("accommodations.json");
    const accommodations_data = await accRes.json();

    /* ---- FIND MATCHING DESTINATION ---- */
    const destinationObj = destinations_data.destinations.find(
      (d) => d.id === reservation.destination
    );

    /* ---- FIND MATCHING ACCOMMODATION ---- */
    const accommodationObj = accommodations_data.accommodations.find(
      (a) => a.id === reservation.accommodation
    );

    /* ---- FILL TICKET BASIC INFO ---- */
    ticketID.textContent = reservation.reservationID;
    ticketDate.textContent = new Date(reservation.date).toDateString();
    ticketDestination.textContent = destinationObj ? destinationObj.name : reservation.destination;
    ticketTravelDays.textContent = destinationObj ? destinationObj.travelDuration : "";
    ticketAccomodation.textContent = accommodationObj ? accommodationObj.name : "";

    /* ---- FILL ACTIVITIES LIST ---- */
    if (destinationObj && destinationObj.activities) {
      activitiesContainer.innerHTML = `
        <p class="text-blue-400 text-sm font-semibold tracking-wider mb-4">ACTIVITIES</p>
        <ul class="space-y-3 text-gray-300">
          ${destinationObj.activities
            .map(
              (act) => `
          <li class="flex items-start gap-3 pl-2">
            <span class="text-blue-500 font-bold mt-1">→</span>
            <span>${act}</span>
          </li>`
            )
            .join("")}
        </ul>
      `;
    }

    /* ---- FILL FEATURES LIST ---- */
    if (accommodationObj && accommodationObj.features) {
      featuresContainer.innerHTML = `
        <p class="text-blue-400 text-sm font-semibold tracking-wider mb-4">FEATURES</p>
        <ul class="space-y-3 text-gray-300">
          ${accommodationObj.features
            .map(
              (f) => `
          <li class="flex items-start gap-3 pl-2">
            <span class="text-blue-500 font-bold mt-1">✓</span>
            <span>${f}</span>
          </li>`
            )
            .join("")}
        </ul>
      `;
    }

    /* ---- FILL PASSENGERS TABLE ---- */
    passengersTable.innerHTML = reservation.passengers
      .map(
        (p, i) => `
      <tr class="border-b border-blue-500/20">
          <td class="p-4">${i + 1}</td>
          <td class="p-4">${p.firstName}</td>
          <td class="p-4">${p.lastName}</td>
          <td class="p-4">${p.phone}</td>
          <td class="p-4">${p.email}</td>
      </tr>
    `
      )
      .join("");

    /* ---- TOTAL PRICE ---- */
    ticketPrice.textContent = reservation.totalPrice + " $";
      
    console.log(myReservations);

  } catch (error) {
    console.error("there is an error", error);
  }
}

reservationTicket();