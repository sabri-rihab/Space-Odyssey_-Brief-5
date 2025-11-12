async function loadingDestinations() {
  try {
    const res = await fetch("destination.json"); // fetching destination data
    const destinations_data = await res.json();

    const respond = await fetch("accommodations.json"); // fetching accomodation data
    const accomodations_data = await respond.json();

    const Destination_select = document.querySelector("#destination"); //destination select element
    const personal_info_container = document.querySelector(
      "#personal_info_container"
    ); //personal info container
    const passengers_inputs = document.querySelectorAll(
      "input[name='numPassengers']"
    ); //passengers radio inputs
    const add_passenger_btn = document.querySelector("#add_passenger"); //add passenger button
    let passengers_count = 1; //default passengers count

    /* ----------------------------------------Handle Destination change-----------------------------------------------------*/

    const acc_container = document.querySelector("#accommodation_container"); //accomodation container
    destinations_data.destinations.forEach((destination) => {
      Destination_select.innerHTML += `<option value="${destination.id}">${destination.id}</option>`;
    });

    const accommodations_arr = accomodations_data.accommodations; //accomodation array from destination data

    Destination_select.addEventListener("change", (e) => {
      let optoin_destination = Destination_select.value; //destination value value
      acc_container.innerHTML = ""; //clearing previous accomodation options

      accommodations_arr.forEach((accomodation) => {
        accomodation.availableOn.forEach((acc_dest) => {
          let temp = "";
          if (acc_dest === optoin_destination) {
            acc_container.innerHTML += `
                        <label class="cursor-pointer rounded-lg border-2 border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 p-4 transition-all duration-200">
                            <input type="radio" name="accommodation" value="${accomodation.id}" class="sr-only">
                            <h3 class="text-cyan-400 font-semibold mb-2 text-base sm:text-lg">
                                ${accomodation.name}
                            </h3>
                            <p class="text-gray-400 text-sm">${accomodation.description}</p>
                        </label>
    
                    `;
          }
        });
      });
    });

    /* ----------------------------------------Handle Passengers number change-----------------------------------------------------*/

    add_passenger_btn.addEventListener("click", () => {
      passengers_count++;
      GenerateForms();
      console.log(passengers_count);
    });

    passengers_inputs.forEach((input) => {
      input.addEventListener("change", () => {
        switch (input.value) {
          case "solo":
            passengers_count = 1;
            add_passenger_btn.classList.remove("visible");
            break;
          case "couple":
            passengers_count = 2;
            add_passenger_btn.classList.remove("visible");
            break;
          case "group":
            passengers_count = 3;
            add_passenger_btn.classList.add("visible");
            break;
          default:
            passengers_count = 1;
        }
        GenerateForms();
        console.log(passengers_count);
      });
    });

    function GenerateForms() {
      personal_info_container.innerHTML = ""; //clearing previous personal info forms
      for (let i = 1; i <= passengers_count; i++) {
        personal_info_container.innerHTML += `
                    <div id="passenger${i}">
                        <span>Passenger : ${i}</span>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="firstName" class="block text-gray-300 mb-2 text-sm">
                                    First Name
                                </label>
                                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition">
                            </div>
                            <div>
                                <label for="lastName" class="block text-gray-300 mb-2 text-sm">
                                    Last Name
                                </label>
                                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition">
                            </div>
                        </div>

                        <!-- Email and Phone -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="email" class="block text-gray-300 mb-2 text-sm">
                                    Email Address
                                </label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition">
                            </div>
                            <div>
                                <label for="phone" class="block text-gray-300 mb-2 text-sm">
                                    Phone Number
                                </label>
                                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition">
                            </div>
                        </div>

                        <!-- Special Requirements -->
                        <div>
                            <label for="specialRequirements" class="block text-gray-300 mb-2 text-sm">
                                Special Requirements
                            </label>
                            <textarea id="specialRequirements" name="specialRequirements" rows="4" placeholder="Any special requirements or notes..." class="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"></textarea>
                        </div>
                    </div>
                </div>
        `;
      }
    }

    console.log(destinations);
    console.log(accomodations);
  } catch (error) {
    console.error("error loading data", error);
  }
}
loadingDestinations();
